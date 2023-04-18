import "./NewAccountSelection.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

function NewAccountSelection() {
  return (
    <div className="NewAccountSelection">
      <div className="Options">
        <Typography variant="h5" className="questionText">
          Why are you using Homie?
        </Typography>
        <Link
          className="NewAccountSelectionLink"
          to="/createAccount"
          state={{ accountType: "seller" }}
        >
          <div>I'm Selling</div>
        </Link>
        <Link
          className="NewAccountSelectionLink"
          to="/createAccount"
          state={{ accountType: "buyer" }}
        >
          <div>I'm Buying</div>
        </Link>
      </div>
    </div>
  );
}

export default NewAccountSelection;
