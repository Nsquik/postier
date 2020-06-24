import React from "react";
import "./SiteLoader.scss";

const SiteLoader = () => {
  return (
    <>
      <div id="overlay">
        <label className="spinner__text">Loading site...</label>
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default SiteLoader;
