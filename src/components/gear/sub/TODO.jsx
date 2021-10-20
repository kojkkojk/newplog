import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

function TODO() {
   const db = getDatabase();
   const starCountRef = ref(db, 'todolist');
   const [test, settest] = useState([
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }],
      ["loading...", { title: "loading...", desc: "loading...", writer: "loading..." }]
   ])
   useEffect(() => {
      onValue(starCountRef, (datas) => {
         const data = Object.entries(datas.val());
         settest(data)
      });
   }, [])

   return (
      <div>
         <ul>
            {
               test.length > 0 &&
               test.map((datas, index) => (
                  <li key={index}>
                     <ul>
                        <li>{datas[0]}</li>
                        <li>{datas[1].name}</li>
                     </ul>
                  </li>
               ))
            }
         </ul>
      </div>
   )
}

export default TODO
