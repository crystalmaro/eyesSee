import React, { Component } from 'react';
import Intro from './component/Intro';
import Game from './component/Game';
import { Header, ThemeToggle } from './component/Header';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
// import firebaseConfig from 'firebase';
import firebase from 'Firebase';
import '@firebase/firestore';
import { Route, Router, BrowserRouter, NavLink } from 'react-router-dom';
import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';

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

	// ============================
	// load firebase data - masterScore & imageStock
	// ============================
	loadFirebase = (e) => {
		const db = firebase.firestore();
		// ===== masterScore
		db.collection('masterScore').doc('scoreInfo').get().then((doc) => {
			if (doc.exists) {
				// let obj = doc.data();
				// for (const key in obj) {
				// 	console.log(`${key} -> ${obj[key]}`);
				// }

				this.setState({
					// ===== NEW Firebase masterScore data (ARRAY)
					globalScoreArray: doc.data().scoreData.sort(function(a, b) {
						return b - a;
					})
				});
			}
		});

		// ===== imageStock
		db
			.collection('imageStock')
			// .where("level", "==", "easy")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// load and save firebase data into state
					let imgData = [ ...this.state.imgData, doc.data() ];
					// generate a number array for the length of this.state.imgData
					let totalRound = [ ...this.state.totalRound, this.state.imgData.length ];
					this.setState({ imgData, totalRound });
				});
				let totalEasyRound = this.state.totalRound.slice(0, 10);
				let totalHardRound = this.state.totalRound.slice(10);
				// this.setState({ totalEasyRound, totalHardRound })
				// randomly generate numbers without repetition - EASY
				for (let a = totalEasyRound, i = a.length; i--; ) {
					let randomRound = [
						...this.state.randomRound,
						a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
					];
					this.setState({ randomRound });
				}
				// randomly generate numbers without repetition - HARD
				for (let a = totalHardRound, i = a.length; i--; ) {
					let randomRound = [
						...this.state.randomRound,
						a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
					];
					this.setState({ randomRound });
				}
				console.log(this.state.randomRound);
				// console.log(this.state.imgData);
			});
	};
	componentDidMount() {
		this.loadFirebase();
	}

	render() {
		return (
			// <FirebaseDatabaseProvider firebase={firebase}>
			<BrowserRouter>
				<ThemeContextProvider>
					<ThemeContext.Consumer>
						{(context) => {
							// ! theme switching re-set all states in GAME
							const { isLightTheme, light, dark } = context;
							const theme = isLightTheme ? light : dark;
							return (
								<div className="main" style={{ backgroundColor: theme.bg, color: theme.font }}>
									<header>
										<div>
											<NavLink exact to="/">
												Intro
											</NavLink>
											<NavLink to="/game">Game</NavLink>
										</div>
										<ThemeToggle />
									</header>

									<Route exact path="/" component={Intro} />
									<Route
										path="/game"
										component={(props) => (
											<Game
												{...props}
												imgData={this.state.imgData}
												randomRound={this.state.randomRound}
												globalScoreArray={this.state.globalScoreArray}
											/>
										)}
									/>

									{/* <Header /> */}
									{/* <Test /> */}

									{/* <Game
							imgData={this.state.imgData}
							randomRound={this.state.randomRound}
							globalScoreArray={this.state.globalScoreArray}
						/> */}
								</div>
							);
						}}
					</ThemeContext.Consumer>
				</ThemeContextProvider>
			</BrowserRouter>
			// </FirebaseDatabaseProvider>
		);
	}
}

export default App;
