/* eslint-disable */
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { GameContext } from '../contexts/GameContext';
import Stopwatch from './Stopwatch';
import ThemeToggle from './ThemeToggle';

function Header() {
	const gameContext = useContext(GameContext);
	const themeContext = useContext(ThemeContext);

	return (
		<header className="gameHeader">
			<div className="logo">
				<img src={themeContext.isLightTheme ? themeContext.light.logo : themeContext.dark.logo} />
			</div>
			<div className={gameContext.gameHeaderRight}>
				<ThemeToggle />
				<div className={gameContext.scoreClass}>
					{gameContext.currentScore > 0 ? gameContext.currentScore > 1000 ? (
						` ${gameContext.currentScore}`
					) : (
						` 0${gameContext.currentScore}`
					) : (
						` 0000`
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
