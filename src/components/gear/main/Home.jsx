import React from 'react';
import SideBar from '../../design/SideBar'
import List1 from '../sub/List1'
function Home() {
   return (
      <div className='homehwamyun'>
         <div className='mainSect'>
            <List1/>
         </div>
         <SideBar/>
      </div>
   )
}

export default Home
