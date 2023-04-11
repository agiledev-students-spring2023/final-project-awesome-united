import { IconButton } from "@mui/material";
import React, { useState, forwardRef } from "react";
import "./DiscoverPageCard.css";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import PhotoCarousel from "./PhotoCarousel";
import { Grid } from "@mui/material";
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

      <div className="infoButtonContainer">
        <IconButton>
          <Link to={"/listing/" + listing.id} state={listing2}>
            <InfoIcon className="infoButton" fontSize="80px" />
          </Link>
        </IconButton>
      </div>
    </div>
  );
});

export default DiscoverPageCard;
