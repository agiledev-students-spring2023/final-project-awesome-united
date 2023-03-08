import React from "react"
import "./Footer.css"
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid } from "@mui/material";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import IconButton from '@mui/material/IconButton';
import Discover from "../pages/Discover/Discover";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = props => {
   
    
    return (
       
      <div className="footer">
        <Grid container justifyContent="space-around" direction="row" spacing={.5} xs={11.3}>
            <Link to="/discover">
            <IconButton >
                <HomeIcon className="footerButton" fontSize="60px" />
            </IconButton>
             </Link>
        <Link to="/matches">   
        <IconButton >
            <AddHomeWorkIcon className="footerButton" fontSize="60px" />
        </IconButton>
        </Link>
        <Link to="/generalSettings">   
        <IconButton >
            <SettingsIcon className="footerButton" fontSize="60px" />
        </IconButton>
        </Link>
         </Grid>
   
      </div>
  
    )
  }
  
  export default Footer