/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';

class Game extends Component {
  state = {
    className: 'imgBox',
  };

  // this.setState((preState) => {
  //   return {step: preState.step+1}
  // })

  clickImg = e => {
    // alert('hi');
    this.setState({
      // return {
      className: 'imgBox clickImg',
      // };
      // alert((preState.className += ':nth-child(1).clickImg'));
    });
  };

  render() {
    return (
      <div>
        <div className="gameContainer">
          <div
            onClick={this.clickImg}
            className={this.state.className}
            id="yes"
          >
            <img src="../imageStock/ccTest.png" alt="" />
          </div>

          <div className={this.state.className} id="no">
            <img src="../imageStock/ccTest.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
