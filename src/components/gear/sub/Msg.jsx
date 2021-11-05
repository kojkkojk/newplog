import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

function Msg({ bbsType, docId }) {
   const db = getDatabase();
   const [Data, setData] = useState([])

   const arrSortFunc = (arr) => {
      arr.sort((a, b) => {
         return b[1].index - a[1].index
      })
      return arr
   }


   const replyCall = (bbsType, docId) => {
      onValue(ref(db, `Replys/${bbsType}/${docId}`), (snapShots) => {
         if (snapShots.exists()) {
            let datas = Object.entries(snapShots.val())
            arrSortFunc(datas)
            setData(datas)
         } else {
            setData([])
         }
      })
   }
   useEffect(() => {
      replyCall(bbsType, docId)
   }, [])

   return (
      <>
         {Data.length > 0 &&
            Data.map((replys, index) => (
               <div className='리플창' key={index}>
                  <div className='djEJsshadlsi'>
                     <img src={replys[1].img} alt={replys[1].writer} />
                  </div>
                  <div className='리플s'>
                     <div>{replys[1].writer} <span style={{float:"right"}}>{replys[1].times}</span> </div>
                     <div>{replys[1].reply}</div>
                  </div>
               </div>
            ))
         }
      </>
   )
}

export default Msg
