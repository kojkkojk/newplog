import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getDatabase, ref, onValue } from "firebase/database";

function Calendar() {
   const [getMoment, setMoment] = useState(moment());
   const [eventList, setEventList] = useState([
      ["loading...", "loading..."]
   ]);
   const today = getMoment;    // today == moment()   입니다.
   const Fweek = today.clone().startOf("month").week();
   const Lweek = today.clone().endOf("month").week() === 1 ? 53 : today.clone().endOf("month").week();
   const db = getDatabase();

   const VentShow = (path) => {
      onValue(ref(db, `events/list/${path}`), (snapShots) => {
         if (snapShots.exists()) {
            let bbb = Object.entries(snapShots.val())
            setEventList(bbb)
         } else {
            setEventList([
               ["loading...", "일정 없음"]
            ])
         }
      })
   }

   useEffect(() => {
      VentShow(today.format("YYYYMMDD"))
   }, [today])

   const addMonth = () => {
      setMoment(getMoment.clone().add(1, 'month'))
   }
   const oddMonth = () => {
      setMoment(getMoment.clone().subtract(1, 'month'))
   }
   const returnToday = () => {
      setMoment(moment())
   };
   const handleDayClick = (current) => {
      setMoment(current)
   };

   const calendarArr = () => {
      let result = [];
      let week = Fweek;
      for (week; week <= Lweek; week++) {
         result = result.concat(
            <tr key={week}>
               {Array(7).fill(0).map((data, index) => {
                  // 오늘 => 주어진 주의 시작 => index일 만큼 더해서 각 주의 '일'을 표기한다.
                  let days = today.clone().startOf("year").week(week).startOf("week").add(index, "day");

                  // 오늘이 current와 같다면 우선 '선택'으로 두자

                  let isSelected = today.format('YYYYMMDD') === days.format('YYYYMMDD') ? 'selected' : '';
                  // 만약, 이번 달이 아닌 다른 달의 날짜라면 회색으로 표시하자
                  let isGrayed = days.format('MM') !== today.format('MM') ? 'grayed' : '';
                  return (
                     <td key={index}
                        className={`wdays ${isSelected} ${isGrayed}`}
                        onClick={() => {
                           handleDayClick(days)
                           VentShow(days.format("YYYYMMDD"))
                        }}
                     >
                        {days.format("D")}
                     </td>
                  )
               })
               }
            </tr>);
      }
      return result;
   }

   return (
      <div className="CalenderBody">
         <div className="calender">
            <div id="calsBox">
               <div className='달력상단부'>
                  <button onClick={oddMonth} ><FaArrowLeft /></button>
                  <div onClick={() => { returnToday() }}>{today.format('YYYY년 M월')}</div>
                  <button onClick={addMonth} ><FaArrowRight /></button>
               </div>
               <table className="cals">
                  <thead>
                     <tr>
                        {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
                           <th key={el}>
                              {el}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="realCal">
                     {calendarArr()}
                  </tbody>
               </table>
            </div>
         </div>
         <div className='eventShow'>
            <span>일정</span>
            <ul>
               {eventList.length > 0 &&
                  eventList.map((data, index) => (
                     <React.Fragment key={index}>
                        <li><div/><span>{data[1]}</span></li>
                     </React.Fragment>
                  ))
               }
            </ul>
         </div>
      </div>
   )
}

export default Calendar
