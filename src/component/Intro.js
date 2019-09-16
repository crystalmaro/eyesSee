import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Game from './Game';

class Intro extends Component {
	state = {
		introData: [
			{
				key: 1,
				yes: './imageStock/intro1.png',
				no: './imageStock/intro2.png',
				reason: 'this is just the tutorial'
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
			<main>
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
					<div onClick={this.clickNext} className="button">
						{this.state.isIntroDone ? <NavLink to="/game">START</NavLink> : 'NEXT'}
					</div>
					<Route path="/game" component={Game} />
				</div>
			</main>
		);
	}
}

export default Intro;
