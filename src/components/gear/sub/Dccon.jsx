import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../../../configs/firebase'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Dccon() {
   const [dcconlist, setDcconlist] = useState([])
   const [dcconlist2, setDcconlist2] = useState([])
   const [tags, settags] = useState([])
   const [selectDCcon, setSelectDCcon] = useState("")
   const [copyText, setCopyText] = useState("")
   const [searchTags, setSearchTags] = useState("전체")

   const docRef = doc(firestore, `DCCON`, `Lists`);
   const docSnap = getDoc(docRef);

   const callLists = async () => {
      await docSnap.then(data => {
         let arr = data.data().list
         setDcconlist(arr)
         setDcconlist2(arr)
      })
   }
   const calltags = async()=>{
      await getDoc(doc(firestore, `DCCON`, `tags`)).then(tag=>{
         let arrs = tag.data().lists
         settags(arrs)
      })
   }
   const isCorrect = (arr, tags) => {
      let fillterArr = arr.filter(v => v.tags[0] === tags);
      setDcconlist(fillterArr)
   }


   useEffect(() => {
      callLists()
      calltags()
   }, [])
   
   return (
      <div className='dcconpage'>
         <div className='dcconName'>
            <h2 style={{ textAlign: "center" }} onClick={() => { setDcconlist(dcconlist2);setSelectDCcon(""); }}>DC콘 목록</h2>
            <p>{copyText}</p>
            <div className='copyDccon'>
               <div className='searchdc'>
                  <select name="tags" onChange={(e)=>{
                     setSearchTags(e.target.value)
                     console.log(searchTags);
                  }}>
                     <option value={"전체"}>전체</option>
                     {tags.length>0 && tags.map((data,index)=>(
                        <option key={index} value={data}>{data}</option>
                     ))}
                  </select>
                  {searchTags === "전체" ? 
                  <button onClick={() => { setDcconlist(dcconlist2) }}>태그 검색</button> :
                  <button onClick={() => { isCorrect(dcconlist2, searchTags) }}>태그 검색</button>}
               </div>
               <div className='copydc'>
                  <input readOnly type="text" value={selectDCcon} />
                  <CopyToClipboard text={"~" + selectDCcon}>
                     <button onClick={() => {
                        setCopyText("복사되었습니다")
                        setTimeout(() => {
                           setCopyText("")
                        }, 1500);
                     }}>디시콘 복사</button>
                  </CopyToClipboard>
               </div>
            </div>
         </div>
         <div className='dcconlists'>
            <div className='dcconlist'>
               {dcconlist.length > 0 &&
                  dcconlist.map((data, index) => (
                     <div className='dccon' key={index}>
                        <div className='dcdccon' onClick={() => { setSelectDCcon(data.keywords) }}>
                           <img src={`https://kojkkojk.github.io/hamoonrang/dccon/images/${data.name}`} />
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Dccon;