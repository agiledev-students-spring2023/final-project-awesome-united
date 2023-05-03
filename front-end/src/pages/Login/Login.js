import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import DiscoverHeader from "../../components/DiscoverHeader";
import "./Login.css";
import { Link, redirect, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import NewAccountSelection from "../NewAccountSelection/NewAccountSelection";
import authenticate from "../../auth/Authenticate";

import environment from "../../settings/Settings";

function Login(props) {
  const { register, handleSubmit, watch, getValues } = useForm();
  const jwtToken = localStorage.getItem("token");

  const [invalidAccount, setInvalidAccount] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState([]);
  const [dir, setDir] = useState("/discover");

  const onSubmit = (data) => {
    axios
      .post(`${environment.backendBaseUrl}/login`, {
        userName: data.userName,
        password: data.password,
      })
      .then((response) => {
        console.log("In then");
        localStorage.setItem("token", response.data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        const data = err.response.data;

        if (data === "User does not exist") {
          setInvalidAccount(true);
        }
        if (data === "Incorrect password") {
          setInvalidPassword(true);
        }
      });
  };
  useEffect(() => {
    authenticate(setLoggedIn, setAccountInfo, jwtToken);
    document.title = 'Login';
  }, []);
  useEffect(() =>{
    console.log(accountInfo.accountType);
    if (accountInfo.accountType == "Seller"){
      console.log("Seller authorized");
      setDir("/createListing");
    }
    else{
      console.log("Buyer authorized");
    }
  })
  return (
    <>
      {!loggedIn ? (
        <div>
          <header className="Header">
          </header>

          <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="formContainer">
              <Typography variant="h4" className="headerText">
                Welcome Home.
              </Typography>
              <Grid container className="formBoxGrid">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    {...register("userName", { required: true })}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    error={invalidAccount}
                    helperText={!invalidAccount ? "" : "User does not exist."}
                    required={true}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} className="formBoxGrid">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    {...register("password", { required: true })}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={invalidPassword}
                    helperText={!invalidPassword ? "" : "Invalid Password."}
                    required={true}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                className="createAccountButton"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
              <div className="create-account">
                <NewAccountSelection/>
                {/* <Link className="createAccountText" to="/newAccountSelection">
                  <Typography variant="h7" className="createAccountText2">
                    Register an Account
                  </Typography>
                </Link> */}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to={dir} replace={true} />
      )}
    </>
  );
}

export default Login;
