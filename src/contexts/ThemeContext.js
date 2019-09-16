import React, { createContext, Component } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
	state = {
		isLightTheme: true,
		light: { font: '#595959', bg: '#eef2f3', ui: '#ffb7b0' },
		dark: { font: '#eef2f3', bg: '#595959', ui: 'green' }
	};
	toggleTheme = () => {
		this.setState({ isLightTheme: !this.state.isLightTheme });
	};
	render() {
		return (
			<ThemeContext.Provider
				value={{
					...this.state,
					toggleTheme: this.toggleTheme
				}}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeContextProvider;
