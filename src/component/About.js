import React, { Component } from 'react';
import '../css/about.css';

class About extends Component {
	render() {
		return (
			<div className="aboutContainer">
				<div className="aboutCard">
					<div className="aboutImg">
						<img className="leftImg" src="./imageStock/browser.png" />
					</div>
					<div className="aboutText">
						<div>
							Don't say you're sensitive about UI, until you have aced this. Don't say you understand the
							pain of an UI Designer and a Front-end Developer, until you've noticed all the details.
						</div>
						<div>
							This project is mainly inspired by the widely-known{' '}
							<a className="cantUnsee" href="https://cantunsee.space/">
								Can't Unsee
							</a>.
						</div>
						<div>
							It provides further educational purpose, to heighten design sensibility and literacy to user
							interface.
						</div>
					</div>
				</div>
				<div className="aboutCard">
					<div className="aboutImg">
						<img className="leftImg" src="./imageStock/web-development.png" />
					</div>
					<div className="aboutText">
						<div>We are a small team from around the globe, including Me, Myself and I.</div>
						<div>
							Me is a California girl, who loves the Mexican food in Lala Land, and let's not forget about
							In-N-Out.
						</div>
						<div>
							Myself is a foodie who often makes Taiwan the first stop of her Asia itinerary, because why
							not.
						</div>
						<div>
							I is a New Yorker, who immerses herself in art museums and Broadway musicals till the night
							sleeps.
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
