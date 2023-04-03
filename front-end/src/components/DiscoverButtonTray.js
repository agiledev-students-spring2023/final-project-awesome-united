import React from "react";
import "./DiscoverButtonTray.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid } from "@mui/material";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CancelIcon from "@mui/icons-material/Cancel";

const DiscoverButtonTray = (props) => {
  let location = useLocation();
  return (
    <div className="discoverButtonTray">
      <Grid
        container
        justifyContent="space-around"
        direction="row"
        spacing={0.5}
        xs={11}
      >
        <IconButton>
          <CancelIcon
            className="discoverButtonTrayButton noButton"
            fontSize="80px"
            onClick={props.no}
          ></CancelIcon>
        </IconButton>

        <IconButton>
          <BookmarkIcon
            className="discoverButtonTrayButton saveButton"
            fontSize="80px"
            onClick={props.save}
          ></BookmarkIcon>
        </IconButton>

        <IconButton>
          <FavoriteIcon
            className="discoverButtonTrayButton likeButton"
            onClick={props.yes}
            fontSize="80px"
          ></FavoriteIcon>
        </IconButton>
      </Grid>
    </div>
  );
};
export default DiscoverButtonTray;
