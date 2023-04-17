import React from "react";
import { useState } from "react";
import "./PhotoCarousel.css";
function PhotoCarousel(props) {
  const images = props.images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = (event) => {
    const newIndex = currentImageIndex - 1;
    setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
 
    event.preventDefault();
  };

  const handleNextClick = (event) => {
    const newIndex = currentImageIndex + 1;
    setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);

    event.preventDefault();
  };
  if (props.mode === "full") {
    return (
      <div className="carouselFullFrame">
        <img
          src={images[currentImageIndex]}
          className="carouselImageFull"
          onClick={handleNextClick}
          onTouchEnd={handleNextClick}
        />
              <div
        className="progress-containerFull"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className={index == currentImageIndex ? "progressFilled" : "progress"}
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
      </div>
    );
  }
  return (
    <div className="carouselFrame">
      <img
        src={images[currentImageIndex]}
        className="carouselImage"
        onClick={handleNextClick}
        onTouchEnd={handleNextClick}
      />
      <div
        className="progress-container"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className={index == currentImageIndex ? "progressFilled" : "progress"}
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
    </div>
  );
}

export default PhotoCarousel;
