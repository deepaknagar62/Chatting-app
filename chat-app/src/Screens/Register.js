import './Css/register.css'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  
  

  const navigate = useNavigate();

    const openLoginPage =()=>{
        navigate('/login');
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:3001/user/register', userData); 
      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <>
      <Header> </Header>
      <div className="container">
        <h2>Sign Up</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="form-control" />
          </div>
          <button type="submit" className="btn-submit">Register</button>
        </form>
        <div onClick={openLoginPage}> <p className='simple-txt'>Go to Login page</p></div>
      </div>
    </>
  );
}
