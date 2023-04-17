import CottageIcon from "@mui/icons-material/Cottage";
import { Grid, Typography } from "@mui/material";
import "./DiscoverHeader.css";
const DiscoverHeader = (props) => {
  return (
    <div className="discoverheader"> 

        <CottageIcon className="homie-icon" fontSize="90px" />
      
       
        <Typography variant="h4" className="header-text" sx= {
          {
            fontSize: 45,
            fontWeight: "800",
            margin: 0,
            padding: 0,
          }
        }>
          homie
        </Typography>
 
  
    </div>
  );
};
export default DiscoverHeader;
