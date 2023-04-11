import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button, Typography } from "@mui/material";
import "./CreateAccount.css";
import DiscoverHeader from "../../components/DiscoverHeader";

function CreateAccount(props) {
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
          <Button
            fullWidth
            className="createAccountButton"
            type="submit"
            variant="contained"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
