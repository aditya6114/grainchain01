import React from "react";
import "./Card.css";

const Card = ({ name, des, img, url }) => {
  const handleClick = () => {
    window.open(url, '_blank'); // Opens URL in new tab
  };

  return (
    <div className="partner-card">
      <img src={img} alt="Ngo pic" />
      <div className="card-content">
        <h2 className="card-heading">{name}</h2>
        <p className="card-description">{des}</p>
        <button className="btn-card" onClick={handleClick}>
          Learn More
        </button>
      </div>
    </div>
  );
};
export default Card;
