import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import SizeSettings from "../../components/SizeSettings";
//import BrightnessSettings from "../../components/BrightnessSettings";
import AccountInfo from "../../components/AccountInfo";

// set up routes so different URL routes load up different main components
const GeneralSettings = (props) => {
  return (
    <div className="container">
      <h1>
        General Settings Page
      </h1>
      <AccountInfo />
      <p>Change your Password - linked page
      Account Info - linked
      Log Out - button
      </p>
    </div>
  );
};

// make this available to other modules as an import
export default GeneralSettings;
