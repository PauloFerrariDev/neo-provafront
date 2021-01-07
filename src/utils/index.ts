import { PokemonWithoutImage } from "src/types";

import calyrex from "src/assets/calyrex.png";
import glastrier from "src/assets/glastrier.png";
import regieleki from "src/assets/regieleki.png";
import regidrago from "src/assets/regidrago.png";
import spectrier from "src/assets/spectrier.png";

export const handlePokemonNumber = (id: number): string => {
  if (id < 10) {
    return `Nº 00${id}`;
  }

  if (id < 100) {
    return `Nº 0${id}`;
  }

  return `Nº ${id}`;
};

export const handleImageUrl = (
  name: string,
  imageURL: string | null
): string | null => {
  switch (name) {
    case PokemonWithoutImage.CALYREX: {
      return calyrex;
    }
    case PokemonWithoutImage.GLASTRIER: {
      return glastrier;
    }
    case PokemonWithoutImage.REGIELEKI: {
      return regieleki;
    }
    case PokemonWithoutImage.REGIDRAGO: {
      return regidrago;
    }
    case PokemonWithoutImage.SPECTRIER: {
      return spectrier;
    }
    default: {
      return imageURL;
    }
  }
};
