import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase'
import { collection, getDocs } from "firebase/firestore";

function List1() {

   const querySnapshot = getDocs(collection(firestore, "TEST", "asdfa/aaaaa"));


   const [listData, setListData] = useState([
      ["loading...", { title: "loading...", desc: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading..." }],

   ])
   useEffect(() => {
      querySnapshot.then(data => {
         let emptyArr = []
         data.forEach((doc) => {
            emptyArr.push([doc.id, doc.data()])
         })
         setListData(emptyArr)
      })
   }, [])
   return (
      <div className='bbsThumb'>
         <p style={{ textAlign: "right" }}>MORE</p>
         {listData.map((data, index) => (
            <div key={index}>
               <h4>
                  {data[1].title}
               </h4>
               <p style={{ paddingLeft: "15px" }}>
                  {data[1].desc}
               </p>
            </div>
         ))}
      </div>
   )
}

export default List1
