import React from "react";
import { useLocation, useParams } from "react-router-dom";
import DiscoverListingFullView from "../../components/DiscoverListingFullView";

function SingleListing(l) {
  const { listingId } = useParams();
  const location = useLocation();
  console.log(location.state);
  return (
    <div>
      <DiscoverListingFullView listing={location.state} />
    </div>
  );
}

export default SingleListing;
