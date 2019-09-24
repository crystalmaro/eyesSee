// import React, { useRef, useState, useEffect } from 'react';

// function Stopwatch() {
// 	const [ sec, setSecond ] = useState(55);

// 	useEffect(
// 		() => {
// 			const timeout = setTimeout(() => {
// 				setSecond(sec + 1);
// 			}, 1000);
// 			return () => {
// 				clearTimeout(timeout);
// 			};
// 		},
// 		[ sec ]
// 	);

// 	function getSeconds() {
// 		return ('0' + sec % 60).slice(-2);
// 	}
// 	function getMinutes() {
// 		return Math.floor(sec / 60);
// 	}

// 	return (
// 		<div>{getMinutes()}:{getSeconds()}</div>
// 	);
// }

import React, { Component } from 'react';
import { GameContext } from '../contexts/GameContext';

class Stopwatch extends Component {
	static contextType = GameContext;

	componentDidMount() {
		setInterval(() => {
			this.context.setTimer();
		}, 1000);
	}
	componenetWillMount() {
		clearInterval(this.context.setTimer);
	}

	render() {
		return (
			<div>
				{this.context.getSeconds}:
				{this.context.getMinutes}
			</div>
		);
	}
}

export default Stopwatch;
