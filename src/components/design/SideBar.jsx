import React, { useState } from 'react'
import {FaChevronDown,FaChevronUp} from 'react-icons/fa'
const listyle={
   height:"40px"
}
function SideBar() {
   const [OnOff, setOnOff] = useState(true);

   return (
      <div className='SideBar'>
         <div className='Profiles'>
            <img src={"https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550"} width="100%" alt="profile" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, numquam perferendis ipsum sapiente expedita sint</p>
         </div>
         <div className='menuvertical'>
            <ul className='slideVetical'>
               <li className='sliderItems'><div>Nintendo</div></li>
               <li className='sliderItems'><div>Nintendo</div></li>
               <li className='sliderItem' style={OnOff ? {} : listyle}>
                  <div>Nintendo</div>
                  <span onClick={() => { setOnOff(!OnOff) }}>{OnOff ? <FaChevronUp/> : <FaChevronDown/>}</span>
                  <div>
                     <ul>
                        <li>123</li>
                        <li>456</li>
                     </ul>
                  </div>
               </li>
               <li className='sliderItems'><div>Nintendo</div></li>
               <li className='sliderItems'><div>Nintendo</div></li>
            </ul>
         </div>
         <div className='Profiles'>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, numquam perferendis ipsum sapiente expedita sint</p>
         </div>
      </div>
   )
}

export default SideBar
