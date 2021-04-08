import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./components/Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), currentClick: [-1, -1] }], // 게임 기록을 저장한 배열
      stepNumber: 0,
      xIsNext: true, // true면 X 플레이어 차례
    };
  }

  // i번째 칸 클릭 시 클릭한 칸 안에 X 또는 O 표시를 하는 함수
  handleClick(i) {
    const history = this.state.history.slice(); // 배열의 값을 복사
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        { squares: squares, currentClick: [parseInt(i / 3), i % 3] },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      currentClick: [parseInt(i / 3), i % 3],
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0, // 짝수면 true 홀수면 false
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move (${step.currentClick[0] + 1}, ${
            step.currentClick[1] + 1
          })`
        : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner " + winner;
    } else {
      status = "Next player " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            currentClick={this.state.currentClick}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    // lines 배열의 요소 중 일치하는 것이 있으면 X 또는 O를 return
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // 승자가 없는 경우
  return null;
}
