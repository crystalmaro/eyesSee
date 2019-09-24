import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Game from './Game';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

class Intro extends Component {
	state = {
		stepsEnabled: true,
		steps: [
			{
				element: '.gameContainer',
				intro: 'click one of the two cards'
			},
			{
				element: '.buttonContainer > div:nth-child(1)',
				intro: 'click and hold to see difference between both cards '
			},
			{
				element: '.buttonContainer > div:nth-child(2)',
				intro: 'click to proceed to next round'
			},
			{
				element: '.theme',
				intro: 'check this out for different background!'
			},
			{
				element: '.gameContainer > div:first-child',
				intro: 'free answer: click DONE and then click this card'
			}
		],
		introData: [
			{
				key: 1,
				yes: './imageStock/intro1.png',
				no: './imageStock/intro2.png',
				reason: 'click star on top for Dark Mode'
			},
			{
				key: 2,
				yes: './imageStock/intro3.png',
				no: './imageStock/intro4.png',
				reason: 'please click START below'
			}
		],
		introRound: 0,
		origClass: 'imgBox',
		compareClass: 'button',
		isClicked: false,
		yesOnTop: true,
		isCorrect: true,
		yesImg: './imageStock/yes.png',
		noImg: './imageStock/no.png',
		isIntroDone: false
	};

	// ============================
	// UI events - click image
	// ============================
	clickImg = (e) => {
		// 1. overlap both images & show current round answer
		this.overlapImages(e);
		// 2. decide which image on top & decide current round answer
		this.checkImage(e);

		// 5. NEXT button changes to RESULT on last round, after image selection
		if (this.state.introRound == this.state.introData.length - 1) {
			this.setState({ isIntroDone: true });
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

	componentDidMount() {
		introJs().start();
	}

	onExit = () => {
		this.setState(() => ({ stepsEnabled: false }));
	};
	render() {
		return (
			<ThemeContext.Consumer>
				{(context) => {
					const { isLightTheme, light, dark } = context;
					const theme = isLightTheme ? light : dark;
					return (
						<main>
							<header>
								<div className="logo">
									<img src={theme.logo} />
								</div>
								<div>
									<ThemeToggle />
									<NavLink to="/game">Skip to Game</NavLink>
								</div>
							</header>
							<Steps
								enabled={this.state.stepsEnabled}
								steps={this.state.steps}
								initialStep={0}
								onExit={this.onExit}
							/>
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
								<div>
									Click and hold <span>COMPARE</span> to compare
								</div>
							</div>

							<div className="buttonContainer">
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
											<strong>START</strong>
										</NavLink>
									) : (
										'NEXT'
									)}
								</div>
								<Route path="/game" component={Game} />
							</div>
						</main>
					);
				}}
			</ThemeContext.Consumer>
		);
	}
}

export default Intro;
