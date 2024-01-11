import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PiggyDelete = () => {
  const [formData, setFormData] = useState({
    box_name: '',
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
      const response = await axios.delete(
        'https://rldondon.pythonanywhere.com/piggyboxdel',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
          data: formData, // Include the data in the request body
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
          <FontAwesomeIcon icon={faTrashCan} />
          <span className=' w-fit p-3 rounded-lg'>Delete piggybox</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='accounts_form gap-5 flex flex-col relative min-h-[40vh] min-w-[450px] w-[100%] rounded-lg'>
            <div className='field account'>
              <label htmlFor='box_name'>Piggybox</label>
              <input type='text' id='box_name' name='box_name' value={formData.box_name} onChange={handleChange} />
            </div>

            <button type='submit' className='submit_signup bg-red-700 absolute bottom-0 hover:bg-red-800 transition-ease-in duration-300'>
              Delete piggybox
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

export default PiggyDelete;
