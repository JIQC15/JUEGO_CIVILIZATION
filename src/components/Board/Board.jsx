import React, { Component } from "react";
import {
  GridGenerator,
  HexGrid,
  Layout,
  Path,
  Text,
  Hexagon,
  HexUtils,
  Pattern,
} from "react-hexgrid";

// import "./GameMap.css";
import "../Board/Board.css";
import Navbar from "../Navbar/Navbar.jsx";

// import "../Board/GameMap.css";

class Board extends Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(12);
    this.state = {
      hexagons,
      path: { start: null, end: null },
      selectedType: null,
    };
  }

  onTypeSelected(type) {
    this.setState({ selectedType: type });
  }

  onClick(event, source) {
    const { path } = this.state;
    if (path.start == null) {
      path.start = source.state.hex;
    } else {
      path.start = null;
      path.end = null;
    }
    this.setState({ path });
  }

  onMouseEnter(event, source) {
    const { path, hexagons } = this.state;
    const targetHex = source.state.hex;
    path.end = targetHex;

    this.setState({ path });
  }

  // render() {
  //   let { hexagons, path } = this.state;
  //   return (
  //     <div className="h-4">
  //       <HexGrid width={1000} height={650}>
  //         <Layout
  //           size={{ x: 4, y: 4 }}
  //           flat={false}
  //           spacing={1.1}
  //           origin={{ x: 0, y: 0 }}
  //         >
  //           {hexagons.map((hex, i) => (
  //             <Hexagon
  //               key={i}
  //               q={hex.q}
  //               r={hex.r}
  //               s={hex.s}
  //               className={hex.props ? hex.props.className : null}
  //               onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
  //               onClick={(e, h) => this.onClick(e, h)}
  //             >
  //               <Text className="small-text">{
  //                 //HexUtils.getID(hex)
  //                 HexUtils.getID()
  //               }</Text>
  //             </Hexagon>
  //           ))}
  //           <Path start={path.start} end={path.end} />
  //         </Layout>
  //       </HexGrid>
  //     </div>
  //   );
  // }

  render() {
    const { hexagons, path, selectedType } = this.state;
    return (
      <div>
        <Navbar onTypeSelected={(type) => this.onTypeSelected(type)} />
        <HexGrid width={1400} height={720} className="h-4">
          <Layout
            size={{ x: 5, y: 5 }}
            flat={false}
            spacing={1.05}
            origin={{ x: 0, y: 0 }}
          >
            {hexagons.map((hex, i) => {
              let hexClass = "hexagon";

              //  Water //
              if (hex.s <= 5 && hex.s >= 1 && hex.r >= -6 && hex.r <= -2) {
                hexClass += " hexagon-water";
                hex.pattern = "water";
              }

              if (
                hex.r >= 0 &&
                hex.r <= 5 &&
                hex.s <= 0 &&
                hex.s <= 6 &&
                hex.q >= 0 &&
                hex.q <= 6
              ) {
                hexClass += " hexagon-water";
                hex.pattern = "water";
              }

              //  Grass //
              if (hex.r <= 0 && hex.s <= 0 && hex.q >= 0) {
                hexClass += " hexagon-land";
                hex.pattern = "grass";
              }
              if (hex.r <= 0 && hex.s >= 0 && hex.q <= 0) {
                hexClass += " hexagon-grass";
                hex.pattern = "grass";
              }

              if (hex.q >= -11 && hex.q <= -1) {
                hex.pattern = "grass";
              }

              if (
                hex.r >= 1 &&
                hex.r <= 4 &&
                hex.s <= -8 &&
                hex.s >= -11 &&
                hex.q >= 7 &&
                hex.q <= 10
              ) {
                hex.pattern = "grass";
              }

              if (hex.q >= 0 && hex.q <= 5 && hex.r == 6) {
                hex.pattern = "grass";
              }

              //  Soil  //
              if (hex.q >= -12 && hex.q <= -12) {
                hex.pattern = "soil";
              }

              if (hex.s == 12) {
                hex.pattern = "soil";
              }
              if (hex.s == -12) {
                hex.pattern = "soil";
              }
              if (hex.q == 12) {
                hex.pattern = "soil";
              }

              // if (hex.q >= 3 && hex.q <= 8 && hex.r >= 4 && hex.r <= 5) {
              //   hexClass += "hexagon-land";
              // } else {
              //   hexClass += "hexagon-grass";
              // }
              return (
                <Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill={hex.pattern}
                  className={hexClass}
                  onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                  onClick={(e, h) => this.onClick(e, h)}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <Text className="small-text">
                    {
                      // HexUtils.getID(hex)
                    }
                  </Text>
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
