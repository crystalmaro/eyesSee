import React, { createContext, Component } from 'react';
import 'intro.js/introjs.css';
import '../css/tutorial.css';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
	state = {
		isLightTheme: true,
		light: { font: '#595959', bg: '#eef2f3', ui: '#ffb7b0', logo: './imageStock/595959.png' },
		dark: { font: '#eef2f3', bg: '#282c35', ui: 'green', logo: './imageStock/eef2f3.png' },
		stepsEnabled: false,
		steps: [
			{
				element: '.tutorialContainer > .gameContainer',
				intro: '🔍Please pick one.'
			},
			{
				element: '.theme',
				intro: 'Toggle eyes for different themes.'
			}
		]
	};

	// ============================
	// UI Theme
	// ============================
	toggleTheme = () => {
		this.setState({ isLightTheme: !this.state.isLightTheme });
	};

	// ============================
	// Step-by-step Guide
	// ============================
	// componentDidMount() {
	// 	introJs().start();
	// }
	onExit = () => {
		this.setState(() => ({ stepsEnabled: false }));
	};

	toggleTutorial = () => {
		this.setState(() => ({ stepsEnabled: !this.state.stepsEnabled }));
	};

	render() {
		return (
			<ThemeContext.Provider
				value={{
					...this.state,
					toggleTheme: this.toggleTheme,
					onExit: this.onExit,
					toggleTutorial: this.toggleTutorial
				}}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContextProvider;
