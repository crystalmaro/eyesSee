import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Route, Router, BrowserRouter, NavLink, Link } from 'react-router-dom';
import Result from './Result';

class Button extends Component {
	render() {
		return (
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
						<div className="buttonContainer" style={isClicked ? { display: 'flex' } : { display: 'none' }}>
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
									<Link to="/result">
										<strong>RESULT</strong>
									</Link>
								) : (
									'NEXT'
								)}
							</div>
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Button;
