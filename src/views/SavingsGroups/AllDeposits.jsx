import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faNewspaper, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';


const AllDeposits = () => {
    const [formData, setFormData] = useState({
            group_name : '',
      });
    
      const handleChange = (e) => {
        const { name, value, checked } = e.target;
      
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'is_private' ? checked : value,
        }));
      };
      
    
      const [data, setData] = useState(null); 
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.get(
            `https://rldondon.pythonanywhere.com/groups/${formData.group_name}/deposits`,
            {
              params: formData,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            }
          );
      
          console.log(formData);
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error:', error.message);
          setError(error.message);
        }
      };
      
    
      const [error, setError] = useState(null); // Initialize the error state
    
      return (
        <>
          <div className=' rounded-lg p-5 h-[100%] w-full absolute flex flex-col gap-5'>
            <div className='function flex items-center'>
            <FontAwesomeIcon icon={faNewspaper} className='text-green-100'/>
              <span className=' w-fit p-3 rounded-lg'>Get all deposits</span>
            </div>
    
            <form onSubmit={handleSubmit}>
              <div className='create-account gap-5 flex flex-col relative h-fit min-w-[450px] w-[100%] rounded-lg'>
                <div className='field target_amount'>
                  <label htmlFor='group_name'>Group name</label>
                  <input type='text' id='group_name' name='group_name' value={formData.group_name} onChange={handleChange} />
                </div>
                <button type='submit' className='submit_signup bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
                  Get all deposits
                </button>
              </div>
            </form>

            <div className="all_deposits_render">
            {data && (
                <div className='accounts_form h-[40vh] w-full bg-[#2D2A32] rounded-lg p-5 overflow-y-scroll'>
                    <div className="rendered_leaderboard w-full flex flex-col gap-4">
                    
                    {data.map((item, index) => (
                        <div className="w-full flex justify-between bg-[#000]/10 p-5 rounded-lg text-center" key={item.index}>
                            <div className='number'>
                                <span>{index + 1}</span>
                            </div> 
                        <div className='deposits_amount'>
                            <h1 className='text-[18px] font-bold flex gap-1 items-end'><span className='text-xs tracking-wide'>NGN</span>{item.amount}</h1>
                        </div>
                        <div className='amounts'>
                            <span className='flex gap-2 text-sm text-white/50'>{item.user}</span>
                        </div>
                        </div>
                    ))}
                    </div> 
                </div>
            )}
            </div>

            { (error) && (
            <div className="notification absolute flex justify-center items-center bg-red-900/50 text-white rounded-lg overflow-hidden text-xs top-4 shadow-xl right-2">
                {error && <div className='h-full w-full bg-red-900 p-2'>{error}</div>}
            </div>
            )}
    
          </div>
        </>
      );
    };
export default AllDeposits