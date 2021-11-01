import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'
function List({ bbsName, path, queryString }) {

   const db = getDocs(collection(firestore, "BBS", `STORY/${bbsName}`));
   const cutTitle = (a) => {
      let b = a.slice(0, 20);
      return b + "..."
   }

   const [listData, setListData] = useState([
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
   ])
   useEffect(() => {
      db.then(data => {
         let emptyArr = []
         data.forEach((doc) => {
            emptyArr.push([doc.id, doc.data()])
         })
         emptyArr.sort((a, b) => b[1].index - a[1].index)
         let a = emptyArr.slice(0, 5)
         setListData(a)
      })
   }, [])

   return (
      <div className='bbsThumb'>
         <div><Link className='bbsLINKs' to={`/${path}`}>more</Link></div>
         {listData.map((data, index) => (
            <div className='bbsLists' key={index}>
               <h5><Link className='bbsanchor' to={`/${path}?${queryString}=${data[0]}`}>{
                  data[1].title.length < 20 ? data[1].title : cutTitle(data[1].title)
               }</Link></h5>
            </div>
         ))}
      </div>
   )
}

export default List
