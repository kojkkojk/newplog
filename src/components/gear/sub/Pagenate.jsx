import React, { useEffect, useState } from 'react';
import { firestore } from '../../../configs/firebase';
import { collection, getDocs } from "firebase/firestore";
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

function Pagenate({ bbsType,bbsTitle,path,queryString }) {
   const db = getDocs(collection(firestore, "BBS", `STORY/${bbsType}`));
   const [posts, setPosts] = useState([]);
   const [allPosts, setAllPosts] = useState([])
   const [currentPage, setCurrentPage] = useState(1);
   const [postPerPage, setPostPerPage] = useState(10);
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
   console.log("loop? Pagenate");

   }, [currentPage])

   return (
      <>
         <div className='bbsTable'>
            <h2 className='bbsTitle'><span>{bbsTitle}</span></h2>
            {posts.length > 0 &&
               posts.map((data, index) => (
                  <div className='listContents' key={index}>
                    <h4><Link className='bbsanchor' to={`/${path}?${queryString}=${data[0]}`}>{data[1].title}</Link></h4>
                  </div>
               ))
            }
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
