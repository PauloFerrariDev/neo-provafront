import { combineReducers } from "redux";
import pokemon from "./pokemon/reducer";
import pokedex from "./pokedex/reducer";

export default combineReducers({
  pokemon,
  pokedex,
});
