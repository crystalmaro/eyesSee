/* eslint-disable */
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
	static contextType = ThemeContext;
	render() {
		const { toggleTheme, isLightTheme } = this.context;
		return (
			<div className="theme" onClick={toggleTheme}>
				<img src={isLightTheme ? './imageStock/cartoon-happy-eyes.png' : './imageStock/two-eyelashes.png'} />
			</div>
		);
	}
}

export default ThemeToggle;
