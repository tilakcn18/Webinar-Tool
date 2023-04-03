import { useState, useEffect } from "react";
import { db } from "../firebase";
import "../CSS/HomePage.css";
import NavigationBar from "./navbar";

const Home = () => {
  return (
    <section className="homepage">
      <div className="navbar-home">
        <NavigationBar />
      </div>
      <div style={{marginTop:"100px"}}>
        <h1>HOME PAGE</h1>

      </div>
    </section>
  );
};

export default Home;
