import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import DiscoverHeader from "../../components/DiscoverHeader";
import "./Login.css";
import { Link, useLocation } from "react-router-dom";

function Login(props) {
  const { register, handleSubmit, watch, getValues } = useForm();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const onSubmit = (e) => {
    if (e.confirm != e.password) {
      setPasswordMatch(true);
      return;
    }
    console.log(e);
  };

  return (
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
            Log In
          </Button>
          <div className="create-account">
            <Link className="createAccountText" to="/createAccount">
              <Typography variant="h7" className="createAccountText2">
                Create Account
              </Typography>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
