import React, { useState } from 'react'
import './Css/register.css'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

    const openLoginPage =()=>{
        navigate('/login');
    }


  const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
          setImage(reader.result);
      };

      if (file) {
          reader.readAsDataURL(file);
      } else {
          setImage(null);
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      setImage(null);
  };

  return (
     <> 
      <Header> </Header>
      <div className="container">
          <h2>Sign Up</h2>
          <form className="register-form" onSubmit={handleSubmit}>
              <div className="form-group">
               {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px', marginLeft:'50px' }} />}
                  <label htmlFor="image">Upload Profile:</label>
                  <input type="file" id="image" className="form-control-file" accept="image/*" onChange={handleImageChange} />
                  
              </div>
              <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="name">Email:</label>
                  <input type="text" id="email" className="form-control"  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" className="form-control"  />
              </div>
              <button type="submit" className="btn-submit">Register</button>
          </form>
           <div onClick={openLoginPage}> <p className='simple-txt'>
            Go to Login page</p></div>
       </div>
      </>
  );
}
