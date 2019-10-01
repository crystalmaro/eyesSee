/* eslint-disable */

import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

class Progress extends Component {
	// const Progress = () => {
	// const { currentRound, progressBar } = useContext(GameContext);

	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { progressBar, currentRound, imgData, randomRound } = context;
					return (
						<div className="progressContainer selectOff">
							<div className="progressBack">
								<div
									className="progressFront"
									style={
										progressBar !== 0 ? progressBar >= 97 ? (
											{ borderRadius: '14px', width: `${progressBar}%` }
										) : (
											{ width: `${progressBar}%` }
										) : (
											{ width: '2%' }
										)
									}
								/>
								<div className="progressNumber">
									{imgData[randomRound[currentRound]].level} {currentRound + 1} / {randomRound.length}
								</div>
							</div>
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Progress;
