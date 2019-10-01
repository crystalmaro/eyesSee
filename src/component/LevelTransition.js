import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

class LevelTransition extends Component {
	static contextType = GameContext;
	render() {
		const { isTransitionOn, currentRound, isClicked } = this.context;
		return (
			<div>
				<h1 style={currentRound == 10 && !isClicked ? { display: 'block' } : { display: 'none' }}>
					proceeding to hard level
				</h1>
			</div>
		);
	}
}

export default LevelTransition;
