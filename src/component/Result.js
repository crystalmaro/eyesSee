/* eslint-disable */
import React, { Component } from 'react';
import '../css/result.css';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { GameContext } from '../contexts/GameContext';

class Result extends Component {
	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					const { currentScore, ranking, rankingMsg, globalRankingArray, getSeconds, getMinutes } = context;

					return (
						<React.Fragment>
							<div className="resultMain">
								<div>
									<img src="./imageStock/595959.png" />
								</div>
								<div>Score: {currentScore}</div>
								<div>Rank: top {ranking}%</div>
								<div>(Among {globalRankingArray.length + 1} eyes)</div>
								<div> {rankingMsg} </div>
								{/* <div>
									Time: {getMinutes()}:{getSeconds()}
								</div> */}
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
