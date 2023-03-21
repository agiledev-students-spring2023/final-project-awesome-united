import React from "react";
import PropTypes from "prop-types";
import "./DiscoverListing.css";
import Stories from "react-insta-stories";
import ListingInfo from "./ListingInfo";

const DiscoverListing = (props) => {
  const stories =
    props.images;

  console.log(stories)
  return (
    <div className="discoverListingFrame">
      <div className="discoverImageCarousel">
        {/* <Stories
          stories={stories}
          width={319}
          height={304}
          defaultInterval={32500}
          loop={true}
        /> */}
      </div>
      <div className="discoverListingInfo">
        <ListingInfo category="Price" data={props.price} />
        <ListingInfo category="Address" data={props.address} />
        <ListingInfo category="Rooms" data={props.rooms} />
        <ListingInfo category="Description" data={props.desc} />
        <ListingInfo category="Amenities" data={props.amenities} />
      </div>
    </div>
  );
};

export default DiscoverListing;
