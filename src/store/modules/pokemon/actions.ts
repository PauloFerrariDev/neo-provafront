import { Pokemon, ActionType } from "./types";

export const setPokemonList = (pokemons: Pokemon[]) => {
  return {
    type: ActionType.SET_POKEMON_LIST,
    payload: { pokemons },
  };
};

export const pokemonWasCatched = (id: number) => {
  return {
    type: ActionType.POKEMON_WAS_CATCHED,
    payload: { id },
  };
};
