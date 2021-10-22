import { WRITE_CONTENTS,DELETE_CONTENTS } from '../type';

export const createContents = (content) => {
   return {
      type: WRITE_CONTENTS,
      payload: content
   }
}

export const deleteContents = ()=>{
   return {
      type:DELETE_CONTENTS
   }
}