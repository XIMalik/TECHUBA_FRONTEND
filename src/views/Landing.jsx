import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Landing = () => {
    const image = "https://patoodesign.com/wp-content/uploads/2015/08/UBA-logo.jpg"
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rldondon.pythonanywhere.com/'); 
        console.log('Data fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="base flex flex-col relative h-[100vh] justify-center items-center gap-5">
        <Header/>
      <div className="signupform">
        <h1 className='text-3xl'>TECHUBA Banking Application</h1>

        <div className="auth_buttons flex gap-6 justify-center items-">
        <Link to="/signup">
            <button>
                Sign up
            </button>
        </Link>
        <Link to="/login">
            <button>
                Log in
            </button>
        </Link>

            </div>
        
      </div>
      </div>
    </>
  );
};

export default Landing;