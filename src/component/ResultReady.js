import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

export default class ResultReady extends Component {
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { isResultReady } = context;
					return (
						<div
							className="helloResult"
							style={isResultReady ? { display: 'inline-block' } : { display: 'none' }}
						>
							Great job! Result calculating...
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}
