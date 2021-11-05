import React, { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getDatabase, ref, remove } from "firebase/database";
import { firestore } from '../../../configs/firebase'
import parse from 'html-react-parser';
import { Link, useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Reply from '../sub/Reply';

function BBSDetails({ bbsType, docId, queryString, path, userOn }) {
   const [document, setDocument] = useState({ title: "loading...", desc: "loading..." })
   const db = getDatabase();
   const dbRef = doc(firestore, `BBS/STORY/${bbsType}`, `${docId}`)
   const dbReff = ref(db, `Replys/${bbsType}/${docId}`)
   const [show, setShow] = useState(false);

   const docSnap = getDoc(dbRef);
   const history = useHistory();

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const deletedDoc = async () => {
      await deleteDoc(dbRef);
      await remove(dbReff)
   }

   useEffect(() => {
      docSnap.then(data => {
         if (data.exists()) {
            setDocument(data.data());
         } else {
            alert("잘못된 접근입니다.")
            history.push(`/${path}`)
         }
      })
   }, [])

   return (
      <div className='noticePage'>
         <h2 className='noticePageTitle'>{document.title}</h2>
         {document.fileURL &&
            <div className='noticePageIMGDIV'>
               <img className='noticePageIMG' src={document.fileURL} alt={document.fileName} />
            </div>
         }
         <div className='noticePageDesc'>{parse(document.desc)}</div>
         {document.fileURL ? <></> :
            <Reply bbsType={bbsType} docId={docId} />
         }
         <div className='noticePageButton'>
            <ul>
               {userOn ?
                  <>
                     <li style={{ width: "33.333%" }}><Link className='domNavLinks' to={`/${path}`}>list</Link></li>
                     <li className='domNavLinks' style={{ width: "33.333%" }}><span style={{ cursor: "pointer" }} onClick={handleShow}>Delete</span></li>
                     <li style={{ width: "33.333%" }}><Link className='domNavLinks' to={`/update/${bbsType}?${queryString}=${docId}`}>update</Link></li></> :
                  <li style={{ width: "100%" }}><Link className='domNavLinks' to={`/${path}`}>list</Link></li>
               }
            </ul>
         </div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Body>
               글을 삭제 하시겠습니까?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="danger" onClick={handleClose}>
                  닫기
               </Button>
               <Button variant="primary" onClick={() => {
                  deletedDoc().then(() => {
                     history.push(`/${path}`)
                  })
               }}>
                  삭제하기
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   )
}

export default BBSDetails 
