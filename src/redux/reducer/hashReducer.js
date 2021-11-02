import { HASH_SAVE } from '../type'

const initialContent = {
   hashData: ""
}

export default function hashReducer(state = initialContent, action) {
   switch (action.type) {
      case HASH_SAVE:
         return {
            ...state,
            hashData: action.payload
         }
      default:
         return state;
   }
}