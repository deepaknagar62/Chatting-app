import React from 'react'
import Header from '../Components/Header'
import './Css/register.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
    const navigate = useNavigate();

    const openRegisterPage =()=>{
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
  
    };
  return (
    <>
       <Header> </Header>
      <div className="container">
          <h2>Sign In</h2>
          <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="name">Email:</label>
                  <input type="text" className="form-control" placeholder='Enter your email' />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password"  className="form-control" placeholder='Enter your password' />
              </div>
              <button type="submit" className="btn-submit">Login</button>
          </form>

          <div onClick={openRegisterPage}> <p className='simple-txt'>
            Go to Sign Up page</p></div>
      </div>
      
    </>
  )
}
