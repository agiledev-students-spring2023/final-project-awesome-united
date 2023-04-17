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
          style={{
            position: "absolute",
            top: "300px",
            left: "0",
            width: "100%",
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
                backgroundColor:
                  currentImageIndex === index ? "white" : "black",
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
      </div>
    );
  }
  return (
    <div>
      <img
        src={images[currentImageIndex]}
        className="carouselImage"
        onClick={handleNextClick}
        onTouchEnd={handleNextClick}
      />
      <div
        style={{

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
    </div>
  );
}

export default PhotoCarousel;
