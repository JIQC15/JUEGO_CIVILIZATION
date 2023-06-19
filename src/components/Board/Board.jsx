import React, { Component } from "react";
import {
  GridGenerator,
  HexGrid,
  Layout,
  Path,
  Hexagon,
  HexUtils,
  Pattern,
  Text,
} from "react-hexgrid";

import "../Board/Board.css";
import Navbar from "../Navbar/Navbar.jsx";

class Board extends Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(12).map((hex) => ({
      ...hex,
      distance: Infinity,
      previous: null,
      isPath: false,
    }));

    this.state = {
      hexagons,
      path: { start: null, end: null },
      selectedType: "",
      selectedPattern: "",
      isMouseDown: false,
      characterHex: null,
      objectiveHex: null,
    };
  }

  onTypeSelected(type) {
    const { selectedPattern } = this.state;
    if (selectedPattern === type) {
      this.setState({ selectedPattern: "" });
    } else {
      this.setState({ selectedPattern: type });
    }
  }

  onClick(event, source) {
    const { selectedPattern, characterHex, objectiveHex, path } = this.state;
    const clickedHex = source.state.hex;

    if (selectedPattern === "character") {
      this.setState({ characterHex: clickedHex });
      console.log("Character coords: ", clickedHex);

      const neighbors = this.getNeighbors(clickedHex);
      console.log("Character neighbors: ", neighbors);

      path.start = clickedHex;
    } else if (selectedPattern === "objective") {
      this.setState({ objectiveHex: clickedHex });
      console.log("Objective coords: ", clickedHex);

      const neighbors = this.getNeighbors(clickedHex);
      console.log("Objective neighbors: ", neighbors);

      path.end = clickedHex;
    }
    const distance = HexUtils.distance(characterHex, objectiveHex);
    console.log(
      `Distance from ${characterHex} to ${objectiveHex} is ${distance}`
    );
    this.setState({ path });
  }

  onMouseEnter(event, source) {
    const { isMouseDown, hexagons, selectedPattern } = this.state;

    const patternWeights = {
      grass: 1,
      soil: 10,
      water: 100,
    };

    if (isMouseDown) {
      const targetHex = source.state.hex;
      const hexIndex = hexagons.findIndex(
        (hex) =>
          hex.q === targetHex.q &&
          hex.r === targetHex.r &&
          hex.s === targetHex.s
      );
      if (hexIndex !== -1) {
        const hex = hexagons[hexIndex];
        const selectedWeight = patternWeights[selectedPattern];
        if (hex.pattern !== selectedPattern) {
          const updatedHexagons = [...hexagons];
          updatedHexagons[hexIndex] = {
            ...hex,
            pattern: selectedPattern,
            distance: selectedWeight,
          };
          this.setState({ hexagons: updatedHexagons });
        }
      }
    }
  }

  onMouseDown() {
    this.setState({ isMouseDown: true });
  }

  onMouseUp() {
    this.setState({ isMouseDown: false });
  }

  getNeighbors(hex) {
    const { hexagons } = this.state;
    return HexUtils.neighbors(hex).map((neighbor) =>
      hexagons.find(
        (h) => h.q === neighbor.q && h.r === neighbor.r && h.s === neighbor.s
      )
    );
  }

  render() {
    const {
      hexagons,
      path,
      selectedType,
      selectedPattern,
      characterHex,
      objectiveHex,
    } = this.state;

    return (
      <div>
        <Navbar onTypeSelected={(type) => this.onTypeSelected(type)} />
        <HexGrid width={1500} height={900} className="h-4">
          <Layout
            size={{ x: 3, y: 3 }}
            flat={false}
            spacing={1.05}
            origin={{ x: 0, y: 0 }}
          >
            {hexagons.map((hex, i) => {
              let hexClass = "hexagon";
              const isCharacterHex =
                characterHex &&
                hex.q === characterHex.q &&
                hex.r === characterHex.r &&
                hex.s === characterHex.s;

              const isObjectiveHex =
                objectiveHex &&
                hex.q === objectiveHex.q &&
                hex.r === objectiveHex.r &&
                hex.s === objectiveHex.s;

              return (
                <Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={
                    hex.pattern && hex.pattern !== selectedPattern
                      ? hex.pattern
                      : ""
                  }
                  onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                  onClick={(e, h) => this.onClick(e, h)}
                  onMouseDown={() => this.onMouseDown()}
                  onMouseUp={() => this.onMouseUp()}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <g>
                    {isCharacterHex && <Text>P</Text>}

                    {isObjectiveHex && <Text>O</Text>}
                  </g>
                </Hexagon>
              );
            })}
            <Path start={path.start} end={path.end} />
            <Pattern
              id="soil"
              link="https://www.dalstonmillfabrics.co.uk/pub/media/catalog/product/cache/1313879062af4fe4b91d2ab2cd3e697f/c/r/craft-collection-cotton-print-pixels-brown.jpg"
              size={{ x: 6, y: 4.99 }}
            />
            <Pattern
              id="grass"
              link="https://i.pinimg.com/736x/63/af/30/63af3020e5c990258b5911e2bdfc8e7e.jpg"
              size={{ x: 5, y: 5 }}
            />
            <Pattern
              id="water"
              link="https://i.pinimg.com/originals/db/7f/87/db7f877b7bc382693084993cf91343bd.png"
            />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default Board;
