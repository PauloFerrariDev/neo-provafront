import React from "react";
import { CardProps } from "./types";
import noImageAvailable from "src/assets/no-image-available.png";

const Card: React.FC<CardProps> = ({ title, text, imageURL, badges }) => {
  return (
    <div className="card">
      <div className="card-image">
        {imageURL ? (
          <img src={imageURL} alt={text} className="image" />
        ) : (
          <img src={noImageAvailable} alt={text} className="broken-image" />
        )}
      </div>

      <div className="card-content">
        <div className="card-body">
          <p className="card-title">{title}</p>
          <p className="card-text">{text}</p>
        </div>

        <div className="card-footer">{badges}</div>
      </div>
    </div>
  );
};

export default Card;
