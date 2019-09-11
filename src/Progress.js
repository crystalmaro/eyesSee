/* eslint-disable */
import React, { Component } from 'react';
// import './css/progress.css';

class Progress extends Component {
  render() {
    return (
      <div className="progressContainer">
        <div className="progressBack">
          <div className="progressFront"
            style={this.props.progressBar >= 300 ? { borderRadius: '14px', width: `${this.props.progressBar}px` } : { width: `${this.props.progressBar}px` }}
          ></div>
          <div className="progressNumber">
            {this.props.imgData[this.props.randomRound[this.props.currentRound]].level} {this.props.currentRound + 1}/{this.props.randomRound.length}
          </div>
        </div>
      </div>
    );
  }
}

export default Progress;
