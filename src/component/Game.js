import React, { createContext, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import firebase from 'firebase';
import '../css/game.css';
// import Intro from './Intro';
import Card from './Card';
import Message from './Message';
import Button from './Button';
import Progress from './Progress';
import Result from './Result';
import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';
import { ThemeToggle } from './Header';

import GameContextProvider, { GameContext } from '../contexts/GameContext';

class Game extends Component {
	static contextType = GameContext;

	componentDidMount() {
		this.context.loadFirebase();
	}

	render() {
		// let imgData = this.props.imgData;
		// let randomRound = this.props.randomRound;

		// return (
		// 	<GameContext.Consumer>
		// 		{(context) => {
		// 			const { currentScore, loadFirebase } = context;

		let content;
		if (this.context.randomRound.length >= 20) {
			content = (
				<div>
					<Card />
					<Message />
					<Button />
					<Progress />
				</div>
			);
		} else {
			content = <div>...</div>;
		}
		return (
			<main>
				<header>
					<div className="score">score: {this.context.currentScore}</div>
				</header>
				{content}
				<Route path="/result" component={Result} />
			</main>
		);
		// 	}}
		// </GameContext.Consumer>
		// );
	}
}

export default Game;
