/* eslint-disable */

import React, { useContext } from 'react';
import { GameContext } from './Game';

const Progress = () => {
	const { currentRound, progressBar, imgData, randomRound } = useContext(GameContext);
	return (
		<div className="progressContainer">
			<div className="progressBack">
				<div
					className="progressFront"
					style={
						progressBar >= 300 ? (
							{ borderRadius: '14px', width: `${progressBar}px` }
						) : (
							{ width: `${progressBar}px` }
						)
					}
				/>
				<div className="progressNumber">
					{imgData[randomRound[currentRound]].level} {currentRound + 1} / {randomRound.length}
				</div>
			</div>
		</div>
	);
};

export default Progress;
