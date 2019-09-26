import React, { Component } from 'react';
import ThemeToggle from './ThemeToggle';
import Tutorial from './Tutorial';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

class Intro extends Component {
	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<main>
							<header style={{ border: '2px solid blue' }}>
								<div className="logo">
									<img src={theme.logo} />
								</div>
								<div>
									<ThemeToggle />
									<NavLink to="/tutorial">Tutorial</NavLink>
									<NavLink to="/game">Game</NavLink>
								</div>
							</header>

							<div style={{ border: '2px solid red' }}>
								<ol>
									<li>why do i do this (main objective)</li>
									<li>inspiration</li>
									<li>what i want to acheive</li>
								</ol>
							</div>
						</main>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
