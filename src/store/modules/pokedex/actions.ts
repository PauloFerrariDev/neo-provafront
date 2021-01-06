import { Pokemon } from "src/store/modules/pokemon/types";
import { ActionType } from "./types";

export const addPokemon = (pokemon: Pokemon) => {
  return {
    type: ActionType.ADD_POKEMON,
    payload: { pokemon },
  };
};
