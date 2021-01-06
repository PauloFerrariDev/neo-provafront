import { createStore } from "redux";
import rootReducer from "./modules/rootReducer";
import { PokemonState } from "./modules/pokemon/types";
import { PokedexState } from "./modules/pokedex/types";

export interface ApplicationState {
  pokemon: PokemonState;
  pokedex: PokedexState;
}

const store = createStore(rootReducer);

export default store;
