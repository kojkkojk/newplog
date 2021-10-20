import React from 'react'
import Notice from '../main/Notice';
import NoticeDetail from '../main/NoticeDetail';
function NoticeRouting({noticeId}) {
   return (
      <>
       {noticeId ?
         <NoticeDetail docId={noticeId}/>
      : <Notice/>
       }  
      </>
   )
}

export default NoticeRouting
