/* eslint-disable */
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { GameContext } from '../contexts/GameContext';

function Header() {
	const gameContext = useContext(GameContext);
	const themeContext = useContext(ThemeContext);

	return (
		<header className="score">
			<div className="logo">
				<img src={themeContext.isLightTheme ? themeContext.light.logo : themeContext.dark.logo} />
			</div>
			<div>
				👀
				{gameContext.currentScore > 0 ? gameContext.currentScore > 1000 ? (
					` ${gameContext.currentScore}`
				) : (
					` 0${gameContext.currentScore}`
				) : (
					` 0000`
				)}
			</div>
		</header>
	);
}

export default Header;
