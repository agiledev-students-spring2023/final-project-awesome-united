import "./Footer.css"
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid } from "@mui/material";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import IconButton from '@mui/material/IconButton';


const Footer = props => {
 
    return (
      <div className="footer">

     
        <Grid container justifyContent="space-around" direction="row" spacing={.5} xs={11}>
           
                <IconButton >
                    <HomeIcon className="footerButton" fontSize="60px" />
                </IconButton>
             
        <IconButton >
            <AddHomeWorkIcon className="footerButton" fontSize="60px" />
        </IconButton>
        <IconButton >
            <SettingsIcon className="footerButton" fontSize="60px" />
        </IconButton>
         </Grid>
   
      </div>
    )
  }
  
  export default Footer