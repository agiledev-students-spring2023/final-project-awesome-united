import './CreateAccount.css';
import { redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

/* 
HTTP requests only handle the user location for now
Login credentials are going to be handled with the database
*/

function CreateAccount(){
  const Redirect = useNavigate();
  const [userCountry, setUserCountry] = useState('');
  const [userState, setUserState] = useState('');
  const [userCity, setUserCity] = useState('');
  const[userAddress, setUserAddress] = useState('');

  const userUrl = 'http://localhost:3001/get-user-data';

  function createClicked(e){
    const userLocation = { userCountry, userState, userCity, userAddress };
    console.log(userLocation);
    axios.post(userUrl, userLocation, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res);
    });
    Redirect('/discover');
  }
  return (
    <div className='CreateAccount'>
      <header className='Header'>
        <h1 className='H1'>
          Create Account
        </h1>
      </header>
      <div className='FullName'>
        Full Name: 
        &nbsp;
        <input type='text' id='myText' placeholder='Full Name'></input>
      </div>
      <div className='Username'>
        Username:
        &nbsp;
        <input type='text' id='myText' placeholder='Email Address'></input>
      </div>
      <div className='Password'>
        Password:
        &nbsp;
        <input type='text' id='myText' placeholder='Password'></input>
      </div>
      <div className='EmailAddress'>
        Email Address:
        &nbsp;
        <input type='text' id='myText' placeholder='Email Address'></input>
      </div>
      <div className='ProfilePhoto'>
        Profile Photo:
      </div>
      <div className='UploadPFP'>
        <form method='POST' action='/upload' encType='multipart/form-data'>
          <input type='file' id = 'myFile' name='image' className='UploadPP'></input>
          <button className='UploadButton'> upload </button>
        </form>
      </div>
      <div className='Location'>
        Location:
      </div>
      <div className='Country'>
        Country:
        &nbsp;
        <input 
          type='text' 
          id='myText' 
          name='UserCountry' 
          className='CountryInput' 
          placeholder='Country'
          onChange={(e) => setUserCountry(e.target.value)}
        />
      </div>
      <div className='State'>
        State:
        &nbsp;
        <input 
          type='text' 
          id='myText' 
          className='StateInput' 
          placeholder='State'
          onChange={(e) => setUserState(e.target.value)}
        />
      </div>
      <div className='City'>
        City:
        &nbsp;
        <input 
          type='text' 
          id='myText' 
          className='CityInput' 
          placeholder='City'
          onChange={(e) => setUserCity(e.target.value)}
        />
      </div>
      <div className='Address'>
        Address:
        &nbsp;
        <input 
          type='text' 
          id='myText' 
          className='AddressInput' 
          placeholder='Address'
          onChange={(e) => setUserAddress(e.target.value)}
        />
      </div>
      <button className='CreateButton' onClick={()=>createClicked()}>
        Create
      </button>
    </div>
  );
}

export default CreateAccount; 