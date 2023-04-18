import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import DiscoverHeader from "../../components/DiscoverHeader";
import "./Login.css";
import { Link, redirect, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const { register, handleSubmit, watch, getValues } = useForm();

  const [invalidAccount, setInvalidAccount] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/login", {
        userName: data.userName,
        password: data.password,
      })
      .then((response) => {
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
    document.title = 'Login';
  }, []);

  return (
    <>
      {!loggedIn ? (
        <div>
          <header className="Header">
            <DiscoverHeader />
          </header>

          <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
            <div class="formContainer">
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
                <Link className="createAccountText" to="/newAccountSelection">
                  <Typography variant="h7" className="createAccountText2">
                    Register an Account
                  </Typography>
                </Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Navigate to="/discover" replace={true} />
      )}
    </>
  );
}

export default Login;
