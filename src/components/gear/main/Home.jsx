import React from 'react';
import SideBar from '../../design/SideBar'
import List1 from '../sub/List1'
function Home() {
   return (
      <div className='homehwamyun'>
         <div className='mainSect'>
            <div className='mainJogack'><List1/></div>
            <div className='mainJogack'></div>
            <div className='mainJogack'></div>
            <div className='mainJogack'></div>
         </div>
         <SideBar/>
      </div>
   )
}

export default Home
