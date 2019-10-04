/* eslint-disable */
import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import '../css/result.css';
// import Confetti from 'react-confetti';
import Confetti from 'react-dom-confetti';

class Result extends Component {
	config = {
		angle: 90,
		spread: 45,
		startVelocity: 45,
		elementCount: 50,
		dragFriction: 0.1,
		duration: 3000,
		stagger: 0,
		width: '10px',
		height: '10px',
		colors: [ '#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a' ]
	};
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { currentScore, ranking, rankingMsg, globalRankingArray, getSeconds, getMinutes } = context;

					return (
						<React.Fragment>
							<Confetti active={true} config={this.config} />
							<div className="resultMain">
								<div>
									<img src="./imageStock/595959.png" />
								</div>
								<div>Score: {currentScore}</div>
								<div>Rank: top {ranking}%</div>
								<div>(Among {globalRankingArray.length + 1} eyes)</div>
								<div> {rankingMsg} </div>
								<FacebookShareButton url="https://creeeyessee.web.app">
									<FacebookIcon size={60} borderRadius={10} />
								</FacebookShareButton>
							</div>
							<div className="resultFooter">
								Developed by <a href="https://www.linkedin.com/in/crystalwang8/">Crystal Wang</a>
							</div>
						</React.Fragment>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Result;
