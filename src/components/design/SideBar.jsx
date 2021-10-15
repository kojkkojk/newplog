import React,{useState} from 'react'

function SideBar() {
   const [OnOff, setOnOff] = useState(true);
   
   return (
      <div className='SideBar'>
         <div className='Profiles'>
            <img src={"https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550"} width="100%" alt="profile" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, numquam perferendis ipsum sapiente expedita sint</p>
         </div>
         <div className='menuvertical'>
         <ul>
            <li>1</li>
            <li>2</li>
            <li> <a href="/" onClick={(e)=>{e.preventDefault();setOnOff(!OnOff)}}>3</a> </li>
            {OnOff ? <>
            <li>3-1</li>
            <li>3-2</li>
            </>:<></>}
            <li>4</li>
            <li>5</li>
         </ul>
         </div>
         <div className='Profiles'>
            <img src={"https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550"} width="100%" alt="profile" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, numquam perferendis ipsum sapiente expedita sint</p>
         </div>
      </div>
   )
}

export default SideBar
