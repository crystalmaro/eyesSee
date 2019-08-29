import React, { Component } from 'react';

class Game extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="imgContainer">
          <div className="imgBox" id="yes">
            <img src="../imageStock/ccTest.png" alt="" />
          </div>
          <div className="imgBox" id="no">
            <img src="../imageStock/ccTest.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
