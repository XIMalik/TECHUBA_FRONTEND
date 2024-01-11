import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faArrowAltCircleRight, faSquare, faCreditCard, faPaperPlane, faHand, faCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const PublicGroups = () => {

    const [data, setData] = useState('')
    const [error, setError] = useState('')


    const [selectedItem, setSelectedItem] = useState(null);

    const [groupName, setGroupName] = useState('')

    const handleShowInfo = (item) => {
        setSelectedItem(item);
    };

    const handleHideInfo = () => {
      setSelectedItem(null)
      console.log('clicked')
    }

    const handleJoinGroup = () => {
        setGroupName(selectedItem.group_name);
      };
      

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
          window.location.href = '/login';
        } else {
          (async () => {
            try {
              const response = await axios.get(
                'https://rldondon.pythonanywhere.com/groups/public',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                }
              );
              setData(response.data);
              console.log(response.data);
            } catch (e) {
              console.log('Error:', e.message);
              console.log('Not authorized');
            }
          })();
        }
      }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post(
          `https://rldondon.pythonanywhere.com/groups/join-${groupName}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );
    
        console.log('Post request successful:', response.data);
        // Assuming you want to set the 'access' token from the response in the Authorization header
      } catch (error) {
        setError(error);
        console.error('Error submitting form:', error);
      }
      };
              
  return (
    <div className='flex flex-col p-5 rounded-lg h-full w-full gap-2'>
        {data && data.map((item) => (
        <div key={item.group_name} onClick={() => handleShowInfo(item)} className='account_details w-full flex flex-col bg-[#2D2A32]/50 p-5 rounded-lg gap-4'>
            <div className="top flex justify-between">
            <FontAwesomeIcon icon={faHand} size='lg' />
            {item.group_name}
            </div>

            {selectedItem && selectedItem.group_name === item.group_name && selectedItem !== null && (
                <div className="moreinfo absolute z-10 bg-[#2D2A32]/50 p-5 rounded-lg overflow-y-scroll h-fit w-[500px] top-[-30px] left-[50%] backdrop-blur-lg">
                    <p className='flex justify-between mb-3'>
                    {selectedItem.group_name}
                    <FontAwesomeIcon icon={faCircleXmark} size='lg' onClick={handleHideInfo} />
                    </p>
                    <div className="infoo flex flex-col gap-6">
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Group Creator</span>
                            <h2 className='tracking-wider'>{item.creator}</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Current amountt</span>
                            <h2 className='tracking-wider'><span className='text-xs tracking-wider'>NGN</span>{' '}{item.current_amount}</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>target amount</span>
                            <h2 className='tracking-wider'><span className='text-xs tracking-wider'>NGN</span>{' '}{item.target_amount}</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Interest</span>
                            <h2 className='tracking-wider'>{item.interest}%</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Date created</span>
                            <h2 className='tracking-wider'>{item.date_created}</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Date fulfilled</span>
                            <h2 className='tracking-wider'>{item.date_fulfilled}</h2>
                        </div>
                        <div className='moreinfo_field flex flex-col gap-1'>
                            <span className='text-xs uppercase font-normal'>Group members</span>
                            <h2 className='tracking-wider'>{item.group_members.length}</h2>
                        </div>
                    </div>

                    <form action="post" onSubmit={handleSubmit}>
                        <button onClick={() => handleJoinGroup()} type='submit' className='submit_signup bg-red-700 hover:bg-red-800 mt-6 transition-ease-in duration-300'>
                        Join Savings Group
                        </button>
                    </form>
                </div>
            )
            }

        </div>

      ))}
    </div>
  )
}

export default PublicGroups