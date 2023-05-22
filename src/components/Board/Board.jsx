import React, { Component } from "react";
import {
  GridGenerator,
  HexGrid,
  Layout,
  Path,
  Text,
  Hexagon,
  HexUtils,
} from "react-hexgrid";
import "../Board/Board.css";

class Board extends Component {
  constructor(props) {
    super(props);
    const hexagons = GridGenerator.hexagon(7);
    this.state = {
      hexagons,
      path: { start: null, end: null },
    };
  }

  // onClick(event, source) {
  //   const { path } = this.state;
  //   if (path.start == null) {
  //     path.start = source.state.hex;
  //   } else {
  //     path.start = null;
  //     path.end = null;
  //   }
  //   this.setState({ path });
  // }

  // onMouseEnter(event, source) {
  //   const { path, hexagons } = this.state;
  //   const targetHex = source.state.hex;
  //   path.end = targetHex;

  //   this.setState({ path });
  // }

  render() {
    let { hexagons, path } = this.state;
    return (
      <div className="h-4">
        <HexGrid width={1000} height={600}>
          <Layout
            size={{ x: 4, y: 4 }}
            flat={false}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
          >
            {hexagons.map((hex, i) => (
              <Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                className={hex.props ? hex.props.className : null}
                onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
                onClick={(e, h) => this.onClick(e, h)}
              >
                <Text className="small-text">{HexUtils.getID(hex)}</Text>
              </Hexagon>
            ))}
            <Path start={path.start} end={path.end} />
          </Layout>
        </HexGrid>
      </div>
    );
  }
}

export default Board;
