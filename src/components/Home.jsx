import React from "react";
import { Layout } from "./Layout";

export const Home = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <button onClick={console.log("render")}>poka role</button>
    </Layout>
  );
};
