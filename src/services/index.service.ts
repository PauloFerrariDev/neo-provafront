import pokeApi from "src/services/api";
import { totalPokemons } from "src/types";
import { Pokemon } from "src/store/modules/pokemon/types";

export const getPokemons = async (): Promise<Pokemon[]> => {
  const promises: Array<any | undefined> = [];

  for (let id = 1; id <= totalPokemons; id++) {
    promises.push(
      pokeApi
        .get(`/pokemon/${id}`)
        .then((res) => res.data)
        .catch(() => undefined)
    );
  }

  const results = await Promise.all(promises);

  const pokemons: Pokemon[] = [];

  results.forEach((data: any | undefined) => {
    if (data) {
      const pokemon: Pokemon = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        types: data.types,
        stats: data.stats,
        sprite: data.sprites.other["official-artwork"].front_default,
      };

      pokemons.push(pokemon);
    }
  });

  return pokemons;
};
