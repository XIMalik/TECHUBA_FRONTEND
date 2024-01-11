import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate()

  const [response, setResponse] = useState('')
  const [error, setError] = useState('')


  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    phone_code: '',
    phone: '',
    transaction_pin: '',
    address:{
        number: '',
        street: '',
        city: '',
        state: '',
        country: ''
    }
    
  }); 

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    
    console.log(formData)
    e.preventDefault();

    try {
      const response = await axios.post('https://rldondon.pythonanywhere.com/register/', formData);
      console.log()
      console.log('Form submitted successfully:', response.data);
      setResponse(response.data)
      navigate('/login')
    } catch (error) {
      setError(error)
      console.error('Error sending form:', error);
      
    
    }
  };

  return (
    <>
    <div className="signup">

        <Header/>

        <div className="heading flex flex-col justify-center items-center gap-2">

        <h1 className='text-2xl'>Register with TechUBA </h1>
        <p className='text-white/50 text-sm'>Already have an account? <span className='auth_link'><Link to='/login'>Log in</Link></span></p>
        </div>
        <form onSubmit={handleSubmit}>

            <div className='signup_form bg-[#121212]/30 gap-5 flex flex-col h-fit min-w-[450px] w-[40vw] p-5 rounded-lg m-10'>

                    <div className="fullname flex justify-between items-center w-full gap-5">
                        <div className='field'>
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange}/>
                        </div>
                        <div className='field'>
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="phone flex justify-between items-center w-full gap-5">
                        <div className='field w-[10%]'>
                            <label htmlFor="phone_code">Phone code</label>
                            <select className='select' id="phone_code" name="phone_code" value={formData.phone_code} onChange={handleChange}>
                                <option>Select</option>
                                <option value="NG">+234 (NG)</option>
                                <option value="GH">+235 (GH)</option>
                                <option value="US">+1 (US)</option>
                                {/* Add more options as needed */}
                            </select>                        
                        </div>
                        <div className='field phone_number'>
                            <label htmlFor="phone">Phone number</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className='field email'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div className='field password'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                    </div>
                    <div className='field transaction_pin'>
                            <label htmlFor="transaction_pin">Transaction Pin</label>
                            <input type="password" id="transaction_pin" name="transaction_pin" value={formData.transaction_pin} onChange={handleChange}/>
                    </div>

                    <h1 className='text-sm text-left uppercase w-fit rounded-md text-white/50'>Address</h1>

                    <div className="phone flex justify-between items-center w-full gap-5">
                    <div className='field number'>
                            <label htmlFor="number">Number</label>
                            <input type="number" id="number" name="number" value={formData.address.number} onChange={handleChange}/>
                    </div>
                    <div className='field street'>
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="street" value={formData.address.street} onChange={handleChange}/>
                    </div>
                    </div>
                    
                    <div className='field city'>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.address.city} onChange={handleChange}/>
                    </div>
                    <div className='field state'>
                            <label htmlFor="state">State</label>
                            <input type="text" id="state" name="state" value={formData.address.state} onChange={handleChange}/>
                    </div>
                    <div className='field country'>
                            <label htmlFor="country">Country</label>
                            <select className='select' id="country" name="country" value={formData.address.country} onChange={handleChange}>
                                    <option>Select</option>
                                    <option value="NG">Nigeria (NG)</option>
                                    <option value="GH">Ghana (GH)</option>
                                    <option value="SN">Senegal (US)</option>
                                    <option value="CIV">Ivory Coast (US)</option>
                            </select>                   
                    </div>
                    
                    <button type="submit" className='submit_signup bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>Create account</button>
            </div>

        </form>
            
          {(error || response) && (
            <div class="response sticky bottom-[25px] bg-[#121212]/30 right-12 rounded-lg backdrop-blur-2xl">
            {error && <div class='error_display bg-red-700 p-3 rounded-lg'>
              <span className='error_display_item'> {error.message } </span>
                
              </div>}
            {response && <div class='response_display bg-white/50 text-black p-3 rounded-lg'>
              <span className='response_display_item'> {error.message } </span>
                
              </div>}
            </div>
          )} 



    </div>
    </>
  );
};

export default SignUp;
