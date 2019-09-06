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
    data: [], // complete data loaded from firebase
    totalRound: [], // array of number 0 - 19
    totalEasyRound: [], // totalRound index 0 - 9
    totalHardRound: [], // totalRound index 10 - 19
    randomRound: [], // randomized EasyRound, followed by randomize HardRound
    currentRound: 0,
    score: 0,
    progressBar: 0,
    isYes: 'yes'
  };


  // ============================
  // load firebase data
  // ============================
  loadFirebase = e => {
    const db = firebase.firestore();
    db.collection("imageStock")
      // .where("level", "==", "easy")
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // load and save firebase data into state
          let data = [...this.state.data, doc.data()]
          // generate a number array for the length of this.state.data
          let totalRound = [...this.state.totalRound, this.state.data.length]
          this.setState({ data, totalRound });
        });
        let totalEasyRound = this.state.totalRound.slice(0, 10)
        let totalHardRound = this.state.totalRound.slice(10)
        this.setState({ totalEasyRound, totalHardRound })
        // randomly generate numbers without repetition - EASY
        for (let a = this.state.totalEasyRound, i = a.length; i--;) {
          let randomRound = [...this.state.randomRound, a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]];
          this.setState({ randomRound })
        }
        // randomly generate numbers without repetition - HARD
        for (let b = this.state.totalHardRound, i = b.length; i--;) {
          let randomRound = [...this.state.randomRound, b.splice(Math.floor(Math.random() * (i + 1)), 1)[0]];
          this.setState({ randomRound })
        }
        console.log(this.state.randomRound);
      });
  };

  componentDidMount() {
    this.loadFirebase();
  }
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
    let dt = this.state.data;

    if (this.state.randomRound.length >= 20) {

      let yes =
        <div
          style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
          onClick={this.clickImg} className={this.state.origClass}
          id='yes'
          level={dt[this.state.randomRound[this.state.currentRound]].level}
        >
          <img src={dt[this.state.randomRound[this.state.currentRound]].yes} alt="" />
        </div>;

      let no =
        <div
          style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
          onClick={this.clickImg} className={this.state.origClass}
          id='no'
          level={dt[this.state.randomRound[this.state.currentRound]].level}
        >
          <img src={dt[this.state.randomRound[this.state.currentRound]].no} alt="" />
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
          <div className="gameContainer" id={this.state.randomRound[this.state.currentRound]} >
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
            <div className="message">{dt[this.state.randomRound[this.state.currentRound]].reason}</div>
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
                {dt[this.state.randomRound[this.state.currentRound]].level} {this.state.currentRound + 1}/{this.state.randomRound.length}
              </div>
            </div>
          </div>

        </div>

    } else {
      content = <div>...</div>
    }

    return (
      <div>
        <div>current round: {this.state.currentRound + 1}</div>
        <div>current score: {this.state.score}</div>
        {content}
      </div>
    );
  }
}

export default Game;
