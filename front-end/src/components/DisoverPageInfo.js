import React from "react";
import "DiscoverPageInfo.css";
function DisoverPageInfo(listing) {
  return (
    <div>
      <div className="photoBackgroundTextGradiant">
        <div className="photoText1">{listing.address}</div>
        <div className="photoText3">
          {listing2.propertyType} for {listing.leaseType}
        </div>
        <div className="photoText2">${listing.price}</div>
      </div>
      <Link to={"/listing/" + listing.id} state={listing}>
        <IconButton>
          <InfoIcon className="photoCaraInfoButton" fontSize="80px"></InfoIcon>
        </IconButton>
      </Link>
    </div>
  );
}

export default DisoverPageInfo;
