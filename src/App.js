import React, { Component } from 'react';
import Header from './Header';
import Game from './Game';
import Button from './Button';
import Message from './Message';
import Progress from './Progress';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Game />
        <Message />
        <Button />
        <Progress />
      </div>
    );
  }
}
