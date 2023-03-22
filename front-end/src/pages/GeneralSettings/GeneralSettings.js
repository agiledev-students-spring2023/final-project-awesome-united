import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

// set up routes so different URL routes load up different main components
const GeneralSettings = (props) => {
  return (
    <div className="container">
      <h1>
        General Settings Page
      </h1>
      <Link to="/brightnessSettings">
      Change Brightness
      </Link>
      <Link to="/sizeSettings">
      Change Size of Text
      </Link>
      <Link to="/accountInfo">
      See Account Info
      </Link>
      <p>Change your Password - linked page
      Change Brightness
      Change size of Text - linked page
      Enable Dark StrictMode - button
      Account Info - linked
      Log Out - button
      </p>
    </div>
  );
};

// make this available to other modules as an import
export default GeneralSettings;
