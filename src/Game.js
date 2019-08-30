/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';

class Game extends Component {
  state = {
    origClass: 'imgBox',
  };

  clickImg = e => {
    console.log(e.target.parentNode.id);

    // let classname = [...this.state.className];
    this.setState({
      origClass: 'imgBox clicked',
    });
    // this.setState(e => {
    e.target.parentNode.style = ' zIndex: 10 ';
    // });
    // this.setState(preState => {
    //   return { className: preState + ' clicked' };
    // });

    // e.target.parentNode.style = { border: '3px solid red' };
  };

  render() {
    return (
      <div>
        <div className="gameContainer">
          <div
            style={{ zIndex: 1 }}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="yes"
          >
            <img src="../imageStock/ccTest1.png" alt="" />
          </div>

          <div onClick={this.clickImg} className={this.state.origClass} id="no">
            <img src="../imageStock/ccTest2.png" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
