import {LOGIN_USER,LOGOUT_USER} from '../type';

const initState = {
   userData:null
}
export default function authReducer(state=initState,action){
   switch (action.type) {
      case LOGIN_USER:
         return {
            ...state,
            userData:action.payload
         }
      case LOGOUT_USER:
         return {
            ...initState
         }
      default:
         return state;
   }
}