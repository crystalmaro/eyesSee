/* eslint-disable */
import React, { Component } from 'react';
// import './css/message.css';
import { GameContext } from './Game';

class Message extends Component {
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { isClicked, isCorrect, yesImg, noImg, imgData, randomRound, currentRound } = context;
					return (
						<div className="messageContainer" style={isClicked ? { display: 'flex' } : { display: 'none' }}>
							<div className="result">
								<img src={isCorrect ? yesImg : noImg} />
								<div className="message">{imgData[randomRound[currentRound]].reason}</div>
							</div>
							{/* <div>
                Click and hold <span>COMPARE</span> to compare
              </div> */}
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Message;
