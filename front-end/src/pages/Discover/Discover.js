import DiscoverHeader from "../../components/DiscoverHeader";
import DiscoverListing from "../../components/DiscoverListing";
import axios from "axios";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./Discover.css";
import DiscoverButtonTray from "../../components/DiscoverButtonTray";
import React from "react";
import { useRef, useMemo } from "react";
const Discover = (props) => {
  const [listings, setListings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(listings.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(listings.length)
        .fill(0)
        .map((i) => React.createRef()),
    [loaded]
  );
  const updateChildRefs = () => {};

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < listings.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);

    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();

    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    console.log(childRefs);
    console.log(canSwipe);
    console.log(listings.length);
    console.log(currentIndex);
    if (canSwipe && currentIndex < listings.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        "https://my.api.mockaroo.com/listing!.json?key=a8b2f1e0"
      )
        .then((response) => {
          setListings(response.data);
          setLoaded(true);

          updateCurrentIndex(response.data.length - 1);
        })
        .catch((err) => {
          const backupData = [
            {
              id: 1,
              price: 30,
              rooms: 2,
              address: "1 Hacker Way",
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
    fetchData();
  }, []);

  return (
    <div>
      <DiscoverHeader />
      <div className="discoverTinderCard">
        {loaded ? (
          listings.map((listing, index) => {
            return (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={listing.id}
                onSwipe={(dir) => swiped(dir, listing.address, index)}
                onCardLeftScreen={() => outOfFrame(listing.address, index)}
                preventSwipe={["down"]}
              >
                <DiscoverListing
                  key={listing.id}
                  price={listing.price}
                  address={listing.address}
                  rooms={listing.rooms}
                  desc={listing.desc}
                  amenities={listing.amenities}
                  images={listing.images}
                />
              </TinderCard>
            );
          })
        ) : (
          <p1>Loading</p1>
        )}
      </div>

      <div className="discoverButtonTray">
        <DiscoverButtonTray
          yes={() => {
            swipe("right");
          }}
          save={() => {
            swipe("down");
          }}
          no={() => {
            swipe("left");
          }}
        />
      </div>
    </div>
  );
};

export default Discover;
