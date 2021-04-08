import React from "react";
import Square from "./Square";
import "./Board.css";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        current={
          JSON.stringify(this.props.currentClick) ===
          JSON.stringify([parseInt(i / 3), i % 3])
            ? true
            : false
        }
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const Board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(3 * i + j));
      }
      Board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return <div>{Board}</div>;
  }
}

export default Board;
