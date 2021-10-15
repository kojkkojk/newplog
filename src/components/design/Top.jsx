import React from 'react'
import {FaSearch} from 'react-icons/fa'
function Top() {
   return (
      <div className='Topline'>
         <div className='daemunIMG'>
            <h1>SAMPLE TEXT</h1>
         </div>
         <nav className='quickLink'>
            <ul>
               <li>1</li>
               <li>2</li>
               <li>3</li>
               <li>4</li>
            </ul>
            <div className='DBsearch'>
               <input type="text" />
               <span>
                  <FaSearch/>
               </span>
            </div>
         </nav>
      </div>
   )
}

export default Top
