import pokeApi from "src/api";
import { totalPokemons } from "src/models";

export const getPokemons = async (): Promise<Array<any | undefined>> => {
  const promises: Array<any | undefined> = [];

  for (let id = 1; id <= totalPokemons; id++) {
    promises.push(
      pokeApi
        .get(`/pokemon/${id}`)
        .then((res) => res.data)
        .catch((err) => undefined)
    );
  }

  const results = await Promise.all(promises);

  const pokemons = results.map(
    (data: any | undefined) =>
      data && {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        types: data.types,
        stats: data.stats,
        sprite:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
      }
  );

  console.log(pokemons);
  return pokemons;
};
