import React from 'react';
import List from '../sub/List';
import Calendar from '../../design/Calendar';
import Rank from '../sub/Rank';

function Home() {
   return (
      <div className='mainSect'>

         <div className='mainJogack'>
            <h2 className='bbsTitles'><span>Notice</span></h2>
            <List bbsName={"bbs1"} path={"notice"} queryString={"noticeId"} />
         </div>

         <div className='mainJogack'>
            <h2 className='bbsTitles'><span>Free Board</span></h2>
            <List bbsName={"bbs2"} path={"freeBoard"} queryString={"freebbs"} />
         </div>

         <div className='mainJogack'>
            <div className='메인아래오른쪽'>
               <h2 className='claH2'>일정</h2>
               <Calendar />
            </div>
         </div>

         <div className='mainJogack'>
            <div className='메인아래왼쪽'>
               <Rank/>
            </div>
         </div>
      </div>
   )
}

export default Home
