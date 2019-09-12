/* eslint-disable */
import React, { Component } from 'react';
import './css/result.css';
// import { Facebook } from 'react-sharingbuttons';
// import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import { FacebookShareButton, FacebookIcon } from 'react-share';

class Result extends Component {
	state = {
		shareURL: 'https://creeeyessee.web.app'
	};

	render() {
		// console.log(this.props.score)
		return (
			<div className="resultContainer">
				<div className="resultBackground" />
				<div className="resultMain">
					<div>eyesSee</div>
					<div>Score: {this.props.currentScore}</div>
					<div>Rank: top {this.props.ranking}%</div>
					<FacebookShareButton url={this.state.shareURL}>
						<FacebookIcon size={60} borderRadius={10} />
					</FacebookShareButton>
				</div>
				<div className="resultFooter">
					{/* <div>credits</div> */}
					<div>Developed by Crystal Wang</div>
				</div>
			</div>
		);
	}
}

export default Result;
