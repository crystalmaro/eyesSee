/* eslint-disable */
import React, { Component } from 'react';
import '../css/result.css';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { GameContext } from '../contexts/GameContext';

class Result extends Component {
	state = {
		shareURL: 'https://creeeyessee.web.app'
	};

	render() {
		return (
			<GameContext.Consumer>
				{(context) => {
					console.log(context);

					const { currentScore, ranking, rankingMsg, globalScoreArray } = context;

					return (
						<div className="resultContainer">
							<div className="resultMain">
								<div>
									<img src="./imageStock/595959.png" />
								</div>
								<div>Score: {currentScore}</div>
								<div>Rank: top {ranking}%</div>
								<div>(among {globalScoreArray.length + 1} eyes)</div>
								<div> {rankingMsg} </div>
								<FacebookShareButton url={this.state.shareURL}>
									<FacebookIcon size={60} borderRadius={10} />
								</FacebookShareButton>
							</div>
							<div className="resultFooter">
								<div>
									Developed by <a href="#">Crystal Wang</a>
								</div>
							</div>
						</div>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

export default Result;
