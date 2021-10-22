import React, { useEffect, useState } from 'react'
import Editor5 from '../../design/Editor5'
import { useSelector } from 'react-redux';

function Write() {
   const [contents, setContents] = useState("");
   const currentContent = useSelector(state => state.createReducer.content);
   useEffect(() => {
      setContents(currentContent)
   }, [currentContent])
   return (
      <div className='WriteSect'>
         <div className='contentsTitle'>
            <h2>title</h2>
            <input type="text" />
         </div>
         <div className='editorsSect'>
            <Editor5 />
         </div>
      </div>
   )
}

export default Write
