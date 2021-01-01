import React from "react";
import pokedexImg from "src/assets/pokedex.png";
import charizardImg from "src/assets/charizard.png";
import blastoiseImg from "src/assets/blastoise.png";
import "./style.scss";

const Header = () => {
  return (
    <div className="header">
      <img src={charizardImg} alt="charizard" className="pokemons-logo" />
      <img src={pokedexImg} alt="pokédex" className="pokedex-logo" />
      <img src={blastoiseImg} alt="blastoise" className="pokemons-logo" />
    </div>
  );
};

export default Header;
