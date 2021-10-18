import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase'
import { collection, getDocs } from "firebase/firestore";

function List1() {

   const db = getDocs(collection(firestore, "TEST", "asdfa/aaaaa"));


   const [listData, setListData] = useState([
      ["loading...", { title: "loading...", desc: "loading...",writer:"loading..." }],
      ["loading...", { title: "loading...", desc: "loading...",writer:"loading..." }],
      ["loading...", { title: "loading...", desc: "loading...",writer:"loading..." }],
      ["loading...", { title: "loading...", desc: "loading...",writer:"loading..." }],
      ["loading...", { title: "loading...", desc: "loading...",writer:"loading..." }],

   ])
   useEffect(() => {
      db.then(data => {
         let emptyArr = []
         data.forEach((doc) => {
            emptyArr.push([doc.id, doc.data()])
         })
         emptyArr.sort((a, b) => b[1].index - a[1].index)
         setListData(emptyArr)
      })
   }, [])
   
   return (
      <div className='bbsThumb'>
         <p style={{ textAlign: "right" }}>MORE</p>
         {listData.map((data, index) => (
            <div className='bbsLists' key={index}>
               <h4>{data[1].title}</h4>
            </div>
         ))}
      </div>
   )
}

export default List1
