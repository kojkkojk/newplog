import React from 'react';
import { Link } from 'react-router-dom';
function Top() {
   return (
      <div className='daemunIMG'>
         <Link className='daemunIMGLINK' to={"/"}>
            <h3>
               Hamoonrang's Plog
            </h3>
         </Link>
      </div>
   )
}

export default Top
