import React, { createContext, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
// import firebase from 'firebase';
import '../css/game.css';
import Loading from './Loading';
import Header from './Header';
import Card from './Card';
import Message from './Message';
import Button from './Button';
import Progress from './Progress';
import Result from './Result';
import Stopwatch from './Stopwatch';
// import ThemeContextProvider, { ThemeContext } from '../contexts/ThemeContext';
// import { ThemeToggle } from './Header';

import GameContextProvider, { GameContext } from '../contexts/GameContext';

class Game extends Component {
	static contextType = GameContext;

	componentDidMount() {
		this.context.loadFirebase();
	}

	render() {
		let content;
		if (this.context.randomRound.length >= 20) {
			content = (
				<main>
					<Header />
					<Stopwatch />
					<Card />
					<Message />
					<Button />
					<Progress />
				</main>
			);
		} else {
			content = (
				<main>
					<Loading />
				</main>
			);
		}
		return <main>{content}</main>;
	}
}

export default Game;
