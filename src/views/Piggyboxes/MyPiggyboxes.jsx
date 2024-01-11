import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyPiggyboxes = () => {

    const [data, setData] = useState()

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
          window.location.href = '/login';
        } else {
          (async () => {
            try {
              const response = await axios.get(
                'https://rldondon.pythonanywhere.com/my-piggyboxes/',
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
  return (
    <div className='flex gap-2'>
        {data && data.map((item) => (
        <div key={item.box} className='account_details w-[230px] flex flex-col bg-[#2D2A32]/50 p-5 rounded-lg gap-4'>
            <div className="top flex justify-between">
            <lord-icon
            src="https://cdn.lordicon.com/ksdjzsym.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#ffffff"
            style={{width:25, height:25}}>
        </lord-icon>
        <p className='font-bold text-lg'>{item.Box}</p>
            </div>

            <div className="current_target flex flex-col gap-3">
                <span>{item.id}</span>
                <div className="current flex items-center justify-between">
                    <span className='text-xs uppercase font-normal'>Current</span>
                    <p className='font-bold'><span className='text-xs tracking-wider'>NGN</span> {item['Current Amount']}</p>
                </div>
                <div className="current flex items-center justify-between">
                    <span className='text-xs uppercase font-normal'>Target</span>
                    <p className='font-bold'><span className='text-xs tracking-wider'>NGN</span> {item['Target Amount']}</p>
                </div>
                
            </div>
        </div>
      ))}
    </div>
  )
}

export default MyPiggyboxes