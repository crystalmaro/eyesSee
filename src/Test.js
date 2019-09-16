/* eslint-disable */
import React, { Component } from 'react';
// import { Facebook } from 'react-sharingbuttons';
// import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import { FacebookShareButton, FacebookIcon } from 'react-share';

class Test extends Component {
	state = {
		shareURL: 'https://creeeyessee.web.app'
	};

	render() {
		return (
			<div className="resultContainer">
				<div className="resultBackground" />
				<div className="resultMain">
					<div>eyesSee</div>
					<div>Score: 0000</div>
					<div>Ranking: top 90% (among 100 eyes)</div>
					<div>You need to get yours eyes checked</div>
					<FacebookShareButton url={this.state.shareURL}>
						<FacebookIcon size={60} borderRadius={10} />
					</FacebookShareButton>
				</div>
				<div className="resultFooter">
					<div>Developed by Crystal Wang</div>
				</div>
			</div>
		);
	}
}

export default Test;
