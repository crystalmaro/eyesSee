/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

class Button extends Component {
  render() {
    return (
      <GameContext.Consumer>
        {context => {
          const {
            compareMouseDown,
            compareMouseUp,
            compareClass,
            clickNext,
            isResultReady,
            isClicked,
          } = context;
          return (
            <>
              <div
                className="helloResult"
                style={
                  isResultReady
                    ? { display: 'inline-block' }
                    : { display: 'none' }
                }
              >
                Great job! Result calculating...
              </div>
              <div
                className="buttonContainer"
                style={isClicked ? { display: 'flex' } : { display: 'none' }}
              >
                <div
                  onMouseDown={compareMouseDown}
                  onTouchStart={compareMouseDown}
                  onMouseUp={compareMouseUp}
                  onTouchEnd={compareMouseUp}
                  className={compareClass}
                >
                  COMPARE
                </div>
                <div
                  onClick={clickNext}
                  className={isClicked ? 'button isClicked' : 'button'}
                >
                  {isResultReady ? (
                    <Link to="/result">
                      <strong>RESULT</strong>
                    </Link>
                  ) : (
                    'NEXT'
                  )}
                </div>
              </div>
            </>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

export default Button;
