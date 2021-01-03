import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { getPokemons } from "src/services";
import Loading from "src/components/Loading";
import Card from "src/components/Card";

const Dashboard = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokedex, setPokedex] = useState<any[]>([]);
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(true);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const pokemons = await getPokemons();
    setPokemons(pokemons);
    setLoadingPokemons(false);
  };

  const onChangeCatchPokemon = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id: number = Number(event.target.value);
    console.log("id", id);

    if (!pokedex.find((pokemon: any) => pokemon.id === id)) {
      addPokemonToPokedex(id);
    }
  };

  const addPokemonToPokedex = (id: number) => {
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);

    if (pokemon) {
      const pokedexTemp = pokedex;

      pokedexTemp.push(pokemon);

      pokedexTemp.sort((a: any, b: any) => a.id - b.id);

      console.log("pokedexTemp", pokedexTemp);

      setPokedex([...pokedexTemp]);
    }
  };

  return (
    <div className="container">
      {loadingPokemons ? (
        <Loading />
      ) : (
        <>
          <div className="actions">
            <div className="filter">
              <p className="label">Nome ou Número:</p>
              <div className="search-field">
                <input type="search" />
                <button type="submit">
                  <GoSearch className="search-icon" />
                </button>
              </div>
            </div>

            <div className="catch-pokemon">
              <p className="label">Capturar Pokémon:</p>
              <select onChange={onChangeCatchPokemon}>
                <option disabled selected />
                {pokemons.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.id}>
                    {String(pokemon.name).toLocaleUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pokedex-container">
            {pokedex.map((pokemon: any) => (
              <Card pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
