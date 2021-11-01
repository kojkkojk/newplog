import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase';
import { collection, getDocs } from "firebase/firestore";
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Pagenate({ bbsType, bbsTitle, path, queryString }) {
   const db = getDocs(collection(firestore, "BBS", `STORY/${bbsType}`));
   const [posts, setPosts] = useState([]);
   const [allPosts, setAllPosts] = useState([])
   const [currentPage, setCurrentPage] = useState(1);
   const [postPerPage] = useState(10);
   const indexOfLastPost = currentPage * postPerPage;
   const indexOfFirstPost = indexOfLastPost - postPerPage;
   const paginate = (number) => setCurrentPage(number);

   const dbLinks = async () => {
      await db.then(data => {
         let emptyArr = []
         data.forEach((doc) => {
            emptyArr.push([doc.id, doc.data()])
         })
         emptyArr.sort((a, b) => b[1].index - a[1].index)
         setAllPosts(emptyArr)
         let a = emptyArr.slice(indexOfFirstPost, indexOfLastPost)
         setPosts(a);
      })
   }

   useEffect(() => {
      dbLinks();
   }, [currentPage])

   return (
      <>
         <div className='bbsTable'>
            <h2 className='bbsTitle'><span>{bbsTitle}</span></h2>
            <Table className='bbsTabless' striped bordered>
               <colgroup>
                  <col width={"10%"} />
                  <col width={"70%"} />
                  <col width={"20%"} />
               </colgroup>
               <thead>
                  <tr style={{textAlign:"center"}}>
                     <th>분류</th>
                     <th>제목</th>
                     <th>날짜</th>
                  </tr>
               </thead>
               <tbody>
                  {posts.length > 0 &&
                     posts.map((data, index) => (
                        <tr key={index}>
                           <td className='listContents'>{data[1].category}</td>
                           <td className='listContents'>
                              <strong><Link className='bbsanchor' to={`/${path}?${queryString}=${data[0]}`}>{data[1].title}</Link></strong>
                           </td>
                           <td className='listContents'>{data[1].date}</td>
                        </tr>
                     ))
                  }
               </tbody>
            </Table>
         </div>
         <Pagination
            postPerPage={postPerPage}
            totalPosts={allPosts.length}
            paginate={paginate}
            currentPage={currentPage}
         />
      </>
   )
}

export default Pagenate
