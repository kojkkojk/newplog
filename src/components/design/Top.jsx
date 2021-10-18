import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
function Top() {
   return (
      <div className='Topline'>
         <div className='daemunIMG'>
            <h1>SAMPLE TEXT</h1>
         </div>
         <nav className='quickLink'>
            <ul>
               <li><Link className='domNavLinks' to={"/"}>Home</Link></li>
               <li><Link className='domNavLinks' to={"/"}>Home</Link></li>
               <li><Link className='domNavLinks' to={"/"}>Home</Link></li>
               <li><Link className='domNavLinks' to={"/login"}>login</Link></li>
            </ul>
            <div className='DBsearch'>
               <input type="text" />
               <span>
                  <FaSearch />
               </span>
            </div>
         </nav>
      </div>
   )
}

export default Top
