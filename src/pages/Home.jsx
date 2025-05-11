import React from "react";
import Product from "../components/Product";

const Home = () => {
  return (
    <div>
      <h2 className="heading">
        Welcome to TrendyWave with India's latest trends
      </h2>
      <section>
        <Product />
      </section>
    </div>
  );
};

export default Home;
