import React, { Component } from 'react';
import { GameContext } from './Game';
import { Route, NavLink } from 'react-router-dom';
import Result from './Result';

class Button extends Component {
  render() {
    return (
      <GameContext.Consumer>
        {(context) => {
          const { compareMouseDown, compareMouseUp, compareClass, clickNext, isResultReady } = context;
          return (
            <div className='buttonContainer'>
              <div
                onMouseDown={compareMouseDown}
                onTouchStart={compareMouseDown}
                onMouseUp={compareMouseUp}
                onTouchEnd={compareMouseUp}
                className={compareClass}
              >
                COMPARE
              </div>
              <div onClick={clickNext} className='button'>
                {isResultReady ? <NavLink to='/result'>RESULT</NavLink> : 'NEXT'}
              </div>
              <Route path='/result' component={Result} />
            </div>
          )
        }}
      </GameContext.Consumer>
    )
  }
}

export default Button;