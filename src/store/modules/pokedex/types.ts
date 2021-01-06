import { Pokemon } from "src/store/modules/pokemon/types";

export interface PokedexState {
  pokemons: Pokemon[];
}

export interface Action {
  type: ActionType;
  payload: Payload;
}

export enum ActionType {
  ADD_POKEMON = "ADD_POKEMON",
  DELETE_POKEMON = "DELETE_POKEMON",
}

export interface Payload {
  id: number;
  pokemon: Pokemon;
}
