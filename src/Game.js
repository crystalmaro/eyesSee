/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';

class Game extends Component {
  state = {
    origClass: 'imgBox',
    yesOnTop: true,
  };

  clickImg = e => {
    // overlap both images
    this.setState(preState => {
      return { origClass: preState.origClass + ' clicked' };
    });
    // decide which image on top
    console.log(e.target.parentNode.id);

    if (e.target.parentNode.id === 'no') {
      this.setState({
        yesOnTop: false,
      });
    }
  };

  render() {
    return (
      <div>
        <div className="gameContainer">
          <div
            style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="yes"
          >
            <img src="../imageStock/final_images/item4.png" alt="" />
          </div>

          <div
            style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="no"
          >
            <img src="../imageStock/final_images/item4easy1.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
