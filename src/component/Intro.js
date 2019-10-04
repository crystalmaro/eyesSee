import React, { Component } from 'react';
import ThemeToggle from './ThemeToggle';
import Tutorial from './Tutorial';
import About from './About';
import { Route, BrowserRouter, NavLink, Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import '../css/intro.css';
import 'intro.js/introjs.css';
import '../css/tutorial.css';
import '../css/about.css';

class Intro extends Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark, toggleTutorial } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<React.Fragment>
							<div className="introTop">
								<section className="introTopFirst">
									<div>
										<img className="introLogo" src="./imageStock/595959.png" />
									</div>
								</section>
								<section className="introTopSecond">
									<div className="selectOff">
										Let's take your design sensitivity to the next level
									</div>
									<div className="selectOff">Train your artistic sensibility and literacy.</div>
									<div>
										<div className="tutorialButton selectOff" onClick={toggleTutorial}>
											Tutorial
										</div>
										<Link to="/game">Game</Link>
									</div>
								</section>
							</div>
							<Tutorial />
							<About />
							<footer className="introFooter">
								Copyright &copy; 2019 Crystal Wang. All rights reserved.
							</footer>
						</React.Fragment>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
