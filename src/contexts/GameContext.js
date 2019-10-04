import React, { createContext, Component } from 'react';
import firebase from 'Firebase';
import '@firebase/firestore';

export const GameContext = createContext();

class GameContextProvider extends Component {
	state = {
    gameHeaderRight: 'gameHeaderRight',

		origClass: 'imgBox',
		compareClass: 'button',
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
		rankingMsg: 'did not set',
		// ===== Firebase imageStock data
		imgData: [], // all data loaded from firebase
		totalRound: [], // array of number 0 - 19
		randomRound: [], // randomized EasyRound, followed by randomize HardRound
		// ===== Firebase masterScore data
		globalRankingArray: [],
		// ! ===== below isnt currently being used
		timer: 10, // TODO 10 sec for testing, will be 60 on production
		isTimerOn: true,
		isTransitionOn: true
	};

	// ! ===== below isnt currently being used
	isTransitionOn = () => {
		this.setState({ isTransitionOn: !this.state.isTransitionOn });
	};

	// ============================
	// load firebase data - masterScore & imageStock
	// ============================
	loadFirebase = (e) => {
		const db = firebase.firestore();
		this.loadGlobalRanking(db);
		this.loadImageStock(db);
	};

	loadGlobalRanking = (db) => {
		db.collection('masterScore').doc('scoreInfo').get().then((doc) => {
			this.setState({
				globalRankingArray: doc.data().scoreData.sort((a, b) => {
					return b - a;
				})
			});
		});
	};

	loadImageStock = (db) => {
		db
			.collection('imageStock')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					this.setState({
						// 1. load and save firebase data into state
						imgData: [ ...this.state.imgData, doc.data() ],
						// 2. generate a number array for the length of this.state.imgData
						totalRound: [ ...this.state.totalRound, this.state.imgData.length ]
					});
				});
			})
			.then(() => this.generateRandomRound());
	};

	generateRandomRound = () => {
		// 3. randomize round
		let totalEasyRound = this.state.totalRound.slice(0, 10);
		let totalHardRound = this.state.totalRound.slice(10);
		// 4.0 generate randomized index order for array
		if (this.state.randomRound.length < 20) {
			// 4.1 - EASY
			for (let a = totalEasyRound, i = a.length; i--; ) {
				this.setState({
					randomRound: [ ...this.state.randomRound, a.splice(Math.floor(Math.random() * (i + 1)), 1)[0] ]
				});
			}
			// 4.2 - HARD
			for (let a = totalHardRound, i = a.length; i--; ) {
				this.setState({
					randomRound: [ ...this.state.randomRound, a.splice(Math.floor(Math.random() * (i + 1)), 1)[0] ]
				});
			}
			return;
		}
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		// ! ===== below isnt currently being used
		this.setState({ isTimerOn: false });

		this.overlapImages(e);
		this.checkImageSelection(e);
		this.addScore(e);
		this.addProgressBar(e);
		if (this.state.currentRound == this.state.totalRound.length - 1) {
			this.setState({ isResultReady: true });
			this.calculateRanking(e);
			return;
		}
	};
	overlapImages = (e) => {
		this.setState({
			origClass: 'imgBox clicked',
			isClicked: true,
			compareClass: 'button isClicked'
		});
	};
	checkImageSelection = (e) => {
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
					gameHeaderRight: 'gameHeaderRight yes'
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
			return;
		}
	};
	addProgressBar = (e) => {
		if (!this.state.isClicked && this.state.progressBar < 100) {
			this.setState((preState) => {
				return { progressBar: preState.progressBar + 100 / this.state.totalRound.length };
			});
			return;
		}
	};

	calculateRanking = (e) => {
		// 1. calculate accuracy rate
		let point = Math.round(this.state.currentScore / 3000 * 100);
		// 2. add current score into array
		let newArr = this.state.globalRankingArray.slice();
		newArr.push(point);
		// 3. sort the array in descending order
		newArr.sort((a, b) => {
			return b - a;
		});
		// 4. final score = arr.indexOf(percentage) / arr.length
		let index = Number(newArr.indexOf(point)) + 1;
		let ranking = Math.round(index / newArr.length * 100);
		let rankingMsg;
		switch (true) {
			case ranking > 0 && ranking <= 10:
				rankingMsg = "Here's the Golden Ticket to join my developing team!";
				break;
			case ranking > 10 && ranking <= 20:
				rankingMsg = "My grandma's eyes are better than yours, just saying.";
				break;
			case ranking > 20 && ranking <= 40:
				rankingMsg = 'You need to get your eyes checked, like seriously.';
				break;
			case ranking > 40 && ranking <= 60:
				rankingMsg = 'Might as well donate your eyes.';
				break;
			case ranking > 60 && ranking <= 80:
				rankingMsg = 'This is not a guessing game...';
				break;
			case ranking > 80 && ranking <= 100:
				rankingMsg = "Excellent job!! (No, not really you're horrible.)";
				break;
			default:
				rankingMsg = 'Play again!';
		}
		// 5. save the ranking to state, and pass the ranking to <Result />
		this.setState({
			ranking,
			rankingMsg
		});
		// 6. save the newly updated array back to firebase
		return firebase.firestore().collection('masterScore').doc('scoreInfo').set({
			scoreData: newArr
		});
	};

	// ============================
	// UI events - click next
	// ============================
	clickNext = (e) => {
		this.resetRound(e);
		// this.setState({ isTimerOn: true });
	};
	resetRound = (e) => {
		if (this.state.isClicked && this.state.currentRound !== this.state.currentRound.length - 1) {
			this.setState(
				(preState) => {
					return { currentRound: preState.currentRound + 1 };
				},
				// callback
				() => {
					this.setState({
						origClass: 'imgBox',
						isClicked: false,
						yesOnTop: true,
						isCorrect: true,
						compareClass: 'button',
						gameHeaderRight: 'gameHeaderRight'
					});
				}
			);
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
			return;
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
			return;
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
	// 10/01/2019 currently not being used
	getSeconds = () => {
		return ('0' + this.state.timer % 60).slice(-2);
	};
	getMinutes = () => {
		return Math.floor(this.state.timer / 60);
	};
	setTimer = () => {
		// this.setState((preState) => {
		// 	return { timer: preState.timer + 1 };
		// });

		// if(this.state.isTimerOn && this.state.timer >0){
		this.setState((preState) => {
			return { timer: preState.timer - 1 };
		});
		// }
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
					setTimer: this.setTimer, // 10/01/2019 currently not being used
					isTransitionOn: this.isTransitionOn // 10/01/2019 currently not being used
				}}
			>
				{this.props.children}
			</GameContext.Provider>
		);
	}
}

export default GameContextProvider;
