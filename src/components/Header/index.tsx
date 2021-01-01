import React from "react";
import pokedexImg from "src/assets/pokedex.png";
import charizardImg from "src/assets/charizard.png";
import blastoiseImg from "src/assets/blastoise.png";
import "./style.scss";

const Header = () => {
  return (
    <div className="Header">
      <img src={charizardImg} alt="Charizard" className="pokemonsLogo" />
      <img src={pokedexImg} alt="Pokédex" className="pokedexLogo" />
      <img src={blastoiseImg} alt="Blastoise" className="pokemonsLogo" />
    </div>
  );
};

export default Header;
