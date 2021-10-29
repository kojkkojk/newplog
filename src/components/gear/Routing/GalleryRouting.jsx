import React from 'react'
import BBSboard from '../main/BBSboard';
import BBSDetails from '../main/BBSDetails';
function GalleryRouting({galleryId,userOn}) {
   
   return (
      <>
       {galleryId ?
         <BBSDetails docId={galleryId} bbsType={"bbs3"} path={"gallery"} userOn={userOn} queryString={"contentid"}/>
      : 
      <BBSboard
      bbsType={"bbs3"}
      bbsTitle={"📸 갤러리"}
      path={"gallery"}
      queryString={"galleryId"}
      />
       }  
      </>
   )
}

export default GalleryRouting
