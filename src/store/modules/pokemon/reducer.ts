import { Reducer } from "redux";
import produce from "immer";
import { PokemonState, Action, ActionType } from "./types";

const INITIAL_STATE: PokemonState = {
  list: [],
};

const pokemon: Reducer<PokemonState, Action> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.SET_POKEMON_LIST: {
        const { pokemons } = action.payload;

        console.log("pokemons", pokemons);

        draft.list = pokemons;

        break;
      }
      case ActionType.POKEMON_WAS_CATCHED: {
        const { id } = action.payload;

        const index = draft.list.findIndex((pokemon) => pokemon.id === id);

        if (index >= 0) {
          const pokemon = draft.list[index];
          pokemon.was_catched = true;

          draft.list[index] = pokemon;
        }

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default pokemon;
