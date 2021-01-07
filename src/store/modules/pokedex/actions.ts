import { Pokemon } from "src/store/modules/pokemon/types";
import { ActionType } from "./types";

export const addPokemonToPokedex = (pokemon: Pokemon) => {
  return {
    type: ActionType.ADD_POKEMON,
    payload: { pokemon },
  };
};

export const deletePokemonFromPokedex = (id: number) => {
  return {
    type: ActionType.DELETE_POKEMON,
    payload: { id },
  };
};

export const changePokemonImageFromPokedex = (id: number, imageURL: string) => {
  return {
    type: ActionType.CHANGE_POKEMON_IMAGE,
    payload: { id, imageURL },
  };
};
