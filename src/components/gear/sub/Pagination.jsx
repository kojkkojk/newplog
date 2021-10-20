import React, { useState } from 'react'

function Pagination({ postPerPage, totalPosts, paginate,currentPage }) {
   const [currentLists, setCurrentLists] = useState(0)
   const pageNumbers = [];
   // 페이지 넘버를 설정하기 위해 페이지당 포스트 개수와 총 포스트 개수를 가져온다.
   // index 를 1로 설정하고, index 가 (총 포스트개수 / 페이지당 포스트 개수) 보다 크지 않을때까지 i값을 올린다.
   // 그리고 그 값을 pageNumber 에 넣어서 설장한다.
   for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
      pageNumbers.push(i);
   }
   const pagelist = pageNumbers.slice(currentLists, currentLists + 5)

   const plus = (n, a) => {
      if (n >= a.length / 2) {
         setCurrentLists(Math.ceil(a.length / 2) + 1)
      } else if (n < 0) {
         setCurrentLists(0)
      } else {
         setCurrentLists(n + 1)
      }
   }
   const checkNum2 = (n, a) => {
      if (n > Math.ceil(a.length / 2)) {
         setCurrentLists(5)
      } else if (n < 1) {
         setCurrentLists(0)
      } else {
         setCurrentLists(n - 1)
      }
   }

   if (pageNumbers.length <= 5) {
      return (
         <ul className='pagination'>
            <li>◀◀</li>
            <li>◀</li>
            {
               pageNumbers.map(number => (
                  <li style={currentPage === number ? {color:"blue"}:{color:"black"}} key={number} onClick={() => {
                     paginate(number)
                  }}>
                     {number}
                  </li>
               ))
            }
            <li>▶</li>
            <li>▶▶</li>
         </ul>
      )
   } else {
      return (
         <>
            <ul className='pagination'>
               <li onClick={() => { setCurrentLists(0) }}>◀◀</li>
               <li onClick={() => {
                  checkNum2(currentLists, pageNumbers)
               }}>◀</li>
               {
                  pagelist.map(number => (
                     <li style={currentPage === number ? {color:"blue"}:{color:"black"}} key={number} onClick={() => {
                        paginate(number)
                     }}>
                        {number}
                     </li>
                  ))
               }
               <li onClick={() => {
                  if (pageNumbers.length - currentLists === 5) {
                     alert(`총 ${pageNumbers.length}페이지 입니다.`)
                  } else {
                     plus(currentLists, pageNumbers)
                  }
               }}>▶</li>
               <li onClick={() => { setCurrentLists(pageNumbers.length - 5) }}>▶▶</li>
            </ul></>
      )
   }

}

export default Pagination
