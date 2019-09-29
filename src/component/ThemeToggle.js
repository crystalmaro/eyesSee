/* eslint-disable */
import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
	static contextType = ThemeContext;
	render() {
		const { toggleTheme, isLightTheme } = this.context;
		return (
			<div className="theme" onClick={toggleTheme}>
				{/* <div style={isLightTheme ? null : { marginLeft: '20px' }}> */}
				{/* <img src={isLightTheme ? './imageStock/star.png' : './imageStock/sun.png'} /> */}
				<img src={isLightTheme ? './imageStock/cartoon-happy-eyes.png' : './imageStock/two-eyelashes.png'} />
				{/* </div> */}
			</div>
		);
	}
}

export default ThemeToggle;
