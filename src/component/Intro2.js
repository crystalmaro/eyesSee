import React, { Component } from 'react';
import ThemeToggle from './ThemeToggle';
import Tutorial from './Tutorial';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import '../css/intro.css';

class Intro extends Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<main>
							{/* <div className="introLogo">
								<img src={theme.logo} />
							</div> */}

							<div className="introTop">
								<div className="introTopFirst">
									<div>
										<img src="./imageStock/595959.png" />
									</div>
								</div>
								<div className="introTopSecond">
									<div>Let's take your design sensitivity to the next level</div>
									<div>Train your artistic sensibility and literacy.</div>
									<div>
										<NavLink to="/tutorial">Tutorial</NavLink>
										<NavLink to="/game">Game</NavLink>
									</div>
								</div>
							</div>

							<div className="introContainer">
								<div className="introCard">
									<div className="introCardTitle">WHY</div>
									<section>
										<div>placeholder text</div>
										{/* <div>Design and User Interface can sometimes be overlooked.</div>
										<div>The objective is to put emphasis on the devil in detail.</div> */}
									</section>
								</div>

								<div className="introCard">
									<div className="introCardTitle">WHAT</div>
									<section>
										<div>placeholder text</div>
										{/* <div>
											Raise awareness and appreciation to UI/UX Designers and Front-end
											Developers.
										</div>
										<div>Strengthen design literacy and sensitivity</div> */}
									</section>
								</div>
							</div>
						</main>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
