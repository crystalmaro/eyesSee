import React, { Component } from 'react';
import Game from './Game';
// import Header from './Header';
// import Game from './Game';
import Progress from './Progress';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Game />
        {/* <Message /> */}
        {/* <Button /> */}
        <Progress />
        {/* <Firebase /> */}
      </div>
    );
  }
}

export default App;
