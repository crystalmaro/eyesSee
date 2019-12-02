import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

class Card extends Component {
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { clickImg, yesOnTop, origClass, currentRound, imgData, randomRound } = context;
					let first;
					let second;

					const yes = (
						<div
							onClick={clickImg}
							style={yesOnTop ? { zIndex: 1 } : null}
							className={origClass}
							id="yes"
							level={imgData[randomRound[currentRound]].level}
						>
							<img src={`${imgData[randomRound[currentRound]].yes}`} alt="" />
						</div>
					);

					const no = (
						<div
							onClick={clickImg}
							style={yesOnTop ? null : { zIndex: 1 }}
							className={origClass}
							id="no"
							level={imgData[randomRound[currentRound]].level}
						>
							<img src={imgData[randomRound[currentRound]].no} alt="" />
						</div>
					);

					switch (Math.random() > 0.5) {
						case true:
							first = yes;
							second = no;
							break;
						case false:
							first = no;
							second = yes;
							break;
					}

					return (
						<div className="gameContainer" id={randomRound[currentRound]}>
							{first}
							{second}
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Card;
