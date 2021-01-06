export const totalPokemons = 898;

export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export type Roles = "success" | "info" | "warning" | "danger";

export type PokemonTypes =
  | "normal"
  | "grass"
  | "fire"
  | "water"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";
