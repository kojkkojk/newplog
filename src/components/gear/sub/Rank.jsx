import React, { useEffect, useState } from 'react'
import { apiKey, host, DAILY_BOXOFFICE_URI, today } from '../../../configs/data';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Rank() {
   const [rank, setRank] = useState([])

   const callApi = () => {
      axios.get(`${host}${DAILY_BOXOFFICE_URI}.json?key=${apiKey}&targetDt=${today}`).then(res => {
         let resData = res.data
         console.log(resData);
         setRank(resData.boxOfficeResult.dailyBoxOfficeList)
      })
   }
   function 점찍기(ss){
      let d = Number.parseInt(ss)
      return d.toLocaleString()
   }

   useEffect(() => {
      callApi()
   }, [])

   return (
      <>
      <Table className='bbsTabless' striped bordered>
               <colgroup>
                  <col width={"10%"} />
                  <col width={"50%"} />
                  <col width={"20%"} />
                  <col width={"20%"} />
               </colgroup>
               <thead>
                  <tr style={{textAlign:"center"}}>
                     <th>순위</th>
                     <th>제목</th>
                     <th>개봉일</th>
                     <th>누적관객</th>
                  </tr>
               </thead>
               <tbody>
                  {rank.length > 0 &&
                     rank.map((data, index) => (
                        <tr key={index}>
                           <td style={{textAlign:"center"}}>{data.rank}</td>
                           <td>{data.movieNm}</td>
                           <td style={{textAlign:"center"}}>{data.openDt.slice(5)}</td>
                           <td style={{textAlign:"center"}}>{점찍기(data.audiAcc)}</td>
                        </tr>
                     ))
                  }
               </tbody>
            </Table>
      </>
   )
}

export default Rank
