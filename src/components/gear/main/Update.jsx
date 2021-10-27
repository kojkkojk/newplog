import React, { useEffect, useState } from 'react';
import Editor5 from '../../design/Editor5';
import { useSelector,useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { collection, doc,getDoc ,updateDoc } from "firebase/firestore";
import { firestore } from '../../../configs/firebase'
import Modal from 'react-bootstrap/Modal';
import { useHistory,useParams } from 'react-router-dom';
import { deleteContents } from '../../../redux/action/createAct';

function Update({contentsIndex}) {   
   const params = useParams()
   const indexNums = params.updateIndex
   const [contents, setContents] = useState("");
   const [contentTitle, setContentTitle] = useState("")

   const dispatch = useDispatch();
   const [show, setShow] = useState(false);

   const history = useHistory();
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const currentContent = useSelector(state => state.createReducer.content);
   
   const dbRef = doc(firestore, `BBS/STORY/${indexNums}`, `${contentsIndex}`)
   const docSnap = getDoc(dbRef);

   const saveContents = async () => {
      try {
         await updateDoc(dbRef,{
            title:contentTitle,
            desc:contents
         })
      } catch (e) {
         alert("Error adding document: ", e);
      }
   }

   useEffect(() => {
      docSnap.then(data => {
         let b = data.data()
         setContents(b.desc);
         setContentTitle(b.title)
      })
   }, [])

   useEffect(() => {
      setContents(currentContent)
   }, [currentContent])

   return (
      <div className='WriteSect'>
         <div className='contentsTitle'>
            <h2>글쓰기</h2>
            <input type="text" value={contentTitle} onChange={(e)=>{
               setContentTitle(e.target.value)
            }}/>
         </div>
         <div className='editorsSect'>
            <Editor5 data={contents}/>
         </div>
         <div className="confirm">
            <Button onClick={handleShow}>Update</Button>

            <Modal show={show} onHide={handleClose}>
               <Modal.Body>
                  저장하시겠습니까?
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                     닫기
                  </Button>
                  <Button variant="primary" onClick={() => {
                     if (contents.length < 2 || contentTitle.length < 1) {
                        alert("내용을 입력 히세욧")
                     } else {
                        dispatch(deleteContents())
                        saveContents().then(() => {
                           history.push("/");
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

export default Update
