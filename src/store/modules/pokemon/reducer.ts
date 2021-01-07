import { Reducer } from "redux";
import produce from "immer";
import { PokemonState, Action, ActionType } from "./types";

const INITIAL_STATE: PokemonState = {
  list: [],
  loading: true,
  selectInputValue: 0,
  pokemon_selected: null,
};

const pokemon: Reducer<PokemonState, Action> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.SET_POKEMON_LIST: {
        const { pokemons } = action.payload;

        draft.list = pokemons;
        draft.loading = false;

        break;
      }
      case ActionType.SET_POKEMON_SELECTED: {
        const { id } = action.payload;

        const pokemon = draft.list.find((pokemon) => pokemon.id === id);

        if (pokemon) {
          draft.pokemon_selected = pokemon;
        }

        break;
      }
      case ActionType.RESET_POKEMON_SELECTED: {
        draft.pokemon_selected = null;

        break;
      }
      case ActionType.POKEMON_WAS_CATCHED: {
        const { id } = action.payload;

        const index = draft.list.findIndex((pokemon) => pokemon.id === id);

        if (index >= 0) {
          const pokemon = draft.list[index];
          pokemon.was_catched = true;

          draft.list[index] = pokemon;
          draft.selectInputValue = id;
        }

        break;
      }
      case ActionType.POKEMON_WAS_RELEASED: {
        const { id } = action.payload;

        const index = draft.list.findIndex((pokemon) => pokemon.id === id);

        if (index >= 0) {
          const pokemon = draft.list[index];
          pokemon.was_catched = false;

          draft.list[index] = pokemon;

          if (pokemon.id === draft.selectInputValue) {
            draft.selectInputValue = 0;
          }
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
