import React from "react";
import Header from "src/components/Header";
import PublicRoutes from "src/routes/index.routes";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <PublicRoutes />
      </div>
    </>
  );
};

export default Home;
