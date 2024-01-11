import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    pin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [data, setData] = useState(null); // Initialize the data state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://rldondon.pythonanywhere.com/create-account ',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message); // Assuming you have an 'setError' state
    }
  };

  const [error, setError] = useState(null); // Initialize the error state

  return (
    <>
      <div className='bg-[#2D2A32]/50 rounded-lg p-5 h-[100%] w-full absolute flex flex-col gap-5'>
        <div className='function flex items-center'>
          <div className='w-[10px] bg-blue-600 rounded-lg h-[25px]'></div>
          <span className=' w-fit p-3 rounded-lg'>Create account</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='create-account gap-5 flex flex-col relative min-h-[40vh] min-w-[450px] w-[100%] rounded-lg'>
            <div className='field pin'>
              <label htmlFor='pin'>Pin</label>
              <input type='password' id='pin' name='pin' value={formData.pin} onChange={handleChange} />
            </div>

            <button type='submit' className='submit_signup absolute bottom-0 bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
              Create account
            </button>
          </div>
        </form>

        { (data || error) && (
        <div className="notification absolute flex justify-center items-center bg-red-900/50 text-white rounded-lg overflow-hidden text-xs top-4 shadow-xl right-2">
            {data && <div className='h-full w-full bg-[#2D2A32] max-w-[400px] p-2'>{JSON.stringify(data)}</div>}
            {error && <div className='h-full w-full bg-red-900 p-2'>{error}</div>}
        </div>
        )}


      </div>
    </>
  );
};

export default CreateAccount;
