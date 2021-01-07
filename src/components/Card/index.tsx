import React from "react";
import { useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { handlePokemonNumber } from "src/utils";

import {
  pokemonWasReleasedFromList,
  setPokemonSelected,
} from "src/store/modules/pokemon/actions";
import { deletePokemonFromPokedex } from "src/store/modules/pokedex/actions";

import { CardProps } from "./types";

import noImageAvailable from "src/assets/no-image-available.png";

const Card: React.FC<CardProps> = ({
  badges,
  className,
  deletable,
  id,
  imageURL,
  name,
}) => {
  const dispatch = useDispatch();

  const handleDeletePokemonFromPokedex = (id: number) => {
    dispatch(pokemonWasReleasedFromList(id));
    dispatch(deletePokemonFromPokedex(id));
  };

  const handleOnClickPokemonImage = (id: number) => {
    dispatch(setPokemonSelected(id));
  };

  return (
    <div className={`card ${className || ""}`}>
      <div
        className={`card-image-container ${className || ""}`}
        onClick={() => handleOnClickPokemonImage(id)}
      >
        {imageURL ? (
          <img
            src={imageURL}
            alt={name}
            className={`image ${className || ""}`}
          />
        ) : (
          <img
            src={noImageAvailable}
            alt={name}
            className={`broken-image ${className || ""}`}
          />
        )}
      </div>

      <div className="card-content">
        <div className="card-body">
          <p className="card-title">{handlePokemonNumber(id)}</p>
          <p className="card-text">{name}</p>
        </div>

        <div className="card-footer">{badges}</div>

        {deletable && (
          <div
            className="delete-button"
            onClick={() => handleDeletePokemonFromPokedex(id)}
          >
            <MdDeleteForever className="delete-button-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
