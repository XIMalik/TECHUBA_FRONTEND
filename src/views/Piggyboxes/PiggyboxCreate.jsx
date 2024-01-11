import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PiggyboxCreate = () => {
  const [formData, setFormData] = useState({
    name_of_box: '',
    target_amount: '',
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
        'https://rldondon.pythonanywhere.com/create-piggybox/ ',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      console.log(response.data);
      setData('Piggybox created successfully');
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
          <span className=' w-fit p-3 rounded-lg'>Create a piggybox</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='create-account gap-5 flex flex-col relative min-h-[40vh] min-w-[450px] w-[100%] rounded-lg'>
            <div className='field name_of_box'>
              <label htmlFor='name_of_box'>Name of box</label>
              <input type='text' id='name_of_box' name='name_of_box' value={formData.name_of_box} onChange={handleChange} />
            </div>
            <div className='field target_amount'>
              <label htmlFor='target_amount'>Target amount</label>
              <input type='text' id='target_amount' name='target_amount' value={formData.target_amount} onChange={handleChange} />
            </div>

            <button type='submit' className='submit_signup absolute bottom-0 bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
              Create piggybox
            </button>
          </div>
        </form>

        { (data || error) && (
        <div className="notification absolute flex justify-center items-center bg-red-900/50 text-white rounded-lg overflow-hidden text-xs top-4 shadow-xl right-2">
            {data && <div className='h-full w-full bg-[#2D2A32] max-w-[400px] p-2'>{data}</div>}
            {error && <div className='h-full w-full bg-red-900 p-2'>{error}</div>}
        </div>
        )}


      </div>
    </>
  );
};

export default PiggyboxCreate;
