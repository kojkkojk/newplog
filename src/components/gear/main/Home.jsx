import React from 'react';
import List from '../sub/List';

function Home() {
   return (
         <div className='mainSect'>
            <div className='mainJogack'>
               <h2 className='bbsTitles'><span>Notice</span></h2>
               <List bbsName={"bbs1"} path={"notice"}/>
            </div>
            <div className='mainJogack'>
               <h2 className='bbsTitles'><span>BBS title</span></h2>
               <List bbsName={"bbs2"} path={"bbs"}/>
            </div>
            <div className='mainJo'>
            </div>
         </div>
   )
}

export default Home
