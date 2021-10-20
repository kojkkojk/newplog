import React, { useState } from 'react'
import {FaChevronDown,FaChevronUp} from 'react-icons/fa';
import Ads from '../design/Ads';
import {Link} from 'react-router-dom'
const listyle={
   height:"40px"
}
function SideBar() {
   const [OnOff, setOnOff] = useState(false);
   return (
      <div className='SideBar'>
         <div className='Profiles'>

         </div>
         <div className='menuvertical'>
            <ul className='slideVetical'>
               <li className='sliderItems'><div><Link className='domNavLinks' to={"/"}>home</Link></div></li>
               <li className='sliderItem' style={OnOff ? {} : listyle}>
                  <div><a onClick={(e)=>{e.preventDefault()}} className='domNavLinks' href={"/notice"}>게시판</a></div>
                  <div onClick={() => { setOnOff(!OnOff) }}>{OnOff ? <FaChevronUp/> : <FaChevronDown/>}</div>
                  <div>
                     <ul>
                        <li><Link className='domNavLinks' to={"/notice"}>공지</Link></li>
                        <li><Link className='domNavLinks' to={"/notice"}>공지</Link></li>
                        <li><Link className='domNavLinks' to={"/notice"}>공지</Link></li>
                        <li>456</li>
                     </ul>
                  </div>
               </li>
               <li className='sliderItems'><div><Link className='domNavLinks' to={"/notice"}>Notice</Link></div></li>
               <li className='sliderItems'><div><Link className='domNavLinks' to={"/notice"}>Notice</Link></div></li>
            </ul>
         </div>
         <Ads/>
      </div>
   )
}

export default SideBar
