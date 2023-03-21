import DiscoverHeader from "../../components/DiscoverHeader";
import DiscoverListing from "../../components/DiscoverListing";
import axios from "axios";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./Discover.css";
import DiscoverButtonTray from "../../components/DiscoverButtonTray";
const Discover = (props) => {
  const [listings, setListings] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        "https://my.api.mockaroo.com/listing.json?key=a8b2f1e0"
      )
        .then((response) => {
          setListings(response.data);
          setLoaded(true);
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
              images:[{}]
            },
            {
              id: 2,
              price: 33,
              rooms: 3,
              address: "2 Hacker Way",
              desc: "Amazing Place 2",
              amenities: "Laundry",
              images: []
            },
          ];
          setListings(backupData);
          setLoaded(true);
        });
    }
    fetchData();
  }, []);

  console.log(listings);
  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };
  const [lastDirection, setLastDirection] = useState();

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <div>
      <DiscoverHeader />

      {loaded ? (
        listings.map((listing) => {
          return (
            <TinderCard
              className="swipe"
              key={listing.id}
              onSwipe={(dir) => swiped(dir, listing.address)}
              onCardLeftScreen={() => outOfFrame(listing.address)}
              preventSwipe={["up", "down"]}
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

<div className="discoverButtonTray">
  <DiscoverButtonTray />
</div>
    </div>
    
  );
};

export default Discover;
