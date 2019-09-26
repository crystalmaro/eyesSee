/* eslint-disable */
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
	static contextType = ThemeContext;
	render() {
		const { toggleTheme, isLightTheme } = this.context;
		return (
			<div className="theme" onClick={toggleTheme}>
				<div style={isLightTheme ? null : { marginLeft: '20px' }}>
					<img src={isLightTheme ? './imageStock/star.png' : './imageStock/sun.png'} />
				</div>
			</div>
		);
	}
}

export default ThemeToggle;
