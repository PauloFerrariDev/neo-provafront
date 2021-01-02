import React from "react";
import "./style.scss";
import { GoSearch } from "react-icons/go";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="actions">
        <div className="filter">
          <p>Nome ou Número:</p>
          <div className="search-field">
            <input type="text" />
            <button type="submit">
              <GoSearch className="search-icon" />
            </button>
          </div>
        </div>

        <div className="catch-pokemon">
          <p>Capturar Pokémon:</p>
          <select>
            <option value="0">Pichu</option>
            <option value="1">Pikachu</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
