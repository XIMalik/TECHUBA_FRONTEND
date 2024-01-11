import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand, faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';


const LeaveGroup = () => {
    const [formData, setFormData] = useState({
            account : '',
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
          const response = await axios.post(
            `https://rldondon.pythonanywhere.com/groups/leave-${formData.group_name}`,
            formData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            }
          );
            
          console.log(formData)
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
          <div className=' rounded-lg p-5 h-[100%] w-full absolute flex flex-col gap-5'>
            <div className='function flex items-center'>
            <FontAwesomeIcon icon={faUser} className='text-green-100'/>
              <span className=' w-fit p-3 rounded-lg'>Leave a group</span>
            </div>
    
            <form onSubmit={handleSubmit}>
              <div className='create-account gap-5 flex flex-col relative min-h-[45vh] min-w-[450px] w-[100%] rounded-lg'>
                <div className='field target_amount'>
                  <label htmlFor='group_name'>Group name</label>
                  <input type='text' id='group_name' name='group_name' value={formData.group_name} onChange={handleChange} />
                </div>
                <div className='field target_amount'>
                  <label htmlFor='account'>Withdrawal account</label>
                  <input type='text' id='account' name='account' value={formData.account} onChange={handleChange} />
                </div>
                <button type='submit' className='submit_signup absolute bottom-0 mt-5 bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
                  Leave {formData.group_name}
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
export default LeaveGroup