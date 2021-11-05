import React, { useState,useEffect } from 'react'
import { getDatabase, ref, remove } from "firebase/database";
import { Button } from 'react-bootstrap';
import { doc, getDoc ,updateDoc } from "firebase/firestore";
import { firestore } from '../../../configs/firebase'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale'

function SettingPage() {
   const realDB = getDatabase();
   const [loading, setLoading] = useState(false)
   const [loading2, setLoading2] = useState(false)
   const [conditions, setconditions] = useState(true)
   const [repltDelete, setRepltDelete] = useState("댓글을 삭제합니까?")
   const [startDate, setStartDate] = useState(new Date());
   const [Days, setDays] = useState(yyyyMMdd(new Date()))
   const allReplyref = ref(realDB, `Replys`)
   const storeRef = doc(firestore, "CONDITIONS/REPLY")
   const docSnap = getDoc(storeRef);

   const allReplyDelete = async () => {
      try {
         setLoading(true)
         await remove(allReplyref)
         setRepltDelete("전체 댓글을 삭제했습니다.")        
         setTimeout(() => {
            setLoading(false)
            setRepltDelete("댓글을 삭제합니까?")
         }, 2500);
      } catch (e) {
         alert("Something was wrong...", e)
      }
   }

   const bbsAllReplyDelete = async (bbs) => {
      const bbsRef = ref(realDB, `Reply/${bbs}`)
      try {
         setLoading(true)
         await remove(bbsRef)
         setRepltDelete(`${bbs}의 댓글을 삭제했습니다`)        
         setTimeout(() => {
            setLoading(false)
            setRepltDelete("댓글을 삭제합니까?")
         }, 2500);
      } catch (e) {
         alert("Something was wrong...", e)
      }
   }

   const eventsDelete = async(day)=>{
      const allEventref = ref(realDB, `events/list/${day}`)
      try {
         await remove(allEventref)
      } catch (e) {         
         alert("Something was wrong...", e)
      }
   }
   function yyyyMMdd(date) {
      let y = date.getFullYear().toString()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m.toString() : m.toString();
      let d = date.getDate()
      d = d < 10 ? '0' + d.toString() : d.toString();
      return y + m + d
   }

   const saveContents = async () => {
      try {
         setLoading2(true)
         await updateDoc(storeRef,{
            condition:conditions
         })
         setTimeout(() => {
            setLoading2(false)
         }, 2500);
      } catch (e) {
         alert("Error adding document: ", e);
      }
   }
   
   useEffect(() => {
      docSnap.then(data => {
         if (data.exists()) {
            let abc = data.data()
            setconditions(abc.condition);
         } else {
            alert("잘못된 접근입니다.")
         }
      })
   }, [])
   return (
      <div className='SETTINGWANG'>
         <div className="replyDelete settingprince">
            <h2>{repltDelete}</h2>
            <div>
               <Button variant='danger' disabled={loading} onClick={()=>{bbsAllReplyDelete("bbs1")}} >공지 댓글 삭제</Button>
               <Button variant='warning' disabled={loading} onClick={()=>{bbsAllReplyDelete("bbs2")}} >자게 댓글 삭제</Button>
               <Button disabled={loading} onClick={()=>{allReplyDelete()}} >댓글 전체 삭제</Button>
            </div>
         </div>
         <div className="shutDownReply settingprince">
            <h2>댓글 설정 상태 : {conditions ? "ON":"OFF"}</h2>
            <div>
               <select name="category" id="doc-select" onChange={(e)=>{
                  if(e.target.value === "true"){
                     setconditions(true)
                  }else if(e.target.value === "false"){
                     setconditions(false)
                  }                  
               }}>
                  <option value={conditions}>설정</option>
                  <option value="true">ON</option>
                  <option value="false">OFF</option>
               </select>
               <Button disabled={loading2} onClick={saveContents}>세팅 저장</Button>
            </div>
         </div>
         <div className="replyDelete settingprince">
            <DatePicker
               selected={startDate}
               dateFormat="MM월 dd일"
               locale={ko}
               onChange={(date) => {
                  setDays(yyyyMMdd(date))
                  setStartDate(date)
               }}
            />
            <h2>{Days}</h2>
            <Button variant='danger' disabled={loading2} onClick={()=>{
               eventsDelete(Days)
            }}>이벤트 삭제</Button>
         </div>
      </div>
   )
}

export default SettingPage
