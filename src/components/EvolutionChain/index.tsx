import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEvolutionChain } from "src/services";

import Badge from "src/components/Badge";
import Card from "src/components/Card";
import Loading from "src/components/Loading";

import { Chain } from "src/types";

import { ApplicationState } from "src/store";
import { PokemonState, Pokemon } from "src/store/modules/pokemon/types";

import { handleImageUrl } from "src/utils";

interface pokemonEvolves {
  order: number;
  name: string;
}

const EvolutionChain: React.FC = () => {
  const pokemon = useSelector<ApplicationState, PokemonState>(
    (state) => state.pokemon
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [evoltuionChain, setEvolutionChain] = useState<Array<Pokemon[]>>([]);

  useEffect(() => {
    if (pokemon.pokemon_selected) {
      fetchEvolutionChain(pokemon.pokemon_selected.id);
    }
    // eslint-disable-next-line
  }, [pokemon.pokemon_selected]);

  const fetchEvolutionChain = async (id: number) => {
    const response = await getEvolutionChain(id);

    if (response.chain) {
      const chain = recursiveHandleEvolves(response.chain, [], 0, []);

      if (chain) {
        handlePokemonsGroup(chain);
      }
    }
  };

  const recursiveHandleEvolves = (
    chain: Chain,
    evolves: pokemonEvolves[],
    order: number,
    previousChain: Chain[]
  ): pokemonEvolves[] | undefined => {
    evolves.push({
      order,
      name: chain.species.name,
    });

    if (!chain.evolves_to.length) {
      if (!previousChain.length) {
        return evolves;
      }

      for (let index = 0; index < previousChain.length; index++) {
        const chainAux = previousChain[index];
        previousChain.splice(index, 1);

        return recursiveHandleEvolves(chainAux, evolves, order, previousChain);
      }
    }

    for (let index = 0; index < chain.evolves_to.length; index++) {
      const chainAux = chain.evolves_to[index];
      chain.evolves_to.splice(index, 1);

      return recursiveHandleEvolves(
        chainAux,
        evolves,
        order + 1,
        chain.evolves_to
      );
    }
  };

  const groupInOrder = (
    evoltuionChain: pokemonEvolves[]
  ): Array<pokemonEvolves[]> => {
    let heigherOrder = 0;
    const evolutionsGroup: Array<pokemonEvolves[]> = [];
    const evoltuionChainTemp = [...evoltuionChain];
    const lastEvolution = evoltuionChainTemp.pop();

    if (lastEvolution) {
      heigherOrder = lastEvolution.order;
    }

    for (let order = 0; order <= heigherOrder; order++) {
      const evolutionsFiltered = evoltuionChain.filter(
        (evo) => evo.order === order
      );

      evolutionsGroup.push(evolutionsFiltered);
    }

    return evolutionsGroup;
  };

  const handlePokemonsGroup = (evoltuionChain: pokemonEvolves[]) => {
    const groups = groupInOrder(evoltuionChain);
    const pokemonsGroup: Array<Pokemon[]> = [];

    groups.forEach((group) => {
      const pokemons: Pokemon[] = [];

      group.forEach((evo) => {
        const pokemonTemp = pokemon.list.find((poke) => poke.name === evo.name);

        if (pokemonTemp) {
          pokemons.push(pokemonTemp);
        }
      });

      pokemonsGroup.push(pokemons);
    });

    setEvolutionChain(pokemonsGroup);
    setLoading(false);
  };

  const renderPokemonCards = evoltuionChain.map((group) => (
    <div
      className="group-container "
      style={{ maxWidth: `${100 / evoltuionChain.length}%` }}
    >
      <div className="group">
        {group.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            className="card-group"
            name={pokemon.name.toLocaleUpperCase()}
            imageURL={handleImageUrl(pokemon.name, pokemon.sprite)}
            badges={pokemon.types.map((typeData) => (
              <Badge key={typeData.type.name} type={typeData.type.name} />
            ))}
            deletable={false}
          />
        ))}
      </div>
    </div>
  ));

  return loading ? (
    <Loading />
  ) : (
    <div className="evolution-chain-container">
      {evoltuionChain.length > 1 ? (
        <div className="evolution-chain">{renderPokemonCards}</div>
      ) : (
        <div>
          {pokemon.pokemon_selected
            ? pokemon.pokemon_selected.name.toLocaleUpperCase()
            : "ESTE POKÉMON"}
          {" NÃO EVOLUI"}
        </div>
      )}
    </div>
  );
};

export default EvolutionChain;
