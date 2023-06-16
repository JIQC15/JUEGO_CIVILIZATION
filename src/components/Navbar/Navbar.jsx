import React from "react";
import "./Navbar.css";

function Navbar({ onTypeSelected }) {
  function handleTypeClick(type) {
    onTypeSelected(type);
    console.log(type);
  }

  return (
    <div className="navbar">
      <div className="btn-cont">
        <button
          className="navbar-button"
          onClick={() => handleTypeClick("water")}
        >
          Water
        </button>
        <button
          className="navbar-button"
          onClick={() => handleTypeClick("soil")}
        >
          Soil
        </button>
        <button
          className="navbar-button"
          onClick={() => handleTypeClick("grass")}
        >
          Grass
        </button>
        <button
          className="navbar-button"
          onClick={() => handleTypeClick("character")}
        >
          Character
        </button>
        <button
          className="navbar-button"
          onClick={() => handleTypeClick("objective")}
        >
          Objective
        </button>
      </div>
    </div>
  );
}

export default Navbar;
