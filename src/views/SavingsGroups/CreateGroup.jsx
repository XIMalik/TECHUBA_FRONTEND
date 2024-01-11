import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand } from '@fortawesome/free-regular-svg-icons';


const CreateGroup = () => {
    const [formData, setFormData] = useState({
            group_name : '',
            target_amount : '',
            is_private : true
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
            'https://rldondon.pythonanywhere.com/create-group/ ',
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
          <div className=' rounded-lg p-5 h-[100%] w-full absolute flex flex-col gap-5'>
            <div className='function flex items-center'>
            <FontAwesomeIcon icon={faHand} className='text-green-100'/>
              <span className=' w-fit p-3 rounded-lg'>Create a savings group</span>
            </div>
    
            <form onSubmit={handleSubmit}>
              <div className='create-account gap-5 flex flex-col relative min-h-[40vh] min-w-[450px] w-[100%] rounded-lg'>
              <div className='field target_amount'>
                  <label htmlFor='group_name'>Group name</label>
                  <input type='text' id='group_name' name='group_name' value={formData.group_name} onChange={handleChange} />
                </div>
                <div className='field name_of_box'>
                  <label htmlFor='target_amount'>Target amount</label>
                  <input type='text' id='target_amount' name='target_amount' value={formData.target_amount} onChange={handleChange} />
                </div>
                <div className='field is_private flex gap-2 justify-start items-start'>
                    <label htmlFor='is_private'>
                        Private group
                    </label>
                    <input type='checkbox' id='is_private' name='is_private' checked={formData.is_private} onChange={handleChange}/>
                    </div>
    
                <button type='submit' className='submit_signup absolute bottom-0 bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>
                  Create piggybox
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
export default CreateGroup