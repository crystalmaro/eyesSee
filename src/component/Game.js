import React, { createContext, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import firebase from 'firebase';
import '../css/game.css';
import Card from './Card';
import Message from './Message';
import Button from './Button';
import Progress from './Progress';
import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';

import GameContextProvider, { GameContext } from './contexts/GameContext';

class Game extends Component {
	render() {
		// let content;
		// let imgData = this.props.imgData;
		// let randomRound = this.props.randomRound;
		// if (randomRound.length >= 20) {
		// 	content = (
		// 		<div>
		// 			<Card /> {/* Context */}
		// 			<Message /> {/* Context */}
		// 			<Button /> {/* Context */}
		// 			<Progress /> {/* Hooks */}
		// 		</div>
		// 	);
		// } else {
		// 	content = <div>...</div>;
		// }

		return (
			<GameContext.Consumer>
				{(context) => {
					const { currentScore } = context;
					return (
						<main>
							{/* <Route exact path="/"> */}
							<div className="header">
								<div>eyesSee</div>
								<div>score: {currentScore}</div>
							</div>
							{/* {content} */}
							{/* </Route> */}
						</main>
					);
				}}
			</GameContext.Consumer>
		);
	}
}

// 		return (
// 			<ThemeContext.Consumer>
// 				{(context) => {
// 					const { isLightTheme, light, dark } = context;
// 					const theme = isLightTheme ? light : dark;
// 					return (
// 						<GameContext.Consumer>
// 							<main>
// 								<Route exact path="/">
// 									{/* <div className="header">
// 										<div>eyesSee</div>
// 										<div>score: {this.state.currentScore}</div>
// 									</div> */}
// 									{content}
// 								</Route>
// 							</main>
// 						</GameContext.Consumer>
// 					);
// 				}}
// 			</ThemeContext.Consumer>
// 		);
// 	}
// }

export default Game;
