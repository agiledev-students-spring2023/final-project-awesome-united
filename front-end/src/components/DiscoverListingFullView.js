import React from "react";
import PropTypes from "prop-types";
import "./DiscoverListingFullView.css";
import Stories from "react-insta-stories";
import ListingInfo from "./ListingInfo";
import PhotoCarousel from "./PhotoCarousel";
import DiscoverHeader from "./DiscoverHeader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
const DiscoverListingFullView = (listing) => {
  listing = listing.listing;

  return (
    <div className="discoverListingFullView">
      <div className="discoverListingFullViewHeader">
        <Grid
          className="discoverListingFullViewHeader"
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Link to={"/discover/"}>
            <IconButton>
              <ArrowBackIcon className="backButton" fontSize="80px" />
            </IconButton>
          </Link>
          <div className="headerListingText">{listing.address}</div>
        </Grid>
      </div>
      <PhotoCarousel images={listing.images} mode={"full"} />
      <div className="discoverListingFrame">
        <div className="discoverListingInfo">
          <ListingInfo category="Price" data={listing.price} />
          <ListingInfo category="Address" data={listing.address} />
          <ListingInfo category="Rooms" data={listing.rooms} />
          <ListingInfo category="Description" data={listing.desc} />
          <ListingInfo category="Amenities" data={listing.amenities} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverListingFullView;
