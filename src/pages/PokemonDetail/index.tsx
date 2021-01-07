import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { handlePokemonNumber } from "src/utils";

import Alert from "src/components/Alert";
import Badge from "src/components/Badge";
import EvolutionChain from "src/components/EvolutionChain";
import UploadButton from "src/components/UploadButton";

import { resetPokemonSelected } from "src/store/modules/pokemon/actions";

import { ApplicationState } from "src/store";
import { Pokemon } from "src/store/modules/pokemon/types";

import noImageAvailable from "src/assets/no-image-available.png";

const PokemonDetail: React.FC = () => {
  const dispatch = useDispatch();

  const pokemon_selected = useSelector<ApplicationState, Pokemon | null>(
    (state) => state.pokemon.pokemon_selected
  );

  const [abilityURL, setAbilityURL] = useState("");
  const [abilityName, setAbilityName] = useState("");

  const handleResetPokemonSelected = () => {
    dispatch(resetPokemonSelected());
  };

  return (
    pokemon_selected && (
      <div className="pokemon-detail-container">
        <div className="header-container">
          <div className="back-container">
            <div className="back" onClick={handleResetPokemonSelected}>
              <IoArrowBack className="back-icon" />
              <span>Minha Pokédex</span>
            </div>
          </div>
        </div>

        <div className="pokemon-detail-content">
          <div className="pokemon-image">
            {pokemon_selected.sprite ? (
              <img
                src={pokemon_selected.sprite}
                alt={pokemon_selected.name}
                className="image"
              />
            ) : (
              <img
                src={noImageAvailable}
                alt={pokemon_selected.name}
                className="broken-image"
              />
            )}
          </div>

          <div className="pokemon-details">
            <div className="details-header">
              <div className="details-name">
                <p className="number">
                  {handlePokemonNumber(pokemon_selected.id).toLocaleUpperCase()}
                </p>
                <p className="name">
                  {pokemon_selected.name.toLocaleUpperCase()}
                </p>
              </div>

              <div className="upload-button-container">
                <UploadButton id={pokemon_selected.id} text="Alterar Imagem" />
              </div>

              <div className="badges-type">
                {pokemon_selected.types.map((typeData) => (
                  <Badge type={typeData.type.name} />
                ))}
              </div>
              <div className="pokemon-sizes">
                <p>{`HEIGHT: ${pokemon_selected.height / 10} m`}</p>
                <p>{`WEIGHT: ${pokemon_selected.weight / 10} kg`}</p>
              </div>
            </div>

            <div className="details-body">
              <div className="pokemon-stats">
                <p className="section-title">STATS</p>

                {pokemon_selected.stats.map((statData) => (
                  <p key={statData.stat.name}>
                    {statData.stat.name
                      .split("-")
                      .join(" ")
                      .toLocaleUpperCase()}
                    {`: ${statData.base_stat}`}
                  </p>
                ))}
              </div>

              <div className="pokemon-abilities">
                <p className="section-title">ABILITIES</p>

                {abilityURL && abilityName ? (
                  <Alert
                    role="info"
                    text={abilityName}
                    abilityURL={abilityURL}
                    onClose={() => {
                      setAbilityURL("");
                      setAbilityName("");
                    }}
                  />
                ) : (
                  pokemon_selected.abilities.map(
                    (abilities) =>
                      !abilities.is_hidden && (
                        <p
                          key={abilities.ability.name}
                          className="ability-name"
                          onClick={() => {
                            setAbilityURL(abilities.ability.url);
                            setAbilityName(abilities.ability.name);
                          }}
                        >
                          {abilities.ability.name.toLocaleUpperCase()}
                        </p>
                      )
                  )
                )}
              </div>
            </div>
          </div>

          <div className="pokemon-evolutions">
            <p className="section-title">EVOLUÇÕES</p>

            <EvolutionChain />
          </div>
        </div>
      </div>
    )
  );
};

export default PokemonDetail;
