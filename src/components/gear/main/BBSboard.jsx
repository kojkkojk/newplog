import React from 'react'
import Pagenate from '../sub/Pagenate'
function BBSboard({bbsType,bbsTitle,path,queryString}) {
   return (
      <div className='noticePage'>
         <Pagenate
            bbsType={bbsType}
            bbsTitle={bbsTitle}
            path={path}
            queryString={queryString}
         />
      </div>
   )
}

export default BBSboard
