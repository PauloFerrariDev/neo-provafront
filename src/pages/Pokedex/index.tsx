import React, { useEffect, useState } from "react";
import { getPokemons } from "src/services/index.service";
import Loading from "src/components/Loading";
import Card from "src/components/Card";
import Alert from "src/components/Alert";
import Badge from "src/components/Badge";
import { PokemonTypes } from "src/types";
import { IoArrowBack } from "react-icons/io5";

const Pokedex = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredType, setFilteredType] = useState<PokemonTypes | null>(null);
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Array<any | undefined>>([]);
  const [pokedex, setPokedex] = useState<Array<any | undefined>>([]);
  const [pokemonsByType, setPokemonsByType] = useState<Array<any | undefined>>(
    []
  );

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
    const newPokemon = pokemons.find((pokemon) => pokemon && pokemon.id === id);

    if (newPokemon) {
      const pokedexTemp = pokedex;

      pokedexTemp.push(newPokemon);

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

    const value = String(event.target.value).toLocaleUpperCase().trim();

    setSearchValue(value);
  };

  const handleOnClickPokemonType = (type: PokemonTypes) => {
    setLoadingPokemons(true);

    const pokemonsFiltered = filterPokemonsByType(type);

    setTimeout(() => {
      setSearchValue("");
      setFilteredType(type);
      setPokemonsByType(pokemonsFiltered);
      setLoadingPokemons(false);
    }, 300);
  };

  const filterPokemonsByType = (type: string): Array<any> => {
    const pokemonsFiltered: any[] = [];

    for (const pokemon of pokemons) {
      pokemon &&
        pokemon.types.forEach((typeData: any) => {
          if (typeData.type.name === type) {
            pokemonsFiltered.push(pokemon);
          }
        });
    }

    return pokemonsFiltered;
  };

  const backToPokedex = () => {
    setLoadingPokemons(true);

    setTimeout(() => {
      setSearchValue("");
      setPokemonsByType([]);
      setFilteredType(null);
      setLoadingPokemons(false);
    }, 300);
  };

  const renderPokemonCards = (pokemonsData: any[]) => {
    return pokemonsData.map(
      (pokemon: any | undefined) =>
        pokemon &&
        (pokemon.name.includes(searchValue.toLocaleLowerCase()) ||
          pokemon.id === parseInt(searchValue)) && (
          <Card
            key={pokemon.id}
            title={handlePokemonNumber(pokemon.id)}
            text={String(pokemon.name).toLocaleUpperCase()}
            imageURL={pokemon.sprite}
            badges={pokemon.types.map((typeData: any) => (
              <Badge
                key={typeData.type.name}
                type={typeData.type.name}
                clickable
                onClick={handleOnClickPokemonType}
              />
            ))}
          />
        )
    );
  };

  return (
    <div className="pokedex-container">
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
                  value={searchValue}
                  onChange={handleOnSearch}
                  placeholder="Buscar..."
                />
              </div>
            </div>

            <div className="catch-pokemon">
              <p className="label">Capturar Pokémon</p>
              <select onChange={onChangeCatchPokemon} defaultValue="selecione">
                <option disabled value="selecione">
                  Selecione
                </option>
                {pokemons.map(
                  (pokemon: any | undefined) =>
                    pokemon && (
                      <option key={pokemon.id} value={pokemon.id}>
                        {String(pokemon.name).toLocaleUpperCase()}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          {filteredType ? (
            <div className="info-type-container">
              <div className="back-container">
                <div className="back" onClick={backToPokedex}>
                  <IoArrowBack className="back-icon" />
                  <span>Minha Pokédex</span>
                </div>
              </div>

              <div className="info-type">
                <span>Pokémons do Tipo:</span>
                <Badge type={filteredType} />
              </div>
            </div>
          ) : (
            <div className="pokedex-title">
              Minha Pokédex
              <div className="pokedex-subtitle">
                Capturados: {pokedex.length} / {pokemons.length}
              </div>
            </div>
          )}

          {pokedex.length > 0 ? (
            <div className="pokedex-container">
              {renderPokemonCards(
                pokemonsByType.length ? pokemonsByType : pokedex
              )}
            </div>
          ) : (
            <Alert role="danger" text="Nenhum Pokémon foi capturado ainda!" />
          )}
        </>
      )}
    </div>
  );
};

export default Pokedex;
