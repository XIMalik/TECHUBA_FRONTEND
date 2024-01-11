import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'
import MakeTransfer from './MakeTransfer'
import TransferHistory from './TransferHistory'

const Transfer = () => {
    // const {logedInUser} =useContext(UserContext)
    const [data, setData] = useState({ count: 0, next: null, previous: null, results: [] });
    const [showBalance, setShowBalance] = useState(true); // State to track visibility
    const [buttonText, setButtonText] = useState('Hide balance'); // Initial text for the button

    const toggleBalanceVisibility = () => {
        setShowBalance((prevShowBalance) => !prevShowBalance);
        setButtonText((prevButtonText) => (prevButtonText === 'Show balance' ? 'Hide balance' : 'Show balance'));
      };
  
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        const refresh_token = localStorage.getItem('refresh_token');
      
        // Additional logic related to localStorage if needed
      
      }, []);
      
      useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
          window.location.href = '/login';
        } else {
          (async () => {
            try {
              const response = await axios.get(
                'https://rldondon.pythonanywhere.com/my-accounts',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                }
              );
              setData(response.data)
            } catch (e) {
              console.log('Error:', e.message);
              console.log('Not authorized');
            }
          })();
        }
      }, []);

  return (
    <div className='w-[100%] h-fit flex flex-col gap-3'>
      <div className="top">

      <div className="top flex justify-between mb-2">
            {/* <div className='text-md font-semibold text-white/50'>You have {data.count} registered accounts</div> */}
            <button>
                <span onClick={toggleBalanceVisibility} className='text-white text-xs p-3 rounded-lg'>{buttonText}</span>
            </button>
        </div>
      <div className="account_display flex gap-3">   
        {data.results.map((result) => (
            <div key={result.account_number} className='account_details flex bg-[#2D2A32]/50 p-7 rounded-lg flex-col-reverse gap-4'>
            <h2 className='tracking-wider'>{result.account_number}</h2>
                <h1>
                    <span className='text-xs tracking-wider'>NGN</span> {showBalance ? result.account_balance : '***'}
                </h1>
            </div>
        ))}
        </div>
        </div>

        <div className="holder flex gap-3">
      <div className="maketransfer w-[40%] h-[60vh]">
        <MakeTransfer/>
      </div>
      <div className="maketransfer w-[60%] h-full">
        <TransferHistory/>
      </div>
      </div>
    </div>
  )
}

export default Transfer