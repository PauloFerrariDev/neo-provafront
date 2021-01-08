import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

import Alert from "src/components/Alert";
import Badge from "src/components/Badge";
import Card from "src/components/Card";
import Loading from "src/components/Loading";

import { ApplicationState } from "src/store";
import { PokemonTypes } from "src/types";
import { PokemonState, Pokemon } from "src/store/modules/pokemon/types";
import { pokemonWasCatchedFromList } from "src/store/modules/pokemon/actions";
import { addPokemonToPokedex } from "src/store/modules/pokedex/actions";

import { handleImageUrl } from "src/utils";

const Pokedex: React.FC = () => {
  const dispatch = useDispatch();

  const pokemon = useSelector<ApplicationState, PokemonState>(
    (state) => state.pokemon
  );

  const pokedex = useSelector<ApplicationState, Pokemon[]>(
    (state) => state.pokedex.pokemons
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredType, setFilteredType] = useState<PokemonTypes | null>(null);
  const [pokemonsByType, setPokemonsByType] = useState<Array<any | undefined>>(
    []
  );

  const [
    loadingPokemonsFiltered,
    setLoadingPokemonsFiltered,
  ] = useState<boolean>(false);

  const onChangeCatchPokemon = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const id = Number(event.target.value);

    if (!pokedex.find((pokemon: Pokemon) => pokemon.id === id)) {
      registerPokemonInPokedex(id);
    }
  };

  const registerPokemonInPokedex = (id: number): void => {
    const newPokemon = pokemon.list.find((pokemon) => pokemon.id === id);

    if (newPokemon) {
      dispatch(pokemonWasCatchedFromList(id));
      dispatch(addPokemonToPokedex(newPokemon));
    }
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const value = String(event.target.value).toLocaleUpperCase().trim();

    setSearchValue(value);
  };

  const handleOnClickPokemonType = (type: PokemonTypes): void => {
    setLoadingPokemonsFiltered(true);

    const pokemonsFiltered = filterPokemonsByType(type);

    // Usado para dar tempo de carregar as sprites dos pokémons
    setTimeout(() => {
      setSearchValue("");
      setFilteredType(type);
      setPokemonsByType(pokemonsFiltered);
      setLoadingPokemonsFiltered(false);
    }, 200);
  };

  const filterPokemonsByType = (type: string): Pokemon[] => {
    const pokemonsFiltered: Pokemon[] = [];

    const pokemons = pokemon.list;

    for (const pokemon of pokemons) {
      pokemon.types.forEach((typeData) => {
        if (typeData.type.name === type) {
          pokemonsFiltered.push(pokemon);
        }
      });
    }

    return pokemonsFiltered;
  };

  const backToPokedex = (): void => {
    setLoadingPokemonsFiltered(true);

    // Usado para dar tempo de carregar as sprites dos pokémons
    setTimeout(() => {
      setSearchValue("");
      setPokemonsByType([]);
      setFilteredType(null);
      setLoadingPokemonsFiltered(false);
    }, 200);
  };

  const renderPokemonCards = (
    pokemonsData: Pokemon[]
  ): (false | JSX.Element)[] => {
    return pokemonsData.map(
      (pokemon) =>
        (pokemon.name.includes(searchValue.toLocaleLowerCase()) ||
          pokemon.id === parseInt(searchValue)) && (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name.toLocaleUpperCase()}
            imageURL={handleImageUrl(pokemon.name, pokemon.sprite)}
            badges={pokemon.types.map((typeData) => (
              <Badge
                key={typeData.type.name}
                type={typeData.type.name}
                clickable
                onClick={handleOnClickPokemonType}
              />
            ))}
            deletable={!filteredType}
          />
        )
    );
  };

  return (
    <div className="pokedex-container">
      {pokemon.loading || loadingPokemonsFiltered ? (
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

            {!filteredType && (
              <div className="catch-pokemon">
                <p className="label">Capturar Pokémon</p>
                <select
                  onChange={onChangeCatchPokemon}
                  value={pokemon.selectInputValue}
                >
                  <option disabled value={0}>
                    Selecione
                  </option>
                  {pokemon.list.map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name.toLocaleUpperCase()}
                      {pokemon.was_catched && " - (capturado)"}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
                Capturados: {pokedex.length} / {pokemon.list.length}
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
