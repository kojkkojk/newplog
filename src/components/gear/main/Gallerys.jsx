import React, { useEffect, useState, useRef } from 'react'
import { firestore } from '../../../configs/firebase';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'

function Gallerys() {
   const db = getDocs(collection(firestore, "BBS", `STORY/bbs3`));
   const [loading, setLoading] = useState(true); // 로딩중인지 아닌지를 담기위한 state
   const [AllinstaData, setAllInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
   const [instaData, setInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
   const [currentPage, setCrrentPage] = useState(6)
   const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
   const messageEl = useRef(null);

   useEffect(() => {
      if (messageEl) {
         messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
         });
      }
   }, [])

   const fetchData = async () => {
      // 로딩중인 상태로 전환
      setLoading(true);
      await db.then(data => {
         let emptyArr = []
         data.forEach((doc) => {
            emptyArr.push([doc.id, doc.data()])
         })
         emptyArr.sort((a, b) => b[1].index - a[1].index)
         setAllInstaData(emptyArr)
         let a = emptyArr.slice(0, currentPage)
         setInstaData(a);
      }).catch(e => console.log(e))
      // 로딩중이지 않은 상태로 전환
      setLoading(false);
   }

   const fetchMoreInstaFeeds = async () => {
      // 추가 데이터를 로드하는 상태로 전환
      setFetching(true);
      const fetchedData = AllinstaData.slice(currentPage, (currentPage + currentPage))
      // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
      // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다. 
      setInstaData([...instaData, ...fetchedData]);
      setCrrentPage(currentPage + 1)
      // 추가 데이터 로드 끝
      setCrrentPage(currentPage + currentPage)
      setFetching(false);
   };


   useEffect(() => {
      fetchData()
   }, [])

   return (
      <div className='noticePage'>
         <h2 className='bbsTitle'>📸 Gallery</h2>
         <div className='noticeInfiniteScroll' ref={messageEl}>
            <div className='imgName'>
               {loading && <>loading...</>}
               {
                  instaData.length > 0 &&
                  instaData.map((data, index) => (
                     <div className='instarGram' key={index}>
                        <div className='imgBox'>
                           <img src={data[1].fileURL} alt={data[1].title} />
                        </div>
                        <div className='qwer'>
                           <Link className='bbsanchor' to={`/gallery?galleryId=${data[0]}`}>{data[1].title}</Link>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
         <div className='infinitescrolls'>
            <button disabled={fetching} onClick={fetchMoreInstaFeeds}>MORE</button>
         </div>
      </div>
   )
}

export default Gallerys
