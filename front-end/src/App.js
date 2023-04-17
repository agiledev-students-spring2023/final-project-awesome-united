import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Discover from "./pages/Discover/Discover";
import Matches from "./pages/Matches/Matches";
import CreateListing from "./pages/CreateListing/CreateListing";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import SearchSettings from "./pages/SearchSettings/SearchSettings";
import Footer from "./components/Footer";
import GeneralSettings from "./pages/GeneralSettings/GeneralSettings";
import Chat from "./pages/Chat/Chat";
import "./App.css";

import SingleListing from "./pages/SingleListing/SingleListing";
import NewAccountSelection from "./pages/NewAccountSelection/NewAccountSelection";

// set up routes so different URL routes load up different main components
const App = (props) => {
  const location = useLocation();
  return (
    <div className="container">
      <div className="container-body">
        <Routes>
          {/* a route to the home screen */}
          <Route path="/" element={<Login />} />

          <Route path="/createAccount" element={<CreateAccount />} />
          <Route
            path="/newAccountSelection"
            element={<NewAccountSelection />}
          />
          <Route path="/searchSettings" element={<SearchSettings />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/generalSettings" element={<GeneralSettings />} />
          <Route path="/createListing" element={<CreateListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/listing/:listingId" element={<SingleListing />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
      {location.pathname !== "/createAccount" &&
        location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/newAccountSelection" && <Footer />}
    </div>
  );
};

// make this available to other modules as an import
export default App;
