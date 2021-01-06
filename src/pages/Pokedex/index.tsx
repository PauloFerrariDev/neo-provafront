import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { getPokemons } from "src/services/index.service";

import Alert from "src/components/Alert";
import Badge from "src/components/Badge";
import Card from "src/components/Card";
import Loading from "src/components/Loading";

import { ApplicationState } from "src/store";
import { PokemonTypes, PokemonWithoutImage } from "src/types";
import { Pokemon } from "src/store/modules/pokemon/types";
import {
  setPokemonList,
  pokemonWasCatched,
} from "src/store/modules/pokemon/actions";
import { addPokemon } from "src/store/modules/pokedex/actions";

import calyrex from "src/assets/calyrex.png";
import glastrier from "src/assets/glastrier.png";
import regieleki from "src/assets/regieleki.png";
import regidrago from "src/assets/regidrago.png";
import spectrier from "src/assets/spectrier.png";

const Pokedex: React.FC = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector<ApplicationState, Pokemon[]>(
    (state) => state.pokemon.list
  );

  const pokedex = useSelector<ApplicationState, Pokemon[]>(
    (state) => state.pokedex.pokemons
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const [loadingPokemons, setLoadingPokemons] = useState<boolean>(true);
  const [filteredType, setFilteredType] = useState<PokemonTypes | null>(null);
  const [pokemonsByType, setPokemonsByType] = useState<Array<any | undefined>>(
    []
  );

  const fetchPokemons = useCallback(async () => {
    const pokemonsData = await getPokemons();
    dispatch(setPokemonList(pokemonsData));
    setLoadingPokemons(false);
  }, [dispatch]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const onChangeCatchPokemon = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const id = Number(event.target.value);

    if (!pokedex.find((pokemon: Pokemon) => pokemon.id === id)) {
      addPokemonToPokedex(id);
    }
  };

  const addPokemonToPokedex = (id: number): void => {
    const newPokemon = pokemons.find((pokemon) => pokemon.id === id);

    if (newPokemon) {
      dispatch(pokemonWasCatched(id));
      dispatch(addPokemon(newPokemon));
    }
  };

  const handlePokemonNumber = (id: number): string => {
    if (id < 10) {
      return `Nº 00${id}`;
    }

    if (id < 100) {
      return `Nº 0${id}`;
    }

    return `Nº ${id}`;
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const value = String(event.target.value).toLocaleUpperCase().trim();

    setSearchValue(value);
  };

  const handleOnClickPokemonType = (type: PokemonTypes): void => {
    setLoadingPokemons(true);

    const pokemonsFiltered = filterPokemonsByType(type);

    setTimeout(() => {
      setSearchValue("");
      setFilteredType(type);
      setPokemonsByType(pokemonsFiltered);
      setLoadingPokemons(false);
    }, 300);
  };

  const filterPokemonsByType = (type: string): Pokemon[] => {
    const pokemonsFiltered: Pokemon[] = [];

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
    setLoadingPokemons(true);

    setTimeout(() => {
      setSearchValue("");
      setPokemonsByType([]);
      setFilteredType(null);
      setLoadingPokemons(false);
    }, 300);
  };

  const handleImageUrl = (
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

  const renderPokemonCards = (
    pokemonsData: Pokemon[]
  ): (false | JSX.Element)[] => {
    return pokemonsData.map(
      (pokemon) =>
        (pokemon.name.includes(searchValue.toLocaleLowerCase()) ||
          pokemon.id === parseInt(searchValue)) && (
          <Card
            key={pokemon.id}
            title={handlePokemonNumber(pokemon.id)}
            text={pokemon.name.toLocaleUpperCase()}
            imageURL={handleImageUrl(pokemon.name, pokemon.sprite)}
            badges={pokemon.types.map((typeData) => (
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

            {!filteredType && (
              <div className="catch-pokemon">
                <p className="label">Capturar Pokémon</p>
                <select
                  onChange={onChangeCatchPokemon}
                  defaultValue="selecione"
                >
                  <option disabled value="selecione">
                    Selecione
                  </option>
                  {pokemons.map((pokemon) => (
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
