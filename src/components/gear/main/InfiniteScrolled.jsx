import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios';
import { apiIMGURL, apiKey, apiURL } from '../../../configs/data'
function InfiniteScrolled() {
   const [loading, setLoading] = useState(true); // 로딩중인지 아닌지를 담기위한 state
   const [instaData, setInstaData] = useState([]); // API로부터 받아온 내 피드 데이터를 배열에 저장
   // const [instaPaging, setInstaPaging] = useState < IPagingData > ({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장
   const [currentPage, setCrrentPage] = useState(1)
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

   const fetchData = async (endPoint) => {
      // 로딩중인 상태로 전환
      setLoading(true);
      await axios.get(endPoint).then(res => {
         // GET 요청으로 받아온 데이터를 state에 잘 넣어줍니다
         setInstaData(res.data.results);
      }).catch(e => console.log(e))

      // 로딩중이지 않은 상태로 전환
      setLoading(false);
   }

   const fetchMoreInstaFeeds = async () => {
      // 추가 데이터를 로드하는 상태로 전환
      setFetching(true);
      // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
      const endPoint = `${apiURL}movie/popular?api_key=${apiKey}&language=ko&page=${currentPage + 1}`
      await axios.get(endPoint)
         .then((response) => {
            const fetchedData = response.data.results; // 피드 데이터 부분
            // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다. 
            const mergedData = instaData.concat(...fetchedData);
            setInstaData(mergedData);
            setCrrentPage(currentPage + 1)
         });
      // 추가 데이터 로드 끝
      setFetching(false);
   };

   
   useEffect(() => {
      const endPoint = `${apiURL}movie/popular?api_key=${apiKey}&language=ko&page=1`
      fetchData(endPoint)
   }, [])

   return (
      <div style={{ width: "80%", margin: "0" }}>
         <div style={{ width: "85%", margin: "1rem auto" ,height:"600px",overflow:"scroll"}} ref={messageEl}>
            <h2>Infinite Scroll</h2>
            <hr />
            {
               instaData.length > 0 &&
               instaData.map((data,index)=>(
                  <div key={index}>
                     {data.title}
                  </div>
               ))
            }
         </div>
         <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={fetchMoreInstaFeeds}>MORE</button>
         </div>
      </div>
   )
}

export default InfiniteScrolled
