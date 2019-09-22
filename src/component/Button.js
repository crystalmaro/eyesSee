import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Route, Router, BrowserRouter, NavLink } from 'react-router-dom';
import Result from './Result';

class Button extends Component {
	render() {
		return (
			// <BrowserRouter>
			<GameContext.Consumer>
				{(context) => {
					const {
						compareMouseDown,
						compareMouseUp,
						compareClass,
						clickNext,
						isResultReady,
						isClicked
					} = context;
					return (
						<div className="buttonContainer">
							<div
								onMouseDown={compareMouseDown}
								onTouchStart={compareMouseDown}
								onMouseUp={compareMouseUp}
								onTouchEnd={compareMouseUp}
								className={compareClass}
							>
								COMPARE
							</div>
							<div onClick={clickNext} className={isClicked ? 'button isClicked' : 'button'}>
								{isResultReady ? (
									<NavLink to="/result">
										<strong>RESULT</strong>
									</NavLink>
								) : (
									'NEXT'
								)}
							</div>
						</div>
					);
				}}
			</GameContext.Consumer>
			// </BrowserRouter>
		);
	}
}

export default Button;
