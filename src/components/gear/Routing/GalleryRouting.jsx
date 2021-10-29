import React from 'react'
import BBSDetails from '../main/BBSDetails';
import Gallerys from '../main/Gallerys';
function GalleryRouting({galleryId,userOn}) {
   
   return (
      <>
       {galleryId ?
         <BBSDetails docId={galleryId} bbsType={"bbs3"} path={"gallery"} userOn={userOn} queryString={"contentid"}/>
      : 
      <Gallerys/>
       }  
      </>
   )
}

export default GalleryRouting
