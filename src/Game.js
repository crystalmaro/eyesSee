/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Result from './Result';
import './css/game.css';

import Progress from './Progress';
import firebase from 'firebase';
import Card from './Card';

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
		isYes: 'yes', // reserved for <Card />
		ranking: 0 // NEW global score
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		// 1. overlap both images & show current round answer
		// (this.state.isClicked), (this.state.origClass)
		this.overlapImages(e);
		// 2. decide which image on top & decide current round answer
		// (this.state.yesOnTop), (this.state.isCorrect)
		this.checkImage(e);
		// 3. scorekeeping
		// (this.state.currentScore)
		this.addScore(e);
		// 4. progress bar incrementation
		// (this.state.isClicked), (this.state.progressBar)
		this.addProgressBar(e);
		// 5. NEXT button changes to RESULT on last round, after image selection
		if (this.state.currentRound == this.props.imgData.length - 1) {
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
		if (e.target.parentNode.id == 'yes') {
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

	// ============================
	// UI events - click next
	// ============================
	clickNext = (e) => {
		this.resetRound(e);
	};
	resetRound = (e) => {
		if (this.state.isClicked) {
			switch (this.state.currentRound == this.props.imgData.length - 1) {
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

		// if (this.state.isClicked
		//   && this.state.currentRound < this.props.imgData.length - 1) {
		//   // increment current round count
		//   this.setState((preState) => {
		//     return { currentRound: preState.currentRound + 1 }
		//   });

		//   this.setState({
		//     origClass: 'imgBox',
		//     isClicked: false,
		//     yesOnTop: true,
		//     isCorrect: true,
		//   });

		// } if (this.state.currentRound == this.props.imgData.length - 1) {
		//   alert('result page working in progress')
		// }
	};
	calculateRanking = (e) => {
		// 1. calculate accuracy rate
		let point = Math.round(this.state.currentScore / 3000 * 100);
		console.log('accuracy rate: ' + point);
		// let percentage = Math.floor(point * 100);
		// 2. add current score into array
		let newArr = this.props.globalScoreArray.slice();
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
		// 5. save the ranking to state, and pass the ranking to <Result />
		this.setState({
			ranking
		});
		// 6. save the newly updated array back to firebase
		const db = firebase.firestore();
		return db.collection('masterScore').doc('scoreInfo').set({
			scoreData: newArr
		});
	};
	// ============================
	// UI events - click compare
	// ============================
	compareMouseDown = (e) => {
		if (this.state.isClicked) {
			// if (this.state.yesOnTop) {
			//   this.setState({ yesOnTop: false, isCorrect: false });
			// }
			// if (!this.state.yesOnTop) {
			//   this.setState({ yesOnTop: true, isCorrect: true });
			// }
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
	compareTouchDown = (e) => {
		this.compareMouseDown();
	};
	compareMouseUp = (e) => {
		if (this.state.isClicked) {
			// if (!this.state.yesOnTop) {
			//   this.setState({ yesOnTop: true, isCorrect: true });
			// }
			// if (this.state.yesOnTop) {
			//   this.setState({ yesOnTop: false, isCorrect: false });
			// }
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
	compareTouchEnd = (e) => {
		this.compareMouseUp();
	};

	render() {
		let content;
		let imgData = this.props.imgData;
		let randomRound = this.props.randomRound;

		if (randomRound.length >= 20) {
			// let yes = <Card
			//   clickImg={this.clickImg}
			//   // yesOnTop={this.state.yesOnTop}
			//   style={this.props.yesOnTop == true ? { zIndex: 1 } : null}
			//   origClass={this.state.origClass}
			//   imgData={this.props.imgData}
			//   randomRound={randomRound}
			//   currentRound={this.state.currentRound}
			//   isYes='yes'
			// />

			let yes = (
				<div
					onClick={this.clickImg}
					style={this.state.yesOnTop == true ? { zIndex: 1 } : null}
					className={this.state.origClass}
					id="yes"
					level={imgData[randomRound[this.state.currentRound]].level}
				>
					<img src={imgData[randomRound[this.state.currentRound]].yes} alt="" />
				</div>
			);

			// let no = <Card
			//   clickImg={this.clickImg}
			//   // yesOnTop={this.state.yesOnTop}
			//   style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
			//   origClass={this.state.origClass}
			//   imgData={this.props.imgData}
			//   randomRound={randomRound}
			//   currentRound={this.state.currentRound}
			//   isYes='no'
			// />

			let no = (
				<div
					onClick={this.clickImg}
					style={this.state.yesOnTop == false ? { zIndex: 1 } : null}
					className={this.state.origClass}
					id="no"
					level={imgData[randomRound[this.state.currentRound]].level}
				>
					<img src={imgData[randomRound[this.state.currentRound]].no} alt="" />
				</div>
			);

			let first, second;

			if (Math.random() > 0.5) {
				first = yes;
				second = no;
			} else {
				first = no;
				second = yes;
			}

			content = (
				<div>
					<div className="gameContainer" id={randomRound[this.state.currentRound]}>
						{/* ================= */}
						{/* <Card /> */}
						{/* ================= */}
						{first}
						{second}
					</div>

					<div
						className="messageContainer"
						style={this.state.isClicked ? { display: 'flex' } : { display: 'none' }}
					>
						<div className="result">
							<img src={this.state.isCorrect ? this.state.yesImg : this.state.noImg} />
							<div className="message">{imgData[randomRound[this.state.currentRound]].reason}</div>
						</div>
						<div>
							Click and hold <span>COMPARE</span> to compare
						</div>
					</div>

					<div className="buttonContainer">
						<div
							onMouseDown={this.compareMouseDown}
							onMouseUp={this.compareMouseUp}
							onTouchStart={this.compareTouchDown}
							onTouchEnd={this.compareTouchEnd}
							className={this.state.compareClass}
						>
							COMPARE
						</div>
						<div onClick={this.clickNext} className="button">
							{/* {this.state.isResultReady ? <NavLink to='/result'>RESULT</NavLink> : 'NEXT'} */}
							{this.state.isResultReady ? <NavLink to="/result">RESULT</NavLink> : 'NEXT'}
							{/* NEXT */}
						</div>
					</div>

					<div className="progressContainer">
						<div className="progressBack">
							<div
								className="progressFront"
								style={
									this.state.progressBar >= 300 ? (
										{ borderRadius: '14px', width: `${this.state.progressBar}px` }
									) : (
										{ width: `${this.state.progressBar}px` }
									)
								}
							/>
							<div className="progressNumber">
								{imgData[randomRound[this.state.currentRound]].level} {this.state.currentRound + 1} /{' '}
								{randomRound.length}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			content = <div>...</div>;
		}

		return (
			<div>
				<Route exact path="/">
					<div className="header">
						<div>eyesSee</div>
						<div>score: {this.state.currentScore}</div>
					</div>
					{content}
				</Route>

				{/* <Progress progressBar={this.state.progressBar} imgData={this.imgData} randomRound={this.randomRound} currentRound={this.state.currentRound} /> */}
				<Route
					path="/result"
					component={(props) => (
						<Result {...props} currentScore={this.state.currentScore} ranking={this.state.ranking} />
					)}
				/>
			</div>
		);
	}
}

export default Game;
