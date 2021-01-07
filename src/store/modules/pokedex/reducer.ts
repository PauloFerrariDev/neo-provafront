import { Reducer } from "redux";
import produce from "immer";
import { Pokemon } from "src/store/modules/pokemon/types";
import { PokedexState, Action, ActionType } from "./types";

const INITIAL_STATE: PokedexState = {
  pokemons: [],
};

const pokedex: Reducer<PokedexState, Action> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.ADD_POKEMON: {
        const { pokemon } = action.payload;

        draft.pokemons.push(pokemon);

        draft.pokemons.sort((a: Pokemon, b: Pokemon) => a.id - b.id);

        break;
      }
      case ActionType.DELETE_POKEMON: {
        const { id } = action.payload;

        const index = draft.pokemons.findIndex((pokemon) => pokemon.id === id);

        if (index >= 0) {
          draft.pokemons.splice(index, 1);
        }

        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default pokedex;
