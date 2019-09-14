/* eslint-disable */
import React, { Component } from 'react';
// import '../css/progress.css';
import { GameContext } from './Game';

class Progress extends Component {
  render() {
    return (
      <GameContext.Consumer>
        {(context) => {
          const { currentRound, progressBar, imgData, randomRound } = context;
          return (
            <div className='progressContainer'>
              <div className='progressBack'>
                <div className='progressFront'
                  style={progressBar >= 300 ? { borderRadius: '14px', width: `${progressBar}px` } : { width: `${progressBar}px` }}
                />
                <div className='progressNumber'>
                  {imgData[randomRound[currentRound]].level} {currentRound + 1} / {randomRound.length}
                </div>

              </div>
            </div>
          )
        }}
      </GameContext.Consumer>
    )
  }
}

export default Progress;
