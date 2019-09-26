import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

function Stopwatch() {
	const [ sec, setSecond ] = useState(0);
	const context = useContext(GameContext);

	// useEffect(
	// 	() => {
	// 		let interval = null;

	// 		const timeout = setTimeout(() => {
	// 			setSecond(sec + 1);
	// 		}, 1000);
	// 		return () => {
	// 			clearTimeout(timeout);
	// 		};
	// 	},
	// 	[ sec ]
	// );

	useEffect(
		() => {
			let interval = null;
			if (context.isTimerOn) {
				interval = setInterval(() => {
					setSecond((sec) => sec + 1);
				}, 1000);
			} else if (!context.isTimerOn && sec !== 0) {
				clearInterval(interval);
			}
			return () => clearInterval(interval);
		},
		[ context.isTimerOn, sec ]
	);

	function getSeconds() {
		return ('0' + sec % 60).slice(-2);
	}
	function getMinutes() {
		return Math.floor(sec / 60);
	}

	return (
		<div className="stopwatch">
			{getMinutes()}:{getSeconds()}
		</div>
	);
}

// ! the reason why above Hooks doesnt re-render <Card>
// ! it is because Hooks is using its own function
// ! getMinutes, getSeconds, setSecond to run the stopwatch (separate and individual)
// ! instead, below class is running the function within GameContext

// import React, { Component } from 'react';
// import { GameContext } from '../contexts/GameContext';

// class Stopwatch extends Component {
// 	static contextType = GameContext;

// 	componentDidMount() {
// 		if (this.context.isTimerOn) {
// 			setInterval(() => {
// 				this.context.setTimer();
// 			}, 1000);
// 		} else if (!this.context.isTimerOn) {
// 			clearInterval(this.context.setTimer());
// 		}
// 	}
// 	// TODO: pause timer when !isTimerOn and isClicked
// 	// TODO: setInterval also changes the order of both cards randomly1
// 	// componenetWillunMount() {
// 	// 	clearInterval(this.context.setTimer());
// 	// 	if (!this.context.isTimerOn) {
// 	// 		clearInterval(this.context.setTimer());
// 	// 	}
// 	// }

// 	render() {
// 		return (
// 			<div>
// 				{this.context.getMinutes()}:
// 				{this.context.getSeconds()}
// 			</div>
// 		);
// 	}
// }

export default Stopwatch;
