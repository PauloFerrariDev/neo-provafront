import axios from "axios";
import { totalPokemons, AbilityData, EvolutionChainData } from "src/types";
import { Pokemon } from "src/store/modules/pokemon/types";

export const getPokemons = async (): Promise<Pokemon[]> => {
  const promises: Array<any | undefined> = [];

  for (let id = 1; id <= totalPokemons; id++) {
    promises.push(
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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

export const getPokemonAbility = async (
  abilityURL: string
): Promise<AbilityData> => {
  const response = await axios.get(abilityURL);

  const abilityData: AbilityData = {
    flavor_text_entries: response.data ? response.data.flavor_text_entries : [],
  };

  return abilityData;
};

export const getEvolutionChain = async (
  id: number
): Promise<EvolutionChainData> => {
  const speciesURL = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  const evolutionChainData: EvolutionChainData = {
    chain: null,
  };

  const species_response = await axios.get(speciesURL);

  if (!species_response.data) {
    return evolutionChainData;
  }

  const evolutionURL = species_response.data.evolution_chain.url;

  const evolution_response = await axios.get(evolutionURL);

  evolutionChainData.chain = evolution_response.data
    ? evolution_response.data.chain
    : null;

  return evolutionChainData;
};
