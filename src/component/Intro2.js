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
						<main>
							<div className="introTop">
								<div className="introTopFirst">
									<div>
										<img className="introLogo" src="./imageStock/595959.png" />
									</div>
								</div>
								<div className="introTopSecond">
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
								</div>
							</div>
							<Tutorial />
							<About />
							<div className="introFooter">Copyright &copy; 2019 Crystal Wang. All rights reserved.</div>
						</main>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
