import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "src/pages/Pokedex";
import PokemonDetail from "src/pages/PokemonDetail";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
