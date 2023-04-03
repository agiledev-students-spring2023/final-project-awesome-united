import React from "react";
import PropTypes from "prop-types";
import "./DiscoverListing.css";
import Stories from "react-insta-stories";
import ListingInfo from "./ListingInfo";
import { Typography } from "@mui/material";

const DiscoverListing = (props) => {
  const stories = props.images;

  console.log(stories);
  return (
    <div className="discoverListingFrame">
      <div className="discoverImageCarousel">
        <Stories
          stories={stories}
          width={319}
          height={600}
          defaultInterval={32500}
          loop={true}
        />
      </div>
      <div className="discoverListingInfo">
        <h1 className="discoverListingInfoText">{props.address}</h1>
        <h1 className="discoverListingInfoText">{props.price}</h1>
      </div>
    </div>
  );
};

export default DiscoverListing;
