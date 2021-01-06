import { PokemonTypes } from "src/types";

export interface BadgeProps {
  type: PokemonTypes;
  clickable?: boolean;
  onClick?: (type: PokemonTypes) => void;
}
