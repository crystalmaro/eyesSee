import React, { Component } from 'react';
import Game from './Game';
import Header from './Header';
// import Game from './Game';
import Progress from './Progress';
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD852w_vKRpGPs-0YJKStVWsh0PggZCsZ8",
  authDomain: "cwtest0807.firebaseapp.com",
  databaseURL: "https://cwtest0807.firebaseio.com",
  projectId: "cwtest0807",
  storageBucket: "cwtest0807.appspot.com",
  messagingSenderId: "804525394189",
  appId: "1:804525394189:web:43ae193bcc8257fe"
};

firebase.initializeApp(firebaseConfig);


class App extends Component {
  render() {
    return (
      <FirebaseDatabaseProvider firebase={firebase}>
        <div>
          {/* <Header /> */}
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

export default App;
