import { HASH_SAVE } from '../type';

export const hashremember = (hash) => {
   return {
      type: HASH_SAVE,
      payload: hash
   }
}