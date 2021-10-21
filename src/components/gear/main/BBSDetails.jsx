import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../../configs/firebase'

function BBSDetails({bbsType,docId}) {
   const [document, setDocument] = useState({ title: "loading...", desc: "loading...",writer:"loading..." })
   const dbRef = doc(firestore,`BBS/STORY/${bbsType}`,`${docId}`)
   const docSnap = getDoc(dbRef);

   useEffect(() => {
      docSnap.then(data=>{
         setDocument(data.data());
      })
   }, [])
   return (
      <div className='noticePage'>
         <h2>{document.title}</h2>
         <p>{document.desc}</p>
         {document.writer}
      </div>
   )
}

export default BBSDetails 
