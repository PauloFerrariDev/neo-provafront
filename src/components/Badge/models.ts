import { PokemonTypes } from "src/models";

export interface BadgeProps {
  type: PokemonTypes;
  clickable?: boolean;
  onClick?: (type: PokemonTypes) => void;
}
