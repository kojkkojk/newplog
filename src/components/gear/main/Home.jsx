import React from 'react';
import List from '../sub/List';
import Calendar from '../../design/Calendar';

function Home() {
   return (
      <div className='mainSect'>
         <div className='mainJogack'>
            <h2 className='bbsTitles'>Notice</h2>
            <List bbsName={"bbs1"} path={"notice"} queryString={"noticeId"} />
         </div>

         <div className='mainJogack'>
            <h2 className='bbsTitles'>Free Board</h2>
            <List bbsName={"bbs2"} path={"freeBoard"} queryString={"freebbs"} />
         </div>

         <div className='mainJogack'>
            <div className='메인아래오른쪽'>
               <h2 className='bbsTitles'>일정</h2>
               <Calendar />
            </div>
         </div>

      </div>
   )
}

export default Home
