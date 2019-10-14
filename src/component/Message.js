/* eslint-disable */
import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

class Message extends Component {
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const {
						isClicked,
						isCorrect,
						yesImg,
						noImg,
						currentRound,
						imgData,
						randomRound,
						isResultReady
					} = context;
					return (
						<div className="messageContainer" style={isClicked ? { display: 'flex' } : { display: 'none' }}>
							<div className="result">
								<img src={isCorrect ? yesImg : noImg} />
								<div className="message">{imgData[randomRound[currentRound]].reason}</div>
							</div>
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Message;
