import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ApplicationState } from "src/store";
import { Pokemon } from "src/store/modules/pokemon/types";

const PokemonDetail: React.FC = () => {
  const { id } = useParams();
  const pokemons = useSelector<ApplicationState, Pokemon[]>(
    (state) => state.pokemon.list
  );
  console.log("id:", id, "pokemons: ", pokemons);

  return <h1>Pokemon Detail</h1>;
};

export default PokemonDetail;
