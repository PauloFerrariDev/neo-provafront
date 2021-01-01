import React from "react";
import "./style.scss";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="actions">
        <div className="filter">
          <p>Nome ou Número:</p>
          <input type="search" />
        </div>

        <div className="catch-pokemon">
          <p>Capturar Pokémon:</p>
          <select>
            <option value="pichu">Pichu</option>
            <option value="pikachu">Pikachu</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
