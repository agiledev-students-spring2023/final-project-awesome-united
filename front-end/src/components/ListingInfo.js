import React from "react";
import "./ListingInfo.css";

const ListingInfo = (props) => {
  return (
    <div className="listingInfo">
      <h1 className="listingInfoCategoryText">{props.category}</h1>

      <p className="listingInfoCategoryData">{props.data}</p>
    </div>
  );
};

export default ListingInfo;
