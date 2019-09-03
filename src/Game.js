/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';

class Game extends Component {
  state = {
    origClass: 'imgBox',
    compareClass: 'button',
    isClicked: false,
    yesOnTop: true,
    isCorrect: true,
    yesImg: '../imageStock/yes.png',
    noImg: '../imageStock/no.png',
  };

  clickImg = e => {
    // this.setState(preState => {
    //   return {
    //     origClass: preState.origClass + ' clicked',
    //     isClicked: true,
    //   };
    // });
    this.setState({
      // overlap both images
      origClass: 'imgBox clicked',
      // display current round result
      isClicked: true,
    })
    if (e.target.parentNode.name === 'no') {
      this.setState({
        // decide which image on top
        yesOnTop: false,
        // check current round result
        isCorrect: false,
      });
    }
  };

  clickNext = e => {
    if (this.state.isClicked) {
      this.setState({
        origClass: 'imgBox',
        isClicked: false,
        yesOnTop: true,
        isCorrect: true,
      });
    }
  };

  compareMouseDown = e => {
    if (this.state.isClicked) {
      if (this.state.yesOnTop) {
        this.setState({
          yesOnTop: false,
          isCorrect: false,
        });
      }
      if (!this.state.yesOnTop) {
        this.setState({
          yesOnTop: true,
          isCorrect: true,
        });
      }
      this.setState({
        compareClass: 'button compare',
      });
    }
  };
  compareTouchDown = e => {
    this.compareMouseDown();
  };
  compareMouseUp = e => {
    if (this.state.isClicked) {
      if (!this.state.yesOnTop) {
        this.setState({
          yesOnTop: true,
          isCorrect: true,
        });
      }
      if (this.state.yesOnTop) {
        this.setState({
          yesOnTop: false,
          isCorrect: false,
        });
      }
      this.setState({
        compareClass: 'button',
      });
    }
  };
  compareTouchEnd = e => {
    this.compareMouseUp();
  };

  render() {
    return (
      <div>
        <div className="gameContainer" id="1" >
          <div
            style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="yes"
            name="yes"
          >
            <img src="../imageStock/final_images/item2.png" alt="" />
          </div>

          <div
            style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="no"
            name="no"

          >
            <img src="../imageStock/final_images/item2easy1.png" alt="" />
          </div>
        </div>
        <div
          className="messageContainer"
          style={
            this.state.isClicked ? { display: 'flex' } : { display: 'none' }
          }
        >
          <div className="result">
            <img
              src={
                this.state.isCorrect
                  ? ('../imageStock/yes.png')
                  : this.state.noImg
              }
            />
          </div>
          <div className="message">Capitalization Consistency</div>
        </div>
        <div className="buttonContainer">
          <div
            onMouseDown={this.compareMouseDown}
            onMouseUp={this.compareMouseUp}
            onTouchStart={this.compareTouchDown}
            onTouchEnd={this.compareTouchEnd}
            className={this.state.compareClass}
          >
            COMPARE
          </div>
          <div onClick={this.clickNext} className="button">
            NEXT
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
