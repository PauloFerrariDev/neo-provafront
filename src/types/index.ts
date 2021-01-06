export const totalPokemons = 898;

export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export type Roles = "danger" | "info" | "success" | "warning";

export type PokemonTypes =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fire"
  | "fighting"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export enum PokemonWithoutImage {
  CALYREX = "calyrex",
  GLASTRIER = "glastrier",
  REGIDRAGO = "regidrago",
  REGIELEKI = "regieleki",
  SPECTRIER = "spectrier",
}
