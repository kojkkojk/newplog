import React from 'react';
import List from '../sub/List';
import Calendar from '../../design/Calendar';

function Home() {
   return (
         <div className='mainSect'>
            <div className='mainJogack'>
               <h2 className='bbsTitles'><span>Notice</span></h2>
               <List bbsName={"bbs1"} path={"notice"} queryString={"noticeId"}/>
            </div>
            <div className='mainJogack'>
               <h2 className='bbsTitles'><span>BBS title</span></h2>
               <List bbsName={"bbs2"} path={"freeBoard"} queryString={"freebbs"}/>
            </div>
            <div className='mainJo'>
               <Calendar/>
            </div>
         </div>
   )
}

export default Home
