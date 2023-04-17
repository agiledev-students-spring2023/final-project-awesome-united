import React from "react";
import PropTypes from "prop-types";
import "./DiscoverListingFullView.css";
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
          <div className="headerListingText">{listing.location.streetAddress}</div>
        </Grid>
      </div>
      <PhotoCarousel images={listing.images} mode={"full"} />
      <div className="discoverListingFrame">
        <div className="discoverListingInfo">
          <ListingInfo category="Price" data={listing.listingDetails.price} />
          <ListingInfo category="Address" data={listing.location.streetAddress} />
          <ListingInfo category="Bedrooms" data={listing.basicDetails.bedrooms} />
          <ListingInfo category="Bathrooms" data={listing.basicDetails.bathrooms} />
          <ListingInfo category="Amenities" data={listing.amenities} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverListingFullView;
