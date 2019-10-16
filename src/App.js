import React, { Component } from 'react';
// import dotenv from 'dotenv';
import firebase from 'Firebase';
import '@firebase/firestore';
import firebaseConfig from '../firebaseConfig';
import { Route, BrowserRouter } from 'react-router-dom';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import GameContextProvider, { GameContext } from './contexts/GameContext';
import Intro from './component/Intro';
import Game from './component/Game';
import Result from './component/Result';

// dotenv.config();

// const firebaseConfig = {
// 	apiKey: process.env.apiKey,
// 	authDomain: process.env.authDomain,
// 	databaseURL: process.env.databaseURL,
// 	projectId: process.env.projectId,
// 	storageBucket: process.env.storageBucket,
// 	messagingSenderId: process.env.messagingSenderId,
// 	appId: process.env.appId
// };

firebase.initializeApp(firebaseConfig);

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<ThemeContextProvider>
					<GameContextProvider>
						<ThemeContext.Consumer>
							{(context) => {
								const { isLightTheme, light, dark } = context;
								const theme = isLightTheme ? light : dark;
								return (
									<main className="main" style={{ backgroundColor: theme.bg, color: theme.font }}>
										<Route exact path="/" component={Intro} />
										<Route path="/game" component={Game} />
										<Route path="/result" component={Result} />
									</main>
								);
							}}
						</ThemeContext.Consumer>
					</GameContextProvider>
				</ThemeContextProvider>
			</BrowserRouter>
		);
	}
}

export default App;
