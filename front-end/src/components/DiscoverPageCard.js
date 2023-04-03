import { IconButton } from "@mui/material";
import React, { useState, forwardRef } from "react";
import "./DiscoverPageCard.css";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import PhotoCarousel from "./PhotoCarousel";
const DiscoverPageCard = forwardRef(function DiscoverPageCard(listing, ref) {
  let listing2 = listing.listing;
  const images = listing2.images;

  return (
    <div
      className="cardOuterFrame"
      style={{
        zIndex: listing.index,
        position: "absolute",
      }}
      ref={ref}
      listing={listing2}
    >
      <PhotoCarousel images={listing2.images} />

      <div className="photoBackgroundTextGradiant">
        <div className="photoText1">{listing2.address}</div>
        <div className="photoText3">
          {listing2.propertyType} for {listing2.leaseType}
        </div>
        <div className="photoText2">${listing2.price}</div>
      </div>
      <Link to={"/listing/" + listing.id} state={listing2}>
        <IconButton>
          <InfoIcon className="infoButton" fontSize="80px" />
        </IconButton>
      </Link>
    </div>
  );
});

export default DiscoverPageCard;
