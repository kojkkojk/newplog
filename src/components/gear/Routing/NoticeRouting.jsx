import React from 'react'
import BBSboard from '../main/BBSboard';
import BBSDetails from '../main/BBSDetails';
function NoticeRouting({noticeId}) {
   
   return (
      <>
       {noticeId ?
         <BBSDetails docId={noticeId} bbsType={"bbs1"}/>
      : 
      <BBSboard
      bbsType={"bbs1"}
      bbsTitle={"📢 공지사항"}
      path={"notice"}
      queryString={"noticeId"}
      />
       }  
      </>
   )
}

export default NoticeRouting
