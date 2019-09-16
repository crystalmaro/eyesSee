import React, { createContext, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import firebase from 'firebase';
import '../css/game.css';
import Card from './Card';
import Message from './Message';
import Button from './Button';
import Progress from './Progress';
import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';

// import GameContextProvider, { GameContext } from './contexts/GameContext';

export const GameContext = createContext();

class Game extends Component {
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
		rankingMes: ''
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
		if (this.state.currentRound == this.state.imgData.length - 1) {
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
		console.log('accuracy rate: ' + point);
		// 2. add current score into array
		let newArr = this.state.globalScoreArray.slice();
		newArr.push(point);
		// 3. sort the array in descending order
		newArr.sort(function(a, b) {
			return b - a;
		});
		console.log('newArr :' + newArr);
		// 4. final score = arr.indexOf(percentage) / arr.length
		let index = Number(newArr.indexOf(point)) + 1;
		console.log('index+1 :' + index);
		console.log('length:' + newArr.length);
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
			switch (this.state.currentRound == this.state.imgData.length - 1) {
				case false:
					this.setState((preState) => {
						// increment current round count
						return { currentRound: preState.currentRound + 1 };
					});
					this.setState({
						// reset state for the next round
						origClass: 'imgBox',
						isClicked: false,
						yesOnTop: true,
						isCorrect: true
					});
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
		let content;
		let imgData = this.props.imgData;
		let randomRound = this.props.randomRound;

		if (randomRound.length >= 20) {
			content = (
				<div>
					<Card /> {/* Context */}
					<Message /> {/* Context */}
					<Button /> {/* Context */}
					<Progress /> {/* Hooks */}
				</div>
			);
		} else {
			content = <div>...</div>;
		}

		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<GameContext.Provider
							value={{
								...this.state,
								...this.props,
								// imgData,
								// randomRound,
								clickImg: this.clickImg,
								compareMouseDown: this.compareMouseDown,
								compareMouseUp: this.compareMouseUp,
								clickNext: this.clickNext
							}}
						>
							{this.props.children}
							<main style={{ background: theme.bg, color: theme.font }}>
								<Route exact path="/">
									<div className="header">
										<div>eyesSee</div>
										<div>score: {this.state.currentScore}</div>
									</div>
									{content}
								</Route>
							</main>
						</GameContext.Provider>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Game;
