/* eslint-disable */
import React, { Component } from 'react';
import './css/game.css';
import firebase from 'firebase';

class Game extends Component {
  state = {
    origClass: 'imgBox',
    compareClass: 'button',
    isClicked: false,
    yesOnTop: true,
    isCorrect: true,
    yesImg: '../imageStock/yes.png',
    noImg: '../imageStock/no.png',

    data: [], // Fire - complete data loaded from firebase
    totalRound: [], // Fire - array of number 0 - 19
    // totalEasyRound: [], // totalRound index 0 - 9
    // totalHardRound: [], // totalRound index 10 - 19
    randomRound: [], // Fire - randomized EasyRound, followed by randomize HardRound

    currentRound: 0,
    score: 0,
    progressBar: 0,
    isYes: 'yes'
  };



  // ============================
  // UI events - click image
  // ============================
  clickImg = e => {
    this.setState({
      // overlap both images
      origClass: 'imgBox clicked',
      // display current round result
      isClicked: true,
    })
    if (e.target.parentNode.id === 'no') {
      this.setState({
        // decide which image on top
        yesOnTop: false,
        // check current round result
        isCorrect: false,
      });
    }
    // scorekeeping
    if (e.target.parentNode.id === 'yes') {
      switch (e.target.parentNode.getAttribute("level")) {
        case 'easy':
          this.setState((preState) => { return { score: preState.score + 100 } });
          break;
        case 'hard':
          this.setState((preState) => { return { score: preState.score + 150 } });
          break;
      }
    }
    // progress bar incrementation
    this.setState((preState) => { return { progressBar: preState.progressBar + (300 / 20) } })
  };
  // ============================
  // UI events - click next
  // ============================
  clickNext = e => {
    if (this.state.isClicked
      && this.state.currentRound < this.state.data.length - 1) {
      this.setState({
        origClass: 'imgBox',
        isClicked: false,
        yesOnTop: true,
        isCorrect: true,
      });
      // increment current round count
      this.setState((preState) => {
        return { currentRound: preState.currentRound + 1 }
      });
    } else {
      alert("nope")
    }
  };
  // ============================
  // UI events - click compare
  // ============================
  compareMouseDown = e => {
    if (this.state.isClicked) {
      if (this.state.yesOnTop) {
        this.setState({ yesOnTop: false, isCorrect: false });
      }
      if (!this.state.yesOnTop) {
        this.setState({ yesOnTop: true, isCorrect: true });
      }
      this.setState({ compareClass: 'button compare' });
    }
  };
  compareTouchDown = e => { this.compareMouseDown() };
  compareMouseUp = e => {
    if (this.state.isClicked) {
      if (!this.state.yesOnTop) {
        this.setState({ yesOnTop: true, isCorrect: true });
      }
      if (this.state.yesOnTop) {
        this.setState({ yesOnTop: false, isCorrect: false });
      }
      this.setState({ compareClass: 'button' });
    }
  };
  compareTouchEnd = e => { this.compareMouseUp() };

  render() {
    let content;
    let data = this.props.data;
    // let totalRound = this.props.totalRound;
    let randomRound = this.props.randomRound;

    if (randomRound.length >= 20) {
      let yes =
        <div
          style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
          onClick={this.clickImg} className={this.state.origClass}
          id='yes'
          level={data[randomRound[this.state.currentRound]].level}
        >
          <img src={data[randomRound[this.state.currentRound]].yes} alt="" />
        </div>;
      let no =
        <div
          style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
          onClick={this.clickImg} className={this.state.origClass}
          id='no'
          level={data[randomRound[this.state.currentRound]].level}
        >
          <img src={data[randomRound[this.state.currentRound]].no} alt="" />
        </div>

      let first, second;

      if (Math.random() > 0.5) {
        first = yes;
        second = no;
      } else {
        first = no;
        second = yes;
      }

      content =
        <div>
          <div className="gameContainer" id={randomRound[this.state.currentRound]}  >
            {first}
            {second}
          </div>

          <div
            className="messageContainer"
            style={this.state.isClicked ? { display: 'flex' } : { display: 'none' }}
          >
            <div className="result">
              <img
                src={
                  this.state.isCorrect
                    ? this.state.yesImg
                    : this.state.noImg
                }
              />
            </div>
            <div className="message">{data[randomRound[this.state.currentRound]].reason}</div>
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

          <div className="progressContainer">
            <div className="progressBack">
              <div className="progressFront"
                style={this.state.progressBar >= 300 ? { borderRadius: '14px', width: `${this.state.progressBar}px` } : { width: `${this.state.progressBar}px` }}
              ></div>
              <div className="progressNumber">
                {data[randomRound[this.state.currentRound]].level} {this.state.currentRound + 1}/{randomRound.length}
              </div>
            </div>
          </div>

        </div>

    } else {
      content = <div>...</div>
    }

    return (
      <div>
        <div>{this.props.hello}</div>
        <div>current round: {this.state.currentRound + 1}</div>
        <div>current score: {this.state.score}</div>
        {content}
      </div>
    );
  }
}

export default Game;
