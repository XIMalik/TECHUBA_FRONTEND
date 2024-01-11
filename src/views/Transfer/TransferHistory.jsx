import React, { useEffect, useState } from 'react'
import { faNewspaper, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


const TransferHistory = () => {

    
      const [data, setData] = useState(null); // Initialize the data state
    
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
                'https://rldondon.pythonanywhere.com/transfers',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                }
              );
              setData(response.data)
              console.log(response.data)
            } catch (e) {
              console.log('Error:', e.message);
              console.log('Not authorized');
            }
          })();
        }
      }, []);
    
      const [error, setError] = useState(null); // Initialize the error state


  return (
    <div className='bg-[#2D2A32]/50 h-full w-[100%] overflow-y-scroll max-h-[70vh] rounded-lg p-5 flex flex-col gap-5 '>
        <div className="top flex gap-3 items-center sticky top-0 bg-[#2D2A32] w-full h-[100px] rounded-lg p-3">
            <FontAwesomeIcon icon={faNewspaper} size="md"/>
            <span>Transfer History</span>
        </div>
        <div className="history_items flex flex-col gap-5">
        {data?.results?.map((result) => (
          <div key={result.id} className='transaction_history_item flex bg-[#2D2A32]/50 p-3 rounded-lg flex-col gap-5'>
            <div className="accounts flex items-center gap-10">
            <div>
                <span className='text-xs uppercase'>Sending account</span>
                <h2 className='tracking-wider'>{result.sender}</h2>
            </div>
            <div>
                <span className='text-xs uppercase'>Receiving account</span>
                <h2 className='tracking-wider'>{result.receiver}</h2>
            </div>
            <div>
                <span className='text-xs uppercase'>Amount</span>
                <h2 className='tracking-wider'>{result.amount}</h2>
            </div>
            </div>
            
            
            <div className='flex flex-col justify-start items-end w-full'>
            <span className='text-xs uppercase'>Date of transfer</span>
            <h2 className='tracking-wider'>{result.transaction_date}</h2>
            </div>

            
          </div>
        ))}
        </div>
        
    </div>
  )
}

export default TransferHistory