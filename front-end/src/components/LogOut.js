import * as React from 'react';
import "./LogOut.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Grid, Button, Typography } from "@mui/material";

const LogOut = () => {
  const [isOpen, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/logout")
    setOpen(!isOpen);
    
  };

  return (
    <div>
      <Button variant="contained" className="logout" color='primary' onClick={handleClick}>Sign out</Button>

      {isOpen && <div>Content here</div>}
    </div>
  );
};
 
 
export default LogOut;