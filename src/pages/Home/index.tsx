import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "src/services";

import { setPokemonList } from "src/store/modules/pokemon/actions";

import { ApplicationState } from "src/store";
import { PokemonState } from "src/store/modules/pokemon/types";

import Header from "src/components/Header";
import Pokedex from "src/pages/Pokedex";
import PokemonDetail from "src/pages/PokemonDetail";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const pokemon = useSelector<ApplicationState, PokemonState>(
    (state) => state.pokemon
  );

  const fetchPokemons = useCallback(async () => {
    const pokemonsData = await getPokemons();
    dispatch(setPokemonList(pokemonsData));
  }, [dispatch]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <>
      <Header />
      <div className="home-container">
        {pokemon.pokemon_selected ? <PokemonDetail /> : <Pokedex />}
      </div>
    </>
  );
};

export default Home;
