import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Intro from './Intro';
import Game from './Game';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import '../css/tutorial.css';
import Stopwatch from './Stopwatch';

class Tutorial extends Component {
	state = {
		introData: [
			{
				key: 1,
				yes: './imageStock/intro1.png',
				no: './imageStock/intro2.png',
				reason: 'Click and hold compare to see the difference'
			},
			{
				key: 2,
				yes: './imageStock/intro3.png',
				no: './imageStock/intro4.png',
				reason: 'Are you ready?'
			}
		],
		introRound: 0,
		introMsg: 'Which UI is more correct?',
		origClass: 'imgBox',
		compareClass: 'button',
		isClicked: false,
		yesOnTop: true,
		isCorrect: true,
		yesImg: './imageStock/yes.png',
		noImg: './imageStock/no.png',
		isIntroDone: false,
		// ! ===== below isnt currently being used
		min: 1,
		sec: 0
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		this.overlapImages(e);
		this.checkImageSelection(e);
		this.setState({ introMsg: 'Please read the rules below.' });
		if (this.state.introRound == this.state.introData.length - 1) {
			this.setState({ isIntroDone: true });
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
					isCorrect: true
				});
				break;
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
			switch (this.state.introRound == this.state.introRound.length - 1) {
				case false:
					this.setState((preState) => {
						// increment current round count
						return { introRound: preState.introRound + 1 };
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
	// Step-by-step Guide
	// ============================
	// componentDidMount() {
	// 	introJs().start();
	// }
	// onExit = () => {
	// 	this.setState(() => ({ stepsEnabled: false }));
	// };

	// toggleDemo = () => {
	// 	this.setState(() => ({ stepsEnabled: true }));
	// };

	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark, stepsEnabled, steps, onExit } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<div className="tutorialContainer">
							<Steps enabled={stepsEnabled} steps={steps} initialStep={0} onExit={onExit} />
							<div className="tutorialHeader">
								<ThemeToggle />
								<div
									className="introMsg selectOff"
									style={this.state.isClicked ? { display: 'none' } : { display: 'block' }}
								>
									{this.state.introMsg}
								</div>
							</div>

							{/* <Hints enabled={this.state.hintsEnabled} hints={this.state.hints} /> */}

							<div className="gameContainer">
								<div
									onClick={this.clickImg}
									style={this.state.yesOnTop ? { zIndex: 1 } : null}
									className={this.state.origClass}
									id="yes"
								>
									<img src={this.state.introData[this.state.introRound].yes} alt="" />
								</div>
								<div
									onClick={this.clickImg}
									style={this.state.yesOnTop ? null : { zIndex: 1 }}
									className={this.state.origClass}
									id="no"
								>
									<img src={this.state.introData[this.state.introRound].no} alt="" />
								</div>
							</div>

							<div
								className="messageContainer"
								style={this.state.isClicked ? { display: 'flex' } : { display: 'none' }}
							>
								<div className="result">
									<img src={this.state.isCorrect ? this.state.yesImg : this.state.noImg} />
									<div className="message">{this.state.introData[this.state.introRound].reason}</div>
								</div>
								{/* <div
									className="messageTheme"
									style={this.state.introRound == 0 ? { display: 'flex' } : { display: 'none' }}
								/> */}
							</div>

							<div
								className="buttonContainer"
								style={this.state.isClicked ? { display: 'flex' } : { display: 'none' }}
							>
								<div
									onMouseDown={this.compareMouseDown}
									onTouchStart={this.compareMouseDown}
									onMouseUp={this.compareMouseUp}
									onTouchEnd={this.compareMouseUp}
									className={this.state.compareClass}
								>
									COMPARE
								</div>
								<div
									onClick={this.clickNext}
									className={this.state.isClicked ? 'button isClicked' : 'button'}
								>
									{this.state.isIntroDone ? (
										<NavLink to="/game">
											<strong>START GAME</strong>
										</NavLink>
									) : (
										'NEXT'
									)}
								</div>
							</div>
						</div>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Tutorial;
