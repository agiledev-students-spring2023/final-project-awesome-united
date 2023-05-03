import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack'; 
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import authenticate from "../../auth/Authenticate";
import SingleListing from "../SingleListing/SingleListing"; 
import "./CreateListing.css"

const CreateListing = props => {
    const userUrl = 'http://localhost:3001/get-listing-data';
    const jwtToken = localStorage.getItem("token");


    //zip unit amenities active/rent type
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
    const [listingCountry, setListingCountry] = useState('');
    const [listingState, setListingState] = useState('');
    const [listingCity, setListingCity] = useState('');
    const[listingAddress, setListingAddress] = useState('');
    const[listingPrice, setListingPrice] = useState('');
    const[listingAmenitiesNum, setListingAmenitiesNum] = useState('');
    const[listingBedroomsNum, setListingBedroomsNum] = useState('');
    const[listingBathroomsNum, setListingBathroomsNum] = useState('');


    const Redirect = useNavigate();

    function saveClicked(e){
      //authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
      const sellerListing = { listingCountry, listingState, listingCity, listingAddress, listingPrice, listingAmenitiesNum, listingBedroomsNum, listingBathroomsNum };
      console.log(sellerListing);
      axios.post(userUrl, sellerListing, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${jwtToken}`
        },
      })
      .then((res) => {
        console.log(res);
      });
      Redirect('/discover');
    }

    return (
      <div className="listingPage">
      <Typography variant="h6" className="headerText">
      Property Listing Address <br></br>
      <br></br>
      <Box className="addressField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField 
          fullWidth 
          label="Address"          
          type='text' 
          id='myText'
          className='AddressInput' 
          placeholder='Address'
          onChange={(e) => setListingAddress(e.target.value)}/>
    </Box>
    <Box className="zipCodeField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField 
          fullWidth 
          label="Zip Code"          
          type='text' 
          id='myText'
          className='ZipCodeInput' 
          placeholder='Zip Code'
          onChange={(e) => setListingAddress(e.target.value)}/>
    </Box>
    <Box className="cityField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField 
        fullWidth 
        label='City'
        type='text' 
        id='myText' 
        name='UserCity' 
        className='CityInput' 
        placeholder='City'
        onChange={(e) => setListingCity(e.target.value)}
      />
    </Box>
    <Box className="stateField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField 
        fullWidth 
        label='State'
        type='text' 
        id='myText' 
        name='UserState' 
        className='StateInput' 
        placeholder='State'
        onChange={(e) => setListingState(e.target.value)}
      />
    </Box>
    <Box className="countryField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField 
        fullWidth 
        label='Country'
        type='text' 
        id='myText' 
        name='UserCountry' 
        className='CountryInput' 
        placeholder='Country'
        onChange={(e) => setListingCountry(e.target.value)}
      />
    </Box>
    <br></br>
      Images <br></br>
      <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Interior</ListSubheader>
      </ImageListItem>
      {listingPhotos.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Stack>
    <br></br>
        Listing Information<br></br>
        <br></br>
        <FormControl sx={{ m: 1, width: '20ch' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            type="number"
            onChange={(e) => setListingPrice(e.target.value)}
          />
        </FormControl><br></br>
        <br></br>
        <TextField
          id="outlined-number"
          label="Number of Amenities"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setListingAmenitiesNum(e.target.value)}
        /><br></br>
        <br></br>
        <TextField
          id="outlined-number"
          label="Number of Bedrooms"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setListingBedroomsNum(e.target.value)}
        /><br></br>
        <br></br>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        id="outlined-number"
        label="Number of Bathrooms"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setListingBathroomsNum(e.target.value)}
      />
    </Box>
    <br></br>
    <br></br>
    <Button className="saveButton" variant="contained" size="medium" maxWidth= '100%' endIcon={<SaveIcon />} onClick={()=>saveClicked()}>
        Save
      </Button>
      </Typography>
      </div>
    )
  }


  const listingPhotos = [
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Living Room',
      rows: 2,
      cols: 2,
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Kitchen',
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Bathroom',
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Bedroom 1',
      cols: 2,
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Bedroom 2',
      cols: 2,
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Basement',
      rows: 2,
      cols: 2,
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Backyard',
    },
    {
      img: 'http://murphysvacationhouse.com/files/resized/7cf78900-1b46-43b5-8fad-ffbea5790982/1024;485;998e6fe33d7526dc448d1f01b99cbe831d72b7b9.jpg',
      title: 'Garage',
    },
  ];
  
  export default CreateListing