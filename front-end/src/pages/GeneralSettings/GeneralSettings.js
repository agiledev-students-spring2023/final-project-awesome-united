import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import SizeSettings from "../../components/SizeSettings";
//import BrightnessSettings from "../../components/BrightnessSettings";
import AccountInfo from "../../components/AccountInfo";
<<<<<<< HEAD
=======
import ChangePassword from "../../components/ChangePassword";
import LogOut from "../../components/LogOut";
>>>>>>> origin/master

// set up routes so different URL routes load up different main components
const GeneralSettings = (props) => {
  return (
    <div className="container">
      <h1>
        General Settings Page
      </h1>
      <AccountInfo />
<<<<<<< HEAD
      <p>Change your Password - linked page
      Account Info - linked
      Log Out - button
      </p>
=======
      <ChangePassword />
      <LogOut />
>>>>>>> origin/master
    </div>
  );
};

// make this available to other modules as an import
export default GeneralSettings;
