import axios from 'axios';
import React, { useState } from 'react';

const TransactionHistory = () => {
  const [formData, setFormData] = useState({
    account_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://rldondon.pythonanywhere.com/${formData.account_number}/transactions`,
        {
          params: formData,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      setData(response.data) 
      console.log(response.data);     
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <div className='bg-[#2D2A32]/50 rounded-lg relative p-5 h-[100%] w-full flex flex-col gap-5'>
        <div className="function flex items-center">
          <div className='w-[10px] bg-white rounded-lg h-[25px]'></div>
          <span className=' w-fit p-3 rounded-lg'>Transaction History</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='create-account gap-5 flex flex-col relative min-h-[17vh] min-w-[450px] w-[100%] rounded-lg'>
            <div className='field pin'>
              <label htmlFor='account_number'>Account</label>
              <input type='text' id='account_number' name='account_number' value={formData.account_number} onChange={handleChange} />
            </div>
            <button type='submit' className='submit_signup absolute bottom-0 bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
              Get transactions history
            </button>
          </div>
        </form>

        {data && (
  <div className='history_render h-[30vh] overflow-y-scroll flex flex-col gap-3'>
    {data.Transactions.map((item) => (
      <div key={item.id} className='transaction_history_item flex bg-[#2D2A32]/50 p-3 rounded-lg flex-col gap-5'>
      <div className="accounts flex items-center gap-10">
      <div>
          <span className='text-xs uppercase'>Sending account</span>
          <h2 className='tracking-wider'>{item.Transaction_type}</h2>
      </div>
      <div>
          <span className='text-xs uppercase'>account balance</span>
          <h2 className='tracking-wider'>{item.Account_balance}</h2>
      </div>
      <div>
          <span className='text-xs uppercase'>Amount</span>
          <h2 className='tracking-wider'>{item.Amount}</h2>
      </div>
      </div>
      
      
      <div className='flex flex-col justify-start items-end w-full'>
      <span className='text-xs uppercase'>Date of transaction</span>
      <h2 className='tracking-wider'>{item.Time}</h2>
      </div>

      
    </div>
    ))}
  </div>
)}


        {error && (
          <div className="notification absolute flex justify-center items-center bg-red-900/50 text-white rounded-lg overflow-hidden text-xs top-4 right-2">
            {error && <div className='h-full w-full bg-red-900 p-2'>{error}</div>}
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
