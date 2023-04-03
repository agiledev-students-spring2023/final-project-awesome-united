import React from "react";
import PropTypes from "prop-types";
import "./DiscoverListingFullView.css";
import Stories from "react-insta-stories";
import ListingInfo from "./ListingInfo";

const DiscoverListingFullView = (listing) => {
  listing = listing.listing;

  return (
    <div className="discoverListingFrame">
      <div className="discoverImageCarousel"></div>
      <div className="discoverListingInfo">
        <ListingInfo category="Price" data={listing.price} />
        <ListingInfo category="Address" data={listing.address} />
        <ListingInfo category="Rooms" data={listing.rooms} />
        <ListingInfo category="Description" data={listing.desc} />
        <ListingInfo category="Amenities" data={listing.amenities} />
      </div>
    </div>
  );
};

export default DiscoverListingFullView;
