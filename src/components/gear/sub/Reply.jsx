import React, { useState,useEffect } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import {firestore} from '../../../configs/firebase'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Msg from './Msg';
import { v4 as uuidv4 } from 'uuid';
import {animal,colors} from '../../../configs/data'
function Reply({ bbsType, docId }) {
   const db = getDatabase();
   const storeRef = doc(firestore, "CONDITIONS/REPLY")
   const docSnap = getDoc(storeRef);
   const [conditions, setConditions] = useState({
      condition:false
   })
   const [replys, setReplys] = useState("")
   const [loading, setLoading] = useState(false)
   const writeData = async (bbsType, docId, userId, data = {}) => {
      try {
         setLoading(true)
         await set(ref(db, `Replys/${bbsType}/${docId}/${userId}`), data);
         setTimeout(() => {
            setLoading(false)
         }, 2500);
      } catch (e) {
         alert("Error adding document: ", e);
      }
   }

   const handleReply = (e) => {
      setReplys(e.target.value)
   }
   const saveReply = () => {
      let random = Math.random().toString();
      let i = Math.floor(Math.random() * 20);
      let j = Math.floor(Math.random() * 20);
      let uid = uuidv4();
      let times = moment().format('YY-MM-DD');
      let data = {
         img: `https://www.gravatar.com/avatar/${random.slice(4, 13)}?d=identicon`,
         writer: `${colors[i]} ${animal[j]}`,
         reply: replys,
         index: new Date().getTime(),
         times: times
      }
      writeData(bbsType, docId, uid, data)
   }

   useEffect(() => {
      docSnap.then(data => {
         if (data.exists()) {
            setConditions(data.data());
         } else {
            alert("잘못된 접근입니다.")
         }
      })
   }, [])

   return (
      <>
      {conditions.condition ? <>         <div className='고소제조기'>
            <input type="text" autoComplete='off' name="comment" placeholder='댓글' maxLength={"150"} onChange={handleReply} value={replys} />
            <Button variant='success' style={{width:"10%"}} disabled={loading} onClick={() => {
               saveReply()
               setTimeout(() => {
                  setReplys("")
               }, 250);
            }}>쓰기</Button>
         </div>
         <div className='리플박스'>
            <Msg bbsType={bbsType} docId={docId} />
         </div></> : <></>}

      </>
   )
}

export default Reply
