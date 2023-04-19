import CottageIcon from "@mui/icons-material/Cottage";
import { Grid, Typography } from "@mui/material";
import "./DiscoverHeader.css";
import authenticate from "../auth/Authenticate";
import { useState, useEffect } from "react";
const DiscoverHeader = (props) => {
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
  }, []);
  return (
    <div className="discoverheader"> 

        <CottageIcon className="homie-icon" fontSize="90px" />
      
       
        {accountInfo.accountType == "Buyer" ? <Typography variant="h4" className="header-text" sx= {
          {
            fontSize: 45,
            fontWeight: "800",
            margin: 0,
            padding: 0,
          }
        }>
          homie
        </Typography> : <Typography variant="h4" className="header-text" sx= {
          {
            fontSize: 45,
            fontWeight: "800",
            margin: 0,
            padding: 0,
          }
        }>
          homie.seller
        </Typography>}
 
  
    </div>
  );
};
export default DiscoverHeader;
