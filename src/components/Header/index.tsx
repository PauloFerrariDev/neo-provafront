import React from "react";
import pokedexImg from "src/assets/pokedex-logo-360-130.png";
import enteiImg from "src/assets/charizard.png";
import suicuneImg from "src/assets/blastoise-img.png";
import "./style.scss";

const Header = () => {
  return (
    <div className="Header">
      <img src={enteiImg} alt="Entei" className="pokemonsLogo" />
      <img src={pokedexImg} alt="Pokédex" className="pokedexLogo" />
      <img src={suicuneImg} alt="Suicune" className="pokemonsLogo" />
    </div>
  );
};

export default Header;
