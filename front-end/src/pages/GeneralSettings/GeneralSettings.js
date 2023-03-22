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
      <p>Change your Password - linked page
      Change BrightnessChange size of Text - linked page
      Enable Dark StrictMode - button
      Account Info - linked
      Log Out - button
      </p>
      <Router>
        {/* pass the setter function that can be called if the user successfully logs in from the login screen */}

        <Routes>
          {/* a route to the home screen */}
          <Route path="/" element={<Home />} />

          <Route path="/BrightnessSettings" element={<BrightnessSettings />} />
          <Route path="/SizeSettings" element={<SizeSettings />} />
          <Route path="/AccountInfo" element={<AccountInfo />} />
        </Routes>
        
      </Router>
    </div>
  );
};

// make this available to other modules as an import
export default GeneralSettings;
