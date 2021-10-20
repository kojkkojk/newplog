import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'
function List({bbsName,path}) {

   const db = getDocs(collection(firestore, "BBS", `STORY/${bbsName}`));


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
         let a = emptyArr.slice(0,5)
         setListData(a)
      })
   }, [])
   
   return (
      <div className='bbsThumb'>
         <div><Link className='bbsLINKs' to={`/${path}`}>more</Link></div>
         {listData.map((data, index) => (
            <div className='bbsLists' key={index}>
               <h4><Link className='bbsanchor' to={`/${path}?noticeId=${data[0]}`}>{data[1].title}</Link></h4>
            </div>
         ))}
      </div>
   )
}

export default List
