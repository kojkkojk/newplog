import React from 'react';
import { getDatabase, ref, set } from "firebase/database";

function Spec() {

   function writeUserData(userId, name, email, imageUrl) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        profile_picture : imageUrl
      });
    }

   return (
      <div>
      </div>
   )
}

export default Spec
