import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "src/pages/Pokedex";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
