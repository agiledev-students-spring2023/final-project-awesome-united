import React from "react";
import { Link } from "react-router-dom";
// import logo from './logo.svg';
import "./Home.css";

const Home = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/createAccount"> Create Account Page</Link>{" "}
        </li>

        <li>
          <Link to="/createListing">Create Listing Page</Link>
        </li>
        <li>
          <Link to="/discover">Discover Page</Link>
        </li>
        <li>
          <Link to="/generalSettings">General Settings Page</Link>
        </li>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/logout">Logout Page</Link>
        </li>
        <li>
          <Link to="/matches">Matches Page</Link>
        </li>
        <li>
          <Link to="/searchSettings">Search Settings Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
