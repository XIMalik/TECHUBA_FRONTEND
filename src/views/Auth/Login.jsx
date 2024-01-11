import axios from 'axios';
import React, { useEffect, useState,useContext} from 'react';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


const Login = () => {
  const navigate = useNavigate();
  const {setLogedInUser} = useContext(UserContext)

  const [formData, setFormData] = useState({
    password: '',
    email: '',    
  }); 

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    console.log(formData)
    
    e.preventDefault();


    try {
      const response = await axios.post('https://rldondon.pythonanywhere.com/api/token/', formData);
      console.log('Login successful:', response.data);

      localStorage.clear();
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = 
                                      `Bearer ${response['access']}`;
      navigate('/dashboard');
    } catch (error) {
      setError(error)
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
    <div className="signup">

        <Header/>

        <div className="heading flex flex-col justify-center items-center gap-2">
        <h1 className='text-2xl'>Login to your account </h1>
        <p className='text-white/50 text-sm'>Don't have an account? <span className='auth_link'><Link to='/signup'>Sign up</Link></span></p>
        </div>
        <form onSubmit={handleSubmit}>

            <div className='signup_form bg-[#121212]/30 gap-5 flex flex-col h-fit min-w-[450px] w-[40vw] p-5 rounded-lg m-10'>
                    <div className='field email'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className='field password'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                    </div>
                    
                    <button type="submit" className='submit_signup bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>Log in</button>

            </div>
        </form>

        {error && (
          <div className="error-message bg-red-500 text-white p-2 rounded absolute top-0 mt-2">{error.response.data.con}</div>
        )}

    </div>
    </>
  );
};

export default Login;