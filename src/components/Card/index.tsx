import React from "react";
import { CardProps } from "./models";
import { FcRemoveImage } from "react-icons/fc";

const Card: React.FC<CardProps> = ({ title, text, imageURL, badges }) => {
  return (
    <div className="card">
      <div className="card-image">
        {imageURL ? (
          <img src={imageURL} alt={text} />
        ) : (
          <FcRemoveImage className="broken-image" />
        )}
      </div>

      <div className="card-body">
        <p>{title}</p>
        <p className="card-text">{text}</p>
      </div>

      <div className="card-footer">
        {badges}
        {/* {pokemon.types.map((typeData: any) => (
          <p>{typeData.type.name}</p>
        ))} */}
      </div>
    </div>
  );
};

export default Card;
