import React, { useEffect, useState } from 'react';
import Editor5 from '../../design/Editor5';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../../../configs/firebase'
import { useHistory } from 'react-router-dom';
import { deleteContents } from '../../../redux/action/createAct';

function Write() {
   const [contents, setContents] = useState("");
   const [contentTitle, setContentTitle] = useState("")
   const [category, setCategory] = useState("일반")
   const [bbsType, setbbsType] = useState("bbs1")
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const history = useHistory();
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const currentDate = new Date();
   const currentContent = useSelector(state => state.createReducer.content);
   const saveContents = async () => {
      try {
         await addDoc(collection(firestore, `BBS/STORY/${bbsType}`), {
            title: contentTitle,
            desc: contents,
            category:category,
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
            <h2>create contents</h2>
            <div className='contentsTitleDiv'>
               <select name="category" id="doc-select" onChange={(e)=>{
                  setCategory(e.target.value)
               }}>
                  <option value="일반">일반</option>
                  <option value="중요">중요</option>
                  <option value="기타">기타</option>
               </select>

               <input type="text" onChange={(e) => {
                  setContentTitle(e.currentTarget.value);
               }} />
            </div>
         </div>
         <div className='editorsSect'>
            <Editor5 data={""} />
         </div>
         <div className="confirm">
            <select style={{height:"100%"}} name="doc" id="doc-select" onChange={(e) => {
               setbbsType(e.target.value)
            }}>
               <option value="bbs1">공지</option>
               <option value="bbs2">자유게시판</option>
            </select>
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

export default Write
