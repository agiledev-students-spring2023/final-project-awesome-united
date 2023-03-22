import React from "react";
import "./Footer.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid } from "@mui/material";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";

const Footer = (props) => {
  let location = useLocation();
  return (
    <div className="footer">
      <Grid
        container
        justifyContent="space-around"
        direction="row"
        spacing={0.5}
        xs={11.3}
      >
        <Link to="/discover">
          <IconButton>
            {location.pathname == "/discover" ? (
              <HomeIcon className="footerButton" fontSize="60px" />
            ) : (
              <HomeOutlinedIcon className="footerButton" fontSize="60px" />
            )}
            <div
              className={
                location.pathname == "/discover" ? "selectedButtonLine" : ""
              }
            ></div>
          </IconButton>
        </Link>
        <Link to="/matches">
          <IconButton>
            {location.pathname == "/matches" ? (
              <AddHomeWorkIcon className="footerButton" fontSize="60px" />
            ) : (
              <AddHomeWorkOutlinedIcon
                className="footerButton"
                fontSize="60px"
              />
            )}
            <div
              className={
                location.pathname == "/matches" ? "selectedButtonLine" : ""
              }
            ></div>
          </IconButton>
        </Link>
        <Link to="/generalSettings">
          <IconButton>
            {location.pathname == "/generalSettings" ? (
              <SettingsIcon className="footerButton" fontSize="60px" />
            ) : (
              <SettingsOutlinedIcon className="footerButton" fontSize="60px" />
            )}
            <div
              className={
                location.pathname == "/generalSettings"
                  ? "selectedButtonLine"
                  : ""
              }
            ></div>
          </IconButton>
        </Link>
      </Grid>
    </div>
  );
};
export default Footer;
