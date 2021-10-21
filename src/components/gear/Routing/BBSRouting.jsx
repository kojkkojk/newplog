import React from 'react'
import BBSboard from '../main/BBSboard';
import BBSDetails from '../main/BBSDetails';
function BBSRouting({bbsId}) {
   return (
      <>
         {bbsId ?
         <BBSDetails docId={bbsId} bbsType={"bbs2"}/> 
         :
         <BBSboard
         bbsType={"bbs2"}
         bbsTitle={"📋 자유 게시판"}
         path={"freeBoard"}
         queryString={"freebbs"}
         />
         }
      </>
   )
}

export default BBSRouting
