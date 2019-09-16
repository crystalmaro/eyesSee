/* eslint-disable */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../css/header.css';
import firebase from 'firebase';
// import firestore from 'firestore'
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeToggle extends Component {
	static contextType = ThemeContext;
	render() {
		const { toggleTheme, isLightTheme } = this.context;
		return (
			<div className="theme" onClick={toggleTheme}>
				<div style={isLightTheme ? null : { marginLeft: '26px' }}>
					<img src={isLightTheme ? './imageStock/star.png' : './imageStock/sun.png'} />
				</div>
			</div>
		);
	}
}

class Header extends Component {
	// static contextType = ThemeContext;

	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark } = context;
					const theme = isLightTheme ? light : dark;
					return <div>hello</div>;
				}}
			</ThemeContext.Consumer>
		);
	}
}

export { Header, ThemeToggle };
