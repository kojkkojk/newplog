import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import DatePicker from 'react-datepicker'
import { AiFillSave } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function PlusEvents() {
   const [startDate, setStartDate] = useState(new Date());
   const [Days, setDays] = useState(yyyyMMdd(new Date()))
   const [listsPlus, setListsPlus] = useState(1)
   const [Events, setEvents] = useState({})
   const db = getDatabase();
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const history = useHistory();

   const writeData = async (day, data = {}) => {
      try {
         await set(ref(db, `events/list/${day}`), data);         
      } catch (e) {
         alert("Error adding document: ", e);
      }
   }

   const handleText = (e) => {
      setEvents({
         ...Events,
         [e.target.name]: e.target.value
      })
   }

   function yyyyMMdd(date) {
      let y = date.getFullYear().toString()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m.toString() : m.toString();
      let d = date.getDate()
      d = d < 10 ? '0' + d.toString() : d.toString();
      return y + m + d
   }

   function listPlusFunc(listsPlus) {
      let result = [];
      for (let i = 0; i < listsPlus; i++) {
         result = result.concat(
            <li key={i}><input type="text" autoComplete='off' placeholder={"간단한 설명" + (i + 1)} name={"memo" + (i + 1)} onChange={handleText} /></li>
         )
      }
      return result;
   }

   return (
      <ul className="eventRecord">
         <li>
            <DatePicker
               selected={startDate}
               minDate={new Date()}
               dateFormat="MM월 dd일"
               locale={ko}
               onChange={(date) => {
                  setDays(yyyyMMdd(date))
                  setStartDate(date)
               }}
            />
         </li>
         <li>
            <ul>
               {listPlusFunc(listsPlus)}
            </ul>
         </li>
         <li>
            <Button variant='warning' onClick={handleShow}><AiFillSave />Save</Button>
            <Modal show={show} onHide={handleClose}>
               <Modal.Body>
                  저장하시겠습니까?
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                     닫기
                  </Button>
                  <Button variant="primary" onClick={() => { 
                     writeData(Days, Events).then(() => {
                        history.push("/");
                     })
                  }}>
                     저장하기
                  </Button>
               </Modal.Footer>
            </Modal>
         </li>
         <li>
            <Button onClick={() => { setListsPlus(listsPlus + 1) }}><AiFillSave />추가</Button >
         </li>
      </ul>
   )
}

export default PlusEvents
