import React, { Component, ContextType } from 'react';
import '../css/game.css';
import Loading from './Loading';
import Header from './Header';
import Card from './Card';
import Message from './Message';
import Button from './Button';
import Progress from './Progress';
import ResultReady from './ResultReady';

import GameContextProvider, { GameContext } from '../contexts/GameContext';

class Game extends Component {
	static contextType = GameContext;

	componentDidMount() {
		this.context.loadFirebase();
		// React.ContextType.loadFirebase();
	}

	render() {
		let content;
		if (this.context.randomRound.length >= 20) {
			content = (
				<React.Fragment>
					<Header />
					<Card />
					<Message />
					<Button />
					<Progress />
				</React.Fragment>
			);
		} else {
			content = (
				<React.Fragment>
					<Loading />
				</React.Fragment>
			);
		}
		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default Game;
