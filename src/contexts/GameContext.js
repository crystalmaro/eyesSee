import React, { createContext, Component } from 'react';
import firebase from 'Firebase';
import '@firebase/firestore';

export const GameContext = createContext();

class GameContextProvider extends Component {
	state = {
		origClass: 'imgBox',
		compareClass: 'button',
		scoreClass: 'score',
		isClicked: false,
		yesOnTop: true,
		isCorrect: true,
		yesImg: './imageStock/yes.png',
		noImg: './imageStock/no.png',
		currentRound: 0,
		currentScore: 0,
		progressBar: 0,
		isResultReady: false,
		ranking: 0,
		rankingMes: '',
		// ===== Firebase imageStock data
		imgData: [], // all data loaded from firebase
		totalRound: [], // array of number 0 - 19
		randomRound: [], // randomized EasyRound, 1 followed by randomize HardRound
		// ===== Firebase masterScore data
		globalScoreArray: [],
		timer: 0,
		isTimerOn: true
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
		db.collection('imageStock').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// 1. load and save firebase data into state
				let imgData = [ ...this.state.imgData, doc.data() ];
				// 2. generate a number array for the length of this.state.imgData
				let totalRound = [ ...this.state.totalRound, this.state.imgData.length ];
				this.setState({ imgData, totalRound });
			});
			// 3. slice() returns a new array, without mutating the original
			let totalEasyRound = this.state.totalRound.slice(0, 10);
			let totalHardRound = this.state.totalRound.slice(10);
			// 4.0 generate randomized index order for array

			if (this.state.randomRound.length < 20) {
				// 4.1 - EASY
				for (let a = totalEasyRound, i = a.length; i--; ) {
					let randomRound = [
						...this.state.randomRound,
						a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
					];
					this.setState({ randomRound });
				}
				// 4.2 - HARD
				for (let a = totalHardRound, i = a.length; i--; ) {
					let randomRound = [
						...this.state.randomRound,
						a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
					];
					this.setState({ randomRound });
				}
			}
			console.log(this.state.randomRound);
		});
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		this.setState({ isTimerOn: false });
		// 1. overlap both images & show current round answer
		this.overlapImages(e);
		// 2. decide which image on top & decide current round answer
		this.checkImage(e);
		// 3. scorekeeping
		this.addScore(e);
		// 4. progress bar incrementation
		this.addProgressBar(e);
		// 5. NEXT button changes to RESULT on last round, after image selection
		if (this.state.currentRound == this.state.randomRound.length - 1) {
			this.setState({ isResultReady: true });
			// if (this.state.isResultReady) {
			this.calculateRanking(e);
			// }
		}
	};
	overlapImages = (e) => {
		this.setState({
			origClass: 'imgBox clicked',
			isClicked: true,
			compareClass: 'button isClicked'
		});
	};
	checkImage = (e) => {
		switch (e.target.parentNode.id) {
			case 'no':
				this.setState({
					yesOnTop: false,
					isCorrect: false
				});
				break;
			case 'yes':
				this.setState({
					yesOnTop: true,
					isCorrect: true,
					scoreClass: 'score yes'
				});
				break;
		}
	};
	addScore = (e) => {
		if (e.target.parentNode.id == 'yes' && !this.state.isClicked) {
			switch (e.target.parentNode.getAttribute('level')) {
				case 'Easy':
					this.setState((preState) => {
						return { currentScore: preState.currentScore + 100 };
					});
					break;
				case 'Hard':
					this.setState((preState) => {
						return { currentScore: preState.currentScore + 150 };
					});
					break;
			}
		}
	};
	addProgressBar = (e) => {
		// TODO change progressBar width from px to %
		if (!this.state.isClicked && this.state.progressBar < 100) {
			this.setState((preState) => {
				return { progressBar: preState.progressBar + 100 / 20 };
			});
		}
	};
	calculateRanking = (e) => {
		// 1. calculate accuracy rate
		let point = Math.round(this.state.currentScore / 3000 * 100);
		// 2. add current score into array
		let newArr = this.state.globalScoreArray.slice();
		newArr.push(point);
		// 3. sort the array in descending order
		newArr.sort(function(a, b) {
			return b - a;
		});
		// 4. final score = arr.indexOf(percentage) / arr.length
		let index = Number(newArr.indexOf(point)) + 1;
		let ranking = Math.round(index / newArr.length * 100);
		console.log('rank:' + ranking);
		switch (true) {
			case 0 < ranking < 10:
				var rankingMsg = "Here's the Golden Ticket to join my developing team!";
				break;
			case 10 < ranking < 20:
				var rankingMsg = "My grandma's eyes are better than yours, just saying.";
				break;
			case 20 < ranking < 40:
				var rankingMsg = 'You need to get your eyes checked, like seriously.';
				break;
			case 40 < ranking < 60:
				var rankingMsg = 'Might as well donate your eyes.';
				break;
			case 60 < ranking < 80:
				var rankingMsg = 'Do you think this is a guessing game, hun?!';
				break;
			case 80 < ranking < 100:
				var rankingMsg = "Excellent job!! (No, not really you're horrible)";
				break;
			default:
				var rankingMsg = 'Play again!';
		}
		// 5. save the ranking to state, and pass the ranking to <Result />
		this.setState({
			ranking,
			rankingMsg
		});
		// 6. save the newly updated array back to firebase
		const db = firebase.firestore();
		return db.collection('masterScore').doc('scoreInfo').set({
			scoreData: newArr
		});
	};

	// ============================
	// UI events - click next
	// ============================
	clickNext = (e) => {
		this.resetRound(e);
		this.setState({ isTimerOn: true });
	};
	resetRound = (e) => {
		if (this.state.isClicked) {
			switch (this.state.currentRound == this.state.currentRound.length - 1) {
				case false:
					this.setState(
						(preState) => {
							// increment current round count
							return { currentRound: preState.currentRound + 1 };
						},
						() => {
							this.setState({
								// reset state for the next round
								origClass: 'imgBox',
								isClicked: false,
								yesOnTop: true,
								isCorrect: true,
								compareClass: 'button',
								scoreClass: 'score'
							});
							// console.log('inside : ' + this.state.currentRound);
						}
					);
					// console.log('outside : ' + this.state.currentRound);

					break;
				// case true:
				// 	break;
			}
			return;
		}
	};

	// ============================
	// UI events - click compare
	// ============================
	compareMouseDown = (e) => {
		if (this.state.isClicked) {
			this.setState({ compareClass: 'button compare' });
			switch (this.state.yesOnTop) {
				case true:
					this.setState({ yesOnTop: false, isCorrect: false });
					break;
				case false:
					this.setState({ yesOnTop: true, isCorrect: true });
					break;
			}
		}
	};
	compareMouseUp = (e) => {
		if (this.state.isClicked) {
			this.setState({ compareClass: 'button isClicked' });
			switch (this.state.yesOnTop) {
				case true:
					this.setState({ yesOnTop: false, isCorrect: false });
					break;
				case false:
					this.setState({ yesOnTop: true, isCorrect: true });
					break;
			}
		}
	};
	// ============================
	// timer - stopwatch
	// ============================
	// ! below is reserved for Stopwatch (class component)
	// ! but running the timer every second,
	// ! changes the state within GameContext,
	// ! when <Game> detects changes within render/return
	// ! as being wrapped by <GameContext.Consumer>
	// ! it re-renders and re-run the random function within <Card>
	getSeconds = () => {
		return ('0' + this.state.timer % 60).slice(-2);
	};
	getMinutes = () => {
		return Math.floor(this.state.timer / 60);
	};
	setTimer = () => {
		this.setState((preState) => {
			return { timer: preState.timer + 1 };
		});
	};

	render() {
		return (
			<GameContext.Provider
				value={{
					...this.state,
					clickImg: this.clickImg,
					compareMouseDown: this.compareMouseDown,
					compareMouseUp: this.compareMouseUp,
					clickNext: this.clickNext,
					loadFirebase: this.loadFirebase,
					getSeconds: this.getSeconds,
					getMinutes: this.getMinutes,
					setTimer: this.setTimer
				}}
			>
				{this.props.children}
			</GameContext.Provider>
		);
	}
}

export default GameContextProvider;
