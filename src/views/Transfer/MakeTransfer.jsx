import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
FontAwesomeIcon

const MakeTransfer = () => {
  const [formData, setFormData] = useState({
    account: '',
    receiver: '', 
    amount: '',
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
        'https://rldondon.pythonanywhere.com/transfer ',
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
      <div className='bg-[#2D2A32]/50 rounded-lg relative p-5 flex flex-col gap-5'>
        <div className='function flex items-center'>
        <FontAwesomeIcon icon={faPaperPlane} size="md" />
          <span className='w-fit p-3 rounded-lg'>Make a Transfer</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='gap-5 flex flex-col relative min-w-[450px] w-[100%] rounded-lg'>
            <div className='field account'>
                <label htmlFor="email">Sending Account</label>
                <input type="text" id="account" name="account" value={formData.account} onChange={handleChange}/>
            </div>
            <div className='field receiver'>
                <label htmlFor="receiver">Receiver</label>
                <input type="text" id="receiver" name="receiver" value={formData.receiver} onChange={handleChange}/>
            </div>
            <div className='field amount'>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange}/>
            </div>
            <div className='field pin'>
              <label htmlFor='pin'>Pin</label>
              <input type='password' id='pin' name='pin' value={formData.pin} onChange={handleChange} />
            </div>

            <button type='submit' className='submit_signup  bg-red-700 flex justify-center items-center gap-3 hover:bg-red-800 transition-ease-in duration-300'>
            <FontAwesomeIcon icon={faPaperPlane} size="sm" /> Send money
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

export default MakeTransfer;
