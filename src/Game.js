/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';

class Game extends Component {
  state = {
    origClass: 'imgBox',
<<<<<<< HEAD
<<<<<<< HEAD
    compareClass: 'button',
    isClicked: false,
    yesOnTop: true,
    isCorrect: true,
    yesImg: '../imageStock/yes.png',
    noImg: '../imageStock/no.png',
=======
    yesOnTop: true,
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
=======
    yesOnTop: true,
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
  };

  clickImg = e => {
    // overlap both images
    this.setState(preState => {
      return { origClass: preState.origClass + ' clicked' };
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // decide which image on top
    console.log(e.target.parentNode.id);

>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
    if (e.target.parentNode.id === 'no') {
      this.setState({
        yesOnTop: false,
<<<<<<< HEAD
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
=======
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
=======
    // decide which image on top
    console.log(e.target.parentNode.id);

    if (e.target.parentNode.id === 'no') {
      this.setState({
        yesOnTop: false,
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
      });
    }
  };
  compareTouchEnd = e => {
    this.compareMouseUp();
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
<<<<<<< HEAD
<<<<<<< HEAD
            <img src="../imageStock/final_images/item2.png" alt="" />
=======
            <img src="../imageStock/final_images/item4.png" alt="" />
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
=======
            <img src="../imageStock/final_images/item4.png" alt="" />
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
          </div>

          <div
            style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
            onClick={this.clickImg}
            className={this.state.origClass}
            id="no"
          >
<<<<<<< HEAD
<<<<<<< HEAD
            <img src="../imageStock/final_images/item2hard2.png" alt="" />
          </div>
        </div>
        <div
          className="messageContainer"
          style={
            this.state.isClicked ? { display: 'flex' } : { display: 'none' }
          }
        >
          <div
            className="result"
            style={
              // this.state.isCorrect == true
              this.state.isCorrect
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'red' }
            }
          >
            {/* <img
              src={
                this.state.isCorrect == true
                  ? { src: '../imageStock/yes.png' }
                  : { src: '../imageStock/no.png' }
              }
              /> */}
          </div>
          <div className="message">Icon Resolution</div>
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
=======
            <img src="../imageStock/final_images/item4easy1.png" alt="" />
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
=======
            <img src="../imageStock/final_images/item4easy1.png" alt="" />
>>>>>>> parent of 3cb8c61... finish initial image selection and compare mouse events
          </div>
        </div>
      </div>
    );
  }
}

export default Game;