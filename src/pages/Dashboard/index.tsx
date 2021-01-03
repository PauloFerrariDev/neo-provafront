import React, { useEffect, useState } from "react";
import { getPokemons } from "src/services";
import Loading from "src/components/Loading";
import Card from "src/components/Card";
import Alert from "src/components/Alert";

const Dashboard = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokedex, setPokedex] = useState<any[]>([]);
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");

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

  const handlePokemonNumber = (id: number) => {
    if (id < 10) {
      return `Nº 00${id}`;
    }

    if (id < 100) {
      return `Nº 0${id}`;
    }

    return `Nº ${id}`;
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = String(event.target.value).toLowerCase();

    setSearchValue(value);
  };

  return (
    <div className="container">
      {loadingPokemons ? (
        <Loading />
      ) : (
        <>
          <div className="actions">
            <div className="filter">
              <p className="label">Nome ou Número</p>
              <div className="search-field">
                <input
                  type="search"
                  onChange={handleOnSearch}
                  placeholder="Buscar..."
                />
              </div>
            </div>

            <div className="catch-pokemon">
              <p className="label">Capturar Pokémon</p>
              <select onChange={onChangeCatchPokemon}>
                <option disabled selected>
                  Selecione
                </option>
                {pokemons.map((pokemon) => (
                  <option key={pokemon.id} value={pokemon.id}>
                    {String(pokemon.name).toLocaleUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {pokedex.length > 0 ? (
            <div className="pokedex-container">
              {pokedex.map((pokemon: any) => {
                if (
                  pokemon.name.includes(searchValue) ||
                  pokemon.id === parseInt(searchValue)
                ) {
                  return (
                    <Card
                      title={handlePokemonNumber(pokemon.id)}
                      text={String(pokemon.name).toLocaleUpperCase()}
                      imageURL={pokemon.sprite}
                    />
                  );
                }

                return null;
              })}
            </div>
          ) : (
            <Alert role="danger" text="Nenhum Pokémon foi capturado ainda!" />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
