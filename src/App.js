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

  state = {
    hello: 'yooo there',
    data: [], // Fire - complete data loaded from firebase
    totalRound: [], // Fire - array of number 0 - 19
    randomRound: [], // Fire - randomized EasyRound, followed by randomize HardRound
  }

  // ============================
  // load firebase data
  // ============================
  loadFirebase = e => {
    const db = firebase.firestore();
    db.collection("imageStock")
      // .where("level", "==", "easy")
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // load and save firebase data into state
          let data = [...this.state.data, doc.data()]
          // generate a number array for the length of this.state.data
          let totalRound = [...this.state.totalRound, this.state.data.length]
          this.setState({ data, totalRound });
        });
        let totalEasyRound = this.state.totalRound.slice(0, 10)
        let totalHardRound = this.state.totalRound.slice(10)
        // this.setState({ totalEasyRound, totalHardRound })
        // randomly generate numbers without repetition - EASY
        for (let a = totalEasyRound, i = a.length; i--;) {
          let randomRound = [...this.state.randomRound, a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]];
          this.setState({ randomRound })
        }
        // randomly generate numbers without repetition - HARD
        for (let a = totalHardRound, i = a.length; i--;) {
          let randomRound = [...this.state.randomRound, a.splice(Math.floor(Math.random() * (i + 1)), 1)[0]];
          this.setState({ randomRound })
        }
        console.log(this.state.randomRound);
      });
  };
  componentDidMount() {
    this.loadFirebase();
  }

  render() {

    return (
      <FirebaseDatabaseProvider firebase={firebase}>
        <div>
          {/* <Header /> */}
          <Game
            hello={this.state.hello}
            data={this.state.data}
            totalRound={this.state.totalRound}
            randomRound={this.state.randomRound}


          />
          {/* <Message /> */}
          {/* <Button /> */}
          {/* <Progress /> */}
          {/* <Firebase /> */}
        </div>
      </FirebaseDatabaseProvider>
    );
  }
}

export default App;
