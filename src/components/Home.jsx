import React from "react";
import { Layout } from "./Layout";
import "style/home.css";
const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <img
          src={process.env.PUBLIC_URL + "/rt512.png"}
          alt="remoTalky logo"
        ></img>
        <h1>Have fun at work ;)</h1>
      </div>
    </Layout>
  );
};
export default Home;
