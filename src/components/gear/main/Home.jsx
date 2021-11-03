import React from 'react';
import List from '../sub/List';
import Calendar from '../../design/Calendar';

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
               <Calendar />
            </div>
         </div>

         <div className='mainJogack'>
            <div className='메인아래왼쪽'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus pariatur velit assumenda voluptates illo? Ipsum asperiores quas voluptatem dolorem amet consequatur molestiae nostrum fugit tempore delectus. Aperiam aliquid aut sit?
            </div>
         </div>
      </div>
   )
}

export default Home
