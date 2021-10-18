import React from 'react';
import SideBar from '../../design/SideBar'
import List1 from '../sub/List1'
function Home() {
   return (
      <div className='homehwamyun'>
         <div className='mainSect'>
            <div className='mainJogack'>
               <h2 style={{ textAlign: "center" }}>BBS title</h2>
               <List1 />
            </div>
            <div className='mainJogack'>
               <h2 style={{ textAlign: "center" }}>BBS title</h2>

            </div>
            <div className='mainJo'>
               <h2 style={{ textAlign: "center" }}>BBS title</h2>
               
            </div>
         </div>
         <SideBar />
      </div>
   )
}

export default Home
