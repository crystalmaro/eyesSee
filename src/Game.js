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
    data: [],
    round: 0,
    score: 0
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
          let data = [...this.state.data, doc.data()]
          this.setState({ data });
        });
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
    if (e.target.parentNode.id == 'no') {
      this.setState({
        // decide which image on top
        yesOnTop: false,
        // check current round result
        isCorrect: false,
      });
    }
    // scorekeeping
    if (e.target.parentNode.id == 'yes') {
      switch (e.target.parentNode.getAttribute("level")) {
        case 'easy':
          this.setState((preState) => {
            return { score: preState.score + 3 }
          });
          break;
        case 'hard':
          this.setState((preState) => {
            return { score: preState.score + 10 }
          });
          break;
      }
    }
  };
  // ============================
  // UI events - click next
  // ============================
  clickNext = e => {
    console.log(this.state.data.length - 1)
    if (this.state.isClicked
      && this.state.round < this.state.data.length - 1) {
      this.setState({
        origClass: 'imgBox',
        isClicked: false,
        yesOnTop: true,
        isCorrect: true,
      });
      // increment round count
      this.setState((preState) => {
        return { round: preState.round + 1 }
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
    let content;
    if (this.state.data.length >= 20) {
      // console.log(this.state.data)
      content =
        <div>
          <div className="gameContainer" id={this.state.round} >
            <div
              style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
              onClick={this.clickImg} className={this.state.origClass}
              id="yes"
              level={this.state.data[this.state.round].level}
            >
              <img src={this.state.data[this.state.round].yes} alt="" />
            </div>

            <div
              style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
              onClick={this.clickImg} className={this.state.origClass}
              id="no"
              level={this.state.data[this.state.round].level}
            >
              <img src={this.state.data[this.state.round].no} alt="" />
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
                    ? this.state.yesImg
                    : this.state.noImg
                }
              />
            </div>
            <div className="message">{this.state.data[this.state.round].reason}</div>
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
              <div className="progressFront"></div>
              <div className="progressNumber">
                {this.state.data[this.state.round].level} {this.state.round + 1}/{this.state.data.length}
              </div>
            </div>
          </div>

        </div>
    } else {
      content = <div>loading</div>
    }

    return (
      <div>
        <div>current round: {this.state.round + 1}</div>
        <div>current score: {this.state.score}</div>
        {content}



      </div>
    );
  }
}

export default Game;
