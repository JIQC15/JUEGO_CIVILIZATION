import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="btn-cont">
        <button onClick={() => this.props.onTypeSelected("water")}>
          Water
        </button>
        <button onClick={() => this.props.onTypeSelected("soil")}>Soil</button>
        <button onClick={() => this.props.onTypeSelected("grass")}>
          Grass
        </button>
        <button onClick={() => this.props.onTypeSelected("character")}>
          Character
        </button>
      </div>
    </div>
  );
}

export default Navbar;
