import React, { useEffect, useState } from 'react';
import Editor5 from '../../design/Editor5';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from '../../../configs/firebase'
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import { deleteContents } from '../../../redux/action/createAct';
import mime from 'mime-types';

function IMGUpload() {
   const currentContent = useSelector(state => state.createReducer.content);
   const [contents, setContents] = useState("");
   const [contentTitle, setContentTitle] = useState("")
   const [meta_datas, setMeta_datas] = useState();
   const [files, setFiles] = useState(null);
   const currentDate = new Date();

   const history = useHistory();
   const dispatch = useDispatch();
   const storageRef = storage.ref();

   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleChanges2 = (e) => {
      setContentTitle(e.target.value)
   }

   const imageMetadata = async (e) => {
      let file = e.currentTarget.files[0];
      if (file === undefined) {
         alert("파일을 선택하세요");
      } else {
         let metaData = { contentType: mime.lookup(file.name) }
         setMeta_datas(metaData)
         setFiles(file)
      }
   }
   const saveContents = async () => {
      try {
         let uploadImgTsak = await storageRef.child(`/gallery/${files.name}`).put(files, meta_datas)

         let downLoadURL = await uploadImgTsak.ref.getDownloadURL();
         await addDoc(collection(firestore, `BBS/STORY/bbs3`), {
            title: contentTitle,
            desc: contents,
            fileName: files.name,
            fileURL: downLoadURL,
            date: currentDate.toLocaleDateString(),
            index: currentDate.getTime()
         })
      } catch (e) {
         alert("Error adding document: ", e);
      }
   }

   useEffect(() => {
      setContents(currentContent)
   }, [currentContent])

   return (
      <div className='WriteSect'>
         <div className='contentsTitle'>
            <h2>Image Upload</h2>
            <div className='contentsTitleDiv'>
               <input type="text" onChange={handleChanges2} />
            </div>
         </div>
         <div className='editorsSect'>
            <Editor5 data={""} />
         </div>
         <div className="confirm">
            <input
               type="file"
               className="imgsInput"
               accept="image/jpeg, image/png, image/gif"
               onChange={imageMetadata} />
            <Button onClick={handleShow}>Save</Button>
            <Modal show={show} onHide={handleClose}>
               <Modal.Body>
                  저장하시겠습니까?
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                     닫기
                  </Button>
                  <Button variant="primary" onClick={() => {
                     if (contents.length < 2 || contentTitle.length < 2) {
                        alert("내용을 입력 히세욧")
                     } else {
                        dispatch(deleteContents())
                        saveContents().then(() => {
                           alert("저장되었습니다.")
                           history.push("/gallery");
                        })
                     }
                  }}>
                     저장하기
                  </Button>
               </Modal.Footer>
            </Modal>
         </div>
      </div>
   )
}

export default IMGUpload
