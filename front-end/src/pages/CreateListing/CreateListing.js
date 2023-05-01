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
import ListingInfo from "./ListingInfo";
import "./CreateListing.css"

const jwtToken = localStorage.getItem("token");

const CreateListing = props => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
    const [accountInfo, setAccountInfo] = useState([])
    const [userCountry, setUserCountry] = useState('');
    const [userState, setUserState] = useState('');
    const [userCity, setUserCity] = useState('');
    const[userAddress, setUserAddress] = useState('');
    const Redirect = useNavigate();
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
      <TextField fullWidth label="Address" id="Address" />
    </Box>
    <Box className="cityField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField fullWidth label="City" id="City" />
    </Box>
    <Box className="stateField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField fullWidth label="State" id="State" />
    </Box>
    <Box className="countryField"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    ><br></br>
      <TextField fullWidth label="Country" id="Country" />
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
        /><br></br>
        <br></br>
        <TextField
          id="outlined-number"
          label="Number of Bedrooms"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /><br></br>
        <br></br>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="Description" id="fullWidth"></TextField>
    </Box>
    <br></br>
    <br></br>
    <Button className="saveButton" variant="contained" size="medium" maxWidth= '100%' endIcon={<SaveIcon />}>
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