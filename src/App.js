import React, { Component } from 'react';
import Header from './Header';
import Game from './Game';
// import Button from './Button';
// import Message from './Message';
import Progress from './Progress';
// import Firebase from './firebase';
import { FirebaseDatabaseProvider } from '@react-firebase/database';

export default class App extends Component {
  render() {
    return (
      <FirebaseDatabaseProvider>
        <div>
          <Header />
          <Game />
          {/* <Message /> */}
          {/* <Button /> */}
          <Progress />
          {/* <Firebase /> */}
        </div>
      </FirebaseDatabaseProvider>
    );
  }
}
