import React from 'react'
import Pagenate from '../sub/Pagenate'
function Notice() {
   return (
      <div className='noticePage'>
         <Pagenate
            bbsType={"bbs1"}
            bbsTitle={"📢공지사항"}
            path={"notice"}
         />
      </div>
   )
}

export default Notice 
