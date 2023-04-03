import { IconButton } from "@mui/material";
import React, { useState, forwardRef } from "react";
import "./PhotoCarousel.css";
import InfoIcon from "@mui/icons-material/Info";

const PhotoCarousel = forwardRef(function PhotoCarousel(listing, ref) {
  let listing2 = listing.listing;
  const images = listing2.images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    const newIndex = currentImageIndex + 1;
    setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentImageIndex - 1;
    setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
  };

  return (
    <div
      className="carouselOuterFrame"
      style={{
        zIndex: listing.index,
        position: "absolute",
      }}
      ref={ref}
      listing={listing2}
    >
      <img
        src={listing2.images[currentImageIndex]}
        className="carouselImage"
        onClick={handleNextClick}
        onTouchEnd={handleNextClick}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "95%",
          height: "3%",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.2587009803921569) 0%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="progressBarBackground"
      >
        {images.map((image, index) => (
          <div
            key={image}
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: currentImageIndex === index ? "white" : "black",
              margin: "0 25px",
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "50%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={handlePrevClick}
        onTouchEnd={handlePrevClick}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "50%",
          height: "100%",
          cursor: "pointer",
        }}
        onClick={handleNextClick}
        onTouchEnd={handleNextClick}
      />

      <div className="photoBackgroundTextGradiant">
        <div className="photoText1">{listing2.address}</div>
        <div className="photoText3">
          {listing2.propertyType} for {listing2.leaseType}
        </div>
        <div className="photoText2">${listing2.price}</div>
      </div>
      <IconButton>
        <InfoIcon className="photoCaraInfoButton" fontSize="80px"></InfoIcon>
      </IconButton>
    </div>
  );
});

export default PhotoCarousel;
