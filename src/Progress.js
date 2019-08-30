/* eslint-disable */
import React, { Component } from 'react';
import './css/progress.css';

class Progress extends Component {
  render() {
    return (
      <div className="progressContainer">
        <div className="progressBack">
          <div className="progressFront"></div>
          <div className="progressNumber">Easy 1/10</div>
        </div>
      </div>
    );
  }
}

export default Progress;
