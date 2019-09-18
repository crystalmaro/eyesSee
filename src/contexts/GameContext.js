import React, { createContext, Component } from 'react';
import firebase from 'Firebase';
import '@firebase/firestore';

export const GameContext = createContext();

class GameContextProvider extends Component {
	state = {
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
		rankingMes: '',
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
			});
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
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
			isClicked: true
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
					isCorrect: true
				});
				break;
		}
	};
	addScore = (e) => {
		if (e.target.parentNode.id == 'yes' && !this.state.isClicked) {
			switch (e.target.parentNode.getAttribute('level')) {
				case 'easy':
					this.setState((preState) => {
						return { currentScore: preState.currentScore + 100 };
					});
					break;
				case 'hard':
					this.setState((preState) => {
						return { currentScore: preState.currentScore + 150 };
					});
					break;
			}
		}
	};
	addProgressBar = (e) => {
		if (!this.state.isClicked && this.state.progressBar < 300) {
			this.setState((preState) => {
				return { progressBar: preState.progressBar + 300 / 20 };
			});
		}
	};
	calculateRanking = (e) => {
		// 1. calculate accuracy rate
		let point = Math.round(this.state.currentScore / 3000 * 100);
		// console.log('accuracy rate: ' + point);
		// 2. add current score into array
		let newArr = this.state.globalScoreArray.slice();
		newArr.push(point);
		// 3. sort the array in descending order
		newArr.sort(function(a, b) {
			return b - a;
		});
		// console.log('newArr :' + newArr);
		// 4. final score = arr.indexOf(percentage) / arr.length
		let index = Number(newArr.indexOf(point)) + 1;
		// console.log('index+1 :' + index);
		// console.log('length:' + newArr.length);
		let ranking = Math.round(index / newArr.length * 100);
		console.log('rank:' + ranking);
		// TODO: fun rankingMsg for different % tier
		// TODO: such as " you need to get yours eyes checked lol "
		// TODO: 10-20
		// TODO: 20-40
		// TODO: 40-70
		// TODO: 70-100
		// 5. save the ranking to state, and pass the ranking to <Result />
		this.setState({
			// TODO: save resultMsg to state, once ready
			ranking
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
						// TODO: run currentRound+1 first before doing the below
						// TODO: figure out why callback below doesnt work the way I expected
						() => {
							this.setState({
								// reset state for the next round
								origClass: 'imgBox',
								isClicked: false,
								yesOnTop: true,
								isCorrect: true
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
			this.setState({ compareClass: 'button' });
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

	render() {
		return (
			<GameContext.Provider
				value={{
					...this.state,
					clickImg: this.clickImg,
					compareMouseDown: this.compareMouseDown,
					compareMouseUp: this.compareMouseUp,
					clickNext: this.clickNext,
					loadFirebase: this.loadFirebase
				}}
			>
				{this.props.children}
			</GameContext.Provider>
		);
	}
}

export default GameContextProvider;
