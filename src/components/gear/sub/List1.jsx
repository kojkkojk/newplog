import React, { useState } from 'react'

function List1() {
   const [listData, setListData] = useState([
      {title:"Sample Title1",desc:"Sample Description1"},
      {title:"Sample Title2",desc:"Sample Description2"},
      {title:"Sample Title3",desc:"Sample Description3"},
      {title:"Sample Title4",desc:"Sample Description4"},
      {title:"Sample Title5",desc:"Sample Description5"},
      {title:"Sample Title6",desc:"Sample Description6"}
   ])
   return (
      <div className='bbsThumb'>
         <p style={{textAlign:"right"}}>MORE</p>
         {listData.map((data,index)=>(
            <div key={index}>
               <h4>
                  {data.title}
               </h4>
               <p style={{paddingLeft:"15px"}}>
                  {data.desc}
               </p>
            </div>
         ))}
      </div>
   )
}

export default List1
