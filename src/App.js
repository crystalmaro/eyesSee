import React, { Component } from 'react';
import Intro from './component/Intro';
import Game from './component/Game';
import Result from './component/Result';
import { Header, ThemeToggle } from './component/Header';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
// import firebaseConfig from 'firebase';
import firebase from 'Firebase';
import '@firebase/firestore';
import { Route, Router, BrowserRouter, NavLink } from 'react-router-dom';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import GameContextProvider, { GameContext } from './contexts/GameContext';

import Test from './Test';

const firebaseConfig = {
	apiKey: 'AIzaSyD852w_vKRpGPs-0YJKStVWsh0PggZCsZ8',
	authDomain: 'cwtest0807.firebaseapp.com',
	databaseURL: 'https://cwtest0807.firebaseio.com',
	projectId: 'cwtest0807',
	storageBucket: 'cwtest0807.appspot.com',
	messagingSenderId: '804525394189',
	appId: '1:804525394189:web:43ae193bcc8257fe'
};

firebase.initializeApp(firebaseConfig);

class App extends Component {
	state = {
		// ===== Firebase imageStock data
		imgData: [], // all data loaded from firebase
		totalRound: [], // array of number 0 - 19
		randomRound: [], // randomized EasyRound, followed by randomize HardRound
		// ===== NEW Firebase masterScore data (ARRAY)
		globalScoreArray: []
	};

	render() {
		return (
			// <FirebaseDatabaseProvider firebase={firebase}>
			<BrowserRouter>
				<ThemeContextProvider>
					<GameContextProvider>
						<ThemeContext.Consumer>
							{(context) => {
								//  theme switching re-set all states in GAME
								const { isLightTheme, light, dark } = context;
								const theme = isLightTheme ? light : dark;
								return (
									<div className="main" style={{ backgroundColor: theme.bg, color: theme.font }}>
										<Route exact path="/" component={Intro} />
										<Route path="/game" component={Game} />
										<Route path="/result" component={Result} />
									</div>
								);
							}}
						</ThemeContext.Consumer>
					</GameContextProvider>
				</ThemeContextProvider>
			</BrowserRouter>

			// </FirebaseDatabaseProvider>
		);
	}
}

export default App;
