import { Pokemon, ActionType } from "./types";

export const setPokemonList = (pokemons: Pokemon[]) => {
  return {
    type: ActionType.SET_POKEMON_LIST,
    payload: { pokemons },
  };
};

export const setPokemonSelected = (id: number) => {
  return {
    type: ActionType.SET_POKEMON_SELECTED,
    payload: { id },
  };
};

export const resetPokemonSelected = () => {
  return {
    type: ActionType.RESET_POKEMON_SELECTED,
  };
};

export const pokemonWasCatchedFromList = (id: number) => {
  return {
    type: ActionType.POKEMON_WAS_CATCHED,
    payload: { id },
  };
};

export const pokemonWasReleasedFromList = (id: number) => {
  return {
    type: ActionType.POKEMON_WAS_RELEASED,
    payload: { id },
  };
};
