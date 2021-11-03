import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Ads from '../design/Ads';
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
const listyle = {
   height: "40px"
}

function SideBar(props) {
   const auth = getAuth()
   const [OnOff, setOnOff] = useState(false);
   const logoutFunc = () => {
      signOut(auth)
   }
   return (
      <div className='SideBar' id={`slide_${props.slides}`}>
         <div className='menuvertical'>
            <ul className='slideVetical'>
               <li className='sliderItems'><div><Link className='domNavLinks' to={"/"}>home</Link></div></li>
               <li className='sliderItems'><div><Link className='domNavLinks' to={"/prologue"}>prologue</Link></div></li>
               <li className='sliderItem' style={OnOff ? {} : listyle}>
                  <div><a onClick={(e) => { e.preventDefault() }} className='domNavLinks' href={"/notice"}>board</a></div>
                  <div onClick={() => { setOnOff(!OnOff) }}>{OnOff ? <FaChevronUp /> : <FaChevronDown />}</div>
                  <div>
                     <ul>
                        <li><Link className='domNavLinks' to={"/notice"}>Notice</Link></li>
                        <li><Link className='domNavLinks' to={"/freeBoard"}>FreeBoard</Link></li>
                        <li><Link className='domNavLinks' to={"/gallery"}>gallery</Link></li>
                     </ul>
                  </div>
               </li>
               {props.userOn ?
                  <>
                     <li className='sliderItems'><div><a className='domNavLinks' href='/' onClick={(e) => { e.preventDefault(); logoutFunc() }}>Logout</a></div></li>
                     <li className='sliderItems'><div><Link className='domNavLinks' to={"/create"}>create</Link></div></li>
                     <li className='sliderItems'><div><Link className='domNavLinks' to={"/outstargram"}>img upload</Link></div></li>
                     <li className='sliderItems'><div><Link className='domNavLinks' to={"/eventplus"}>schedule</Link></div></li>
                  </>
                  :
                  <></>
               }
            </ul>
         </div>
         <Ads />
      </div>
   )
}

export default SideBar
