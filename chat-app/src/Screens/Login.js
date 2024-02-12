import React, {  useState } from 'react'
import Header from '../Components/Header'
import './Css/register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Components/UserProvider';


export default function Login() {
 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
 
  const {setUserData } = useUser();


  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try {
      const response = await axios.post('http://localhost:3001/user/login', { email, password }); 
      const { _id , name} = response.data;

      if (_id && name) {
        setUserData(prevUserData => ({ ...prevUserData, userId: _id, userName: name }));
        navigate('/chatpage');
      } else {
        console.error('Error: User not found');
       
      }
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Sign In</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>
        <div onClick={() => navigate('/')}>
          <p className="simple-txt">Go to Sign Up page</p>
        </div>
      </div>
    </>
  );
}


