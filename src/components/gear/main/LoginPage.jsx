import React, { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
   const [loginData, setLoginData] = useState({})
   const auth = getAuth();
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState("")
   const handleChanges = (e) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value
      })
   }
   const history = useHistory()
   const loginFunc = async(data)=>{
      await signInWithEmailAndPassword(auth,data.email,data.password).then(userData=>{
         setLoading(true)
         setLoading(false)
         history.push("/")
      }).catch((error) => {
         setLoading(false)
         setErrors(error.message)
         setTimeout(() => {
            setErrors("")
         }, 2000);
      });
   }

   return (
      <div className='LoginPage'>
         <form className='loginform' onSubmit={(e) => {
            e.preventDefault();
            loginFunc(loginData)
         }}>
            <h2 style={{ textAlign: "center" }}>로그인</h2>
            <div className='loginput'>
               <label style={{ width: '100%', float: "left" }} htmlFor="email"><HiOutlineMail />{" "}Email Address</label>
               <input className='loginInput' placeholder='이메일' autoComplete='none' type="email" name="email" onChange={handleChanges}/>
            </div>
            <div className='loginput'>
               <label style={{ width: '100%', float: "left" }} htmlFor="password"><RiLockPasswordLine />{" "}password</label>
               <input className='loginInput' placeholder='비밀번호' type="password" name="password" onChange={handleChanges}/>
            </div>
            <div className='loginton'>
               <input className='loginbutton' disabled={loading} type="submit" value="login" />
               <div style={{ marginTop: "25px" }}> <Link style={{ color: "grey", textDecoration: "none" }} to="/join">회원가입 페이지로</Link></div>
               {errors && <p>{errors}</p>}
            </div>
         </form>
      </div>
   )
}

export default LoginPage
