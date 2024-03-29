import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] &&
   			squares[a] === squares[c]) {
      return {
        symbol: squares[a],
        squares: lines[i],
      };
    }
  }
  return null;
}

function Square(props) {
  const className =
    props.winningSquare ? "square winning-square" : "square";
  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const winningSquare = this.props.winningSquares &&
                          this.props.winningSquares.indexOf(i) !== -1;
    return (
      <Square key={i}
              value={this.props.squares[i]}
              winningSquare={winningSquare}
              onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    var rows = [];
    let squares = [];
    for (var row = 0; row < 3; ++row) {
      for (var col = 0; col < 3; ++col) {
        squares.push(this.renderSquare(3 * row + col));
      }
      rows.push(<div key={row} className="board-row">{squares}</div>);
      squares = [];
    }
    return <div>{rows}</div>
  }
}

class MoveList extends React.Component {
  render() {
    const moves = this.props.history.map((elem, index) => {
      const row = Math.floor(1 + elem.move / 3);
      const col = 1 + elem.move % 3;
      const symbol = index % 2 === 0 ? 'O' : 'X';
      const desc = index === 0 ?
        'go to game start' :
        `go to move #${index} [${symbol} @ (${row}, ${col})]`;
      const className =
        index === this.props.stepNumber ? "current-move" : "";
      return (
        <li key={index}>
          <button className={className}
                  onClick={() => this.props.onClick(index)}>
                  {desc}
          </button>
        </li>
      );
    });
    if (this.props.reverse) moves.reverse()
    return <ul>{moves}</ul>
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: null,
      }],
      stepNumber: 0,
      reverseHistory: false,
    };
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status, winnerSymbol, winningSquares;
    if (winner) {
      winnerSymbol = winner.symbol;
      winningSquares = winner.squares;
      status = 'Winner: ' + winnerSymbol;
    } else if (this.state.stepNumber === 9) {
      winnerSymbol = null;
      winningSquares = null;
      status = 'Game drawn';
    } else {
      winnerSymbol = null;
      winningSquares = null;
      status = 'Next player: ' +
        (this.state.stepNumber % 2 === 0 ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
                 winningSquares={winningSquares}
                 onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleMoveOrder()}>
            Toggle move order
          </button>
          <MoveList history={this.state.history}
                    reverse={this.state.reverseHistory}
                    stepNumber={this.state.stepNumber}
                    onClick={(i) => this.jumpTo(i)}/>
        </div>
      </div>
    );
  }
  handleClick(i) {
    const history = this.state.history;
    if (this.state.stepNumber !== history.length - 1) {
      return;
    }
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // Old steps are read-only!
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.stepNumber % 2 === 0 ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move: i,
      }]),
      stepNumber: this.state.stepNumber + 1,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }
  toggleMoveOrder() {
    this.setState({
      reverseHistory: !this.state.reverseHistory,
    });
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
