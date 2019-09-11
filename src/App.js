import React, { Component } from 'react';
import Game from './Game';
import Header from './Header';
// import Game from './Game';
import Result from './Result';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import '@firebase/firestore';
import { Route, BrowserRouter } from 'react-router-dom';

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
		randomRound: [] // randomized EasyRound, followed by randomize HardRound
	};

	// ============================
	// load firebase data - imageStock
	// ============================
	loadFirebase = (e) => {
		const db = firebase.firestore();
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
			});
	};
	componentDidMount() {
		this.loadFirebase();
	}

	render() {
		return (
			<FirebaseDatabaseProvider firebase={firebase}>
				<BrowserRouter>
					<div>
						{/* <Header /> */}

						<Game imgData={this.state.imgData} randomRound={this.state.randomRound} />

						{/* <Route
							exact
							path="/"
							component={(props) => (
								<Game {...props} imgData={this.state.imgData} randomRound={this.state.randomRound} />
							)}
						/> */}

						{/* <Message /> */}
						{/* <Button /> */}

						{/* <Result /> */}
						{/* <Route path='/result' component={Result} /> */}
					</div>
				</BrowserRouter>
			</FirebaseDatabaseProvider>
		);
	}
}

export default App;
