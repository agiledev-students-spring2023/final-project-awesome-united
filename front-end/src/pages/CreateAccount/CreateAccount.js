import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import "./CreateAccount.css";
import DiscoverHeader from "../../components/DiscoverHeader";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateAccount(props) {
  const { register, handleSubmit, watch, getValues } = useForm();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const onSubmit = (data) => {
    if (data.confirm != data.password) {
      setPasswordMatch(true);
      return;
    }
    axios
      .post("http://localhost:3001/create-account", {
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        accountType: "Buyer",
      })
      .then((response) => {
        setAccountCreated(true);
      })
      .catch((err) => {
        const data = err.response.data;

        if (data === "Username already exists") {
          setUserExists(true);
        }
        if (data === "Email already exists") {
          setEmailExists(true);
        }
      });
  };

  console.log(props);
  return (
    <div>
      <DiscoverHeader />
      <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
        <div class="formContainer">
          <Typography variant="h6" className="headerText">
            Create your Homie Account
          </Typography>
          <Grid container spacing={2} className="formBoxGrid">
            <Grid item xs={6}>
              <TextField
                fullWidth
                {...register("firstName", { required: true })}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                required={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                {...register("lastName", { required: true })}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                required={true}
              />
            </Grid>
          </Grid>
          <Grid container className="formBoxGrid">
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("userName", { required: true })}
                id="outlined-basic"
                label="Username"
                error={userExists}
                helperText={!userExists ? "" : "Username already exists."}
                variant="outlined"
                required={true}
              />
            </Grid>
          </Grid>
          <Grid container className="formBoxGrid">
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("email", { required: true })}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                error={emailExists}
                helperText={!emailExists ? "" : "Email already exists."}
                required={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className="formBoxGrid">
            <Grid item xs={6}>
              <TextField
                fullWidth
                {...register("password", { required: true })}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                required={true}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                {...register("confirm", {
                  required: true,
                })}
                id="outlined-basic"
                label="Confirm"
                variant="outlined"
                type="password"
                required={true}
                error={passwordMatch}
                helperText={!passwordMatch ? "" : "Passwords do not match."}
              />
            </Grid>
          </Grid>
          {!accountCreated ? (
            <Button
              fullWidth
              type="submit"
              variant="contained"
              className="createAccountButton"
            >
              Create Account
            </Button>
          ) : (
            <Button
              fullWidth
              className="accountCreatedButton"
              variant="contained"
              color="success"
            >
              Account Created
            </Button>
          )}
          <div className="login-text">
            <Link className="loginLink" to="/login">
              <Typography variant="h7" className="loginType">
                Sign In
              </Typography>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
