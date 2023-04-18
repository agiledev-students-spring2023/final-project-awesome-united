import DiscoverHeader from "../../components/DiscoverHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Discover.css";
import DiscoverButtonTray from "../../components/DiscoverButtonTray";
import React from "react";
import { useRef, useMemo } from "react";
import DiscoverPageCard from "../../components/DiscoverPageCard";
import { Navigate } from "react-router-dom";
import authenticate from "../../auth/Authenticate";

import { useSwipeable } from "react-swipeable";
const Discover = (props) => {
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([]);

  const [listings, setListings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(listings.length - 1);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(listings.length)
        .fill(0)
        .map((i) => React.createRef()),
    [loaded]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < listings.length - 1;

  const canSwipe = currentIndex >= 0;

  async function fetchData() {
    const response = await axios("http://localhost:3001/get-listings")
      .then((response) => {
        setListings(response.data);
        setLoaded(true);

        updateCurrentIndex(response.data.length - 1);
      })
      .catch((err) => {
        const backupData = [
          {
            id: 1,
            leaseType: "rent",
            propertyType: "House",
            price: 30,
            rooms: 2,
            address: "jjjjjjjjgggggggyyyyyyyyyyyyy",
            desc: "Amazing Place",
            amenities: "Dishwasher",
            images: [
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-Puppy.jpg",
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-History-02.jpg",
              "https://media-be.chewy.com/wp-content/uploads/2021/04/16140525/Beagle_Featured-Image-1024x615.jpg",
            ],
          },
          {
            id: 2,
            price: 33,
            rooms: 3,
            address: "2 Hacker Way",
            propertyType: "House",
            leaseType: "buy",
            desc: "Amazing Place 2",
            amenities: "Laundry",
            images: [
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-Puppy.jpg",
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-History-02.jpg",
              "https://media-be.chewy.com/wp-content/uploads/2021/04/16140525/Beagle_Featured-Image-1024x615.jpg",
            ],
          },
          {
            id: 3,
            price: 33,
            rooms: 3,
            address: "3 Hacker Way",
            propertyType: "Apartment",
            leaseType: "rent",
            desc: "Amazing Place 3",
            amenities: "Laundry",
            images: [
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-Puppy.jpg",
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-History-02.jpg",
              "https://media-be.chewy.com/wp-content/uploads/2021/04/16140525/Beagle_Featured-Image-1024x615.jpg",
            ],
          },
          {
            id: 4,
            price: 33,
            rooms: 3,
            address: "4 Hacker Way",
            desc: "Amazing Place 4",
            propertyType: "House",
            leaseType: "rent",
            amenities: "Laundry",
            images: [
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-Puppy.jpg",
              "https://www.akc.org/wp-content/uploads/2017/11/Beagle-History-02.jpg",
              "https://media-be.chewy.com/wp-content/uploads/2021/04/16140525/Beagle_Featured-Image-1024x615.jpg",
            ],
          },
        ];
        setLoaded(true);
        setListings(backupData);

        updateCurrentIndex(backupData.length - 1);
      });
  }

  useEffect(() => {
    fetchData();
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
  }, []);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      let dir = eventData.dir;
      if (dir === "Right") {
        swipeRight();
      }
      if (dir === "Left") {
        swipeLeft();
      }
      if (dir === "Up") {
        swipeUp();
      }
    },
    trackMouse: true,
  });
  const swipeRight = () => {
    // childRefs[currentIndex].current.style.display = "none";
    console.log(childRefs[currentIndex].current.setAttribute('swiped', 1))
    console.log("swiped right on " + listings[currentIndex].id);
    updateCurrentIndex(currentIndex - 1);
  };
  const swipeLeft = () => {
   

    console.log("swiped left on " + listings[currentIndex].id);
    console.log(childRefs[currentIndex].current.setAttribute('swiped', 2))
    updateCurrentIndex(currentIndex - 1);
  };
  const swipeUp = () => {
    console.log(childRefs[currentIndex].current.setAttribute('swiped', 3));
    console.log("swiped up on " + listings[currentIndex].id);
    updateCurrentIndex(currentIndex - 1);
  };
  const r = React.useRef(null);

  return (
    <>
      {isLoggedIn ? (
        <div className="discover">
          <DiscoverHeader name={accountInfo.firstName} />
          <div className="discoverTinderCard" {...handlers}>
            {loaded ? (
              listings.map((listing, index) => {
                return (
                  <DiscoverPageCard
                    ref={childRefs[index]}
                    index={index}
                    key={listing.id}
                    id={listing.id}
                    listing={listing}
                  />
                );
              })
            ) : (
              <p1>Loading</p1>
            )}
          </div>

          <div className="discoverButtonTray">
            <DiscoverButtonTray
              yes={() => {
                swipeRight();
              }}
              save={() => {
                swipeUp();
              }}
              no={() => {
                swipeLeft();
              }}
            />
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default Discover;
