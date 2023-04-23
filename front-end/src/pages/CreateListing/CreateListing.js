import React, { useState } from "react";
import "./CreateListing.css"
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import DiscoverHeader from "../../components/DiscoverHeader";
import { Link } from "react-router-dom";
import axios from "axios";
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
import LoadingButton from '@mui/lab/LoadingButton';

const CreateListing = props => {
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
        <ListSubheader component="div">Photos</ListSubheader>
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
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
  ];
  
  export default CreateListing