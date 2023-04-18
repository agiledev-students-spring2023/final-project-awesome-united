import React, { useState } from "react";
import "./CreateListing.css"
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import DiscoverHeader from "../../components/DiscoverHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateListing = props => {
    return (
      <div className="listingPage">
      <Typography variant="h6" className="headerText">
      Property Listing Address <br></br>

      Images <br></br>

      Listing Information
      </Typography>
      </div>
    )
  }
  
  export default CreateListing