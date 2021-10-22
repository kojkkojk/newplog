import {WRITE_CONTENTS,DELETE_CONTENTS} from '../type';

const initialContent = {
   content:""
}

export default function createReducer(state=initialContent,action){
   switch (action.type) {
      case WRITE_CONTENTS:
         return {
            ...state,
            content:action.payload
         }
      case DELETE_CONTENTS :
         return{
            ...state,
            content:""
         }
      default:
         return state;
   }
}