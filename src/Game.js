/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Result from './Result';
import './css/game.css';

import Progress from './Progress';
// import firebase from 'firebase';
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
		score: 0,
		progressBar: 0,
		isResultReady: false,
		isYes: 'yes'
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		// overlap both images
		// display current round correctness & reason
		this.setState({
			origClass: 'imgBox clicked',
			isClicked: true
		});
		// decide which image on top
		// check current round result
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
		// scorekeeping
		if (e.target.parentNode.id === 'yes') {
			switch (e.target.parentNode.getAttribute('level')) {
				case 'easy':
					this.setState((preState) => {
						return { score: preState.score + 100 };
					});
					break;
				case 'hard':
					this.setState((preState) => {
						return { score: preState.score + 150 };
					});
					break;
			}
		}
		// progress bar incrementation
		if (!this.state.isClicked && this.state.progressBar < 300) {
			this.setState((preState) => {
				return { progressBar: preState.progressBar + 300 / 20 };
			});
		}
		// NEXT button changes to RESULT on round 20, after image selection
		if (this.state.currentRound == this.props.imgData.length - 1) {
			this.setState({ isResultReady: true });
		}

		// ::::::::::::: @todo ranking calculation
		// <Game /> send score to firebase when clicking the last image
		// <Result /> get all score data from firebase, and calculate current average and ranking
		// save the ranking to state, and pass it as props to <Result />
	};
	// ============================
	// UI events - click next
	// ============================
	clickNext = (e) => {
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

		if (this.state.isClicked) {
			switch (this.state.currentRound == this.props.imgData.length - 1) {
				case true:
					alert('result page working in progress, please be patient');
					break;
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
			}
		}
	};

	// showNextRound = async (e) => {
	//   await this.clickNext(e)
	//   this.setState({
	//     origClass: 'imgBox',
	//     isClicked: false,
	//     yesOnTop: true,
	//     isCorrect: true,
	//   });
	// }

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
						<div>score: {this.state.score}</div>
					</div>
					{content}
				</Route>

				{/* <Progress progressBar={this.state.progressBar} imgData={this.imgData} randomRound={this.randomRound} currentRound={this.state.currentRound} /> */}
				<Route path="/result" component={(props) => <Result {...props} score={this.state.score} />} />
			</div>
		);
	}
}

export default Game;
