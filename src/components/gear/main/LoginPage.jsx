import React from 'react'
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useHistory } from 'react-router-dom';

function LoginPage() {
   return (
      <div className='LoginPage'>
         <form className='loginform' onSubmit={(e) => {
            e.preventDefault();
         }}>
            <h2 style={{ textAlign: "center" }}>로그인</h2>
            <div className='loginput'>
               <label style={{ width: '100%', float: "left" }} htmlFor="email"><HiOutlineMail />{" "}Email Address</label>
               <input className='loginInput' placeholder='이메일' autoComplete='none' type="email" name="email" />
            </div>
            <div className='loginput'>
               <label style={{ width: '100%', float: "left" }} htmlFor="password"><RiLockPasswordLine />{" "}password</label>
               <input className='loginInput' placeholder='비밀번호' type="password" name="password" />
            </div>
            <div className='loginton'>
               <input className='loginbutton' type="submit" value="login" />
               <div style={{ marginTop: "25px" }}> <Link style={{ color: "grey", textDecoration: "none" }} to="/join">회원가입 페이지로</Link></div>
            </div>
         </form>
      </div>
   )
}

export default LoginPage
