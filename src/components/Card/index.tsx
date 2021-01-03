import React from "react";
import { CardProps } from "./models";
import { FcRemoveImage } from "react-icons/fc";

const Card: React.FC<CardProps> = ({ pokemon }) => {
  const handlePokemonNumber = (id: number) => {
    if (id < 10) {
      return `Nº 00${id}`;
    }

    if (id < 100) {
      return `Nº 0${id}`;
    }

    return `Nº ${id}`;
  };

  return (
    <div className="card">
      <div className="card-header">{handlePokemonNumber(pokemon.id)}</div>

      <hr />

      <div className="card-body">
        {pokemon.sprite ? (
          <img src={pokemon.sprite} alt={pokemon.name} />
        ) : (
          <FcRemoveImage className="broken-image" />
        )}
        <p>{String(pokemon.name).toLocaleUpperCase()}</p>
      </div>

      <div className="card-footer">
        {pokemon.types.map((typeData: any) => (
          <p>{typeData.type.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Card;
