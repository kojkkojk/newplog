import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

function TODO() {
   const db = getDatabase();
   const starCountRef = ref(db, 'events/list/20211102');
   const [test, settest] = useState([
   ])
   useEffect(() => {
      onValue(starCountRef, (datas) => {
         const data = Object.entries(datas.val());
         settest(data)
         console.log(data);
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
                        <li>{datas[1]}</li>
                     </ul>
                  </li>
               ))
            }
         </ul>
      </div>
   )
}

export default TODO
