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
							<div className="introLogo">
								<img src={theme.logo} />
							</div>

							<div className="introContainer">
								<div>
									<div>WHY</div>
									<section>
										today is thursday but it feels like a wednesday, it's mainly because, actually
										no because time just flies and it's crazy
									</section>
								</div>

								<div>WHAT</div>
								<div>WHERE / INSPO</div>
							</div>

							<div>
								<ThemeToggle />
								{/* <NavLink to="/tutorial">Tutorial</NavLink> */}
								{/* <Tutorial /> */}
								<NavLink to="/game">Game</NavLink>
							</div>
						</main>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
