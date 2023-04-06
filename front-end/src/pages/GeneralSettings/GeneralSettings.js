import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import SizeSettings from "../../components/SizeSettings";
//import BrightnessSettings from "../../components/BrightnessSettings";
import AccountInfo from "../../components/AccountInfo";
import ChangePassword from "../../components/ChangePassword";
import LogOut from "../../components/LogOut";

// set up routes so different URL routes load up different main components
const GeneralSettings = (props) => {
  return (
    <div className="container">
      <h1>
        General Settings Page
      </h1>
      <Link className="filter-link" to="/searchSettings">
          <div>Search Filter Settings</div>
      </Link>
      <p></p>
      <AccountInfo />
      <p></p>
      <ChangePassword />
      <p></p>
      <LogOut />
    </div>
  );
};

// make this available to other modules as an import
export default GeneralSettings;