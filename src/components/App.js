import React, { Component, useState } from "react";
import "../styles/App.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false,
      time: 0
    };
    this.startGame = this.startGame.bind(this);
    this.timerId = null;

    this.ticker = this.ticker.bind(this);
    this.changePosition = this.changePosition.bind(this);
  }

  ticker() {
    this.setState({ time: this.state.time + 1 });
  }

  changePosition(event) {
    if (!this.state.renderBall) return;
    let x = this.state.x;
    let y = this.state.y;

    if (event.keyCode === 37) {
      x -= 5;
    } else if (event.keyCode === 38) {
      y -= 5;
    } else if (event.keyCode === 39) {
      x += 5;
    } else if (event.keyCode === 40) {
      y += 5;
    }

    this.setState({ x: x, y: y }, () => {
      if (x === 250 && y === 250) {
        clearInterval(this.timerId);
        document.removeEventListener("keydown", this.changePosition);
      }
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.changePosition);
  }

  componentWillUnmount() {}

  startGame() {
    this.setState({ renderBall: true });
    this.timerId = setInterval(this.ticker, 1000);
  }

  render() {
    let style = {
      left: `${this.state.x}px`,
      top: `${this.state.y}px`
    };

    return (
      <>
        <div>
          <span className="heading-timer">{this.state.time}</span>
          <button className="start" onClick={this.startGame}>
            Start
          </button>
        </div>

        <div className="ball" style={style}></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
