/* eslint-disable */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './css/header.css';
import firebase from 'firebase';
// import firestore from 'firestore'


class Header extends Component {
  state = {
    test: 'hh',
    key: 1,
    yes: '',
    no: '',
    level: 'easy',
    reason: '',
    doc: 1,

  };

  addUser = e => {
    // e.preventDefault();

    this.setState((preState) => { return { key: preState.key + 1 } })
    this.setState({ doc: this.state.doc + 1 })

    const db = firebase.firestore();
    db.collection("imageStock")
      .where("level", "==", "easy")
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.data())
          let data = [...this.state.data, doc.data()]
          this.setState({ data });
        });
        // console.log(this.state)
      });

  };
  // componentDidMount() {
  //   this.addUser()
  // }

  // add data into firebase
  // ==================
  updateFire = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  addFirebase = e => {
    e.preventDefault();
    alert("hi")
    const db = firebase.firestore();
    db.collection("imageStock").doc(this.state.doc).set({
      key: Number(this.state.key),
      level: this.state.level,
      yes: this.state.yes,
      no: this.state.no,
      reason: this.state.reason,
    })
    this.setState({
      yes: '',
      no: '',
      reason: '',
    })
  }
  // ================== 
  // add data into firebase
  // ==================


  render() {

    // let content;
    // if (this.state.data.length >= 10) {
    //   console.log(this.state.data)
    //   content =
    //     // <div>hello data</div>
    //     <div className="gameContainer" id="1">
    //       <div>
    //         <img src={this.state.data[3].yes} alt="" />
    //       </div>
    //       <div>
    //         <img src={this.state.data[3].no} alt="" />
    //       </div>
    //     </div>;
    // } else {
    //   content = <div>Loading</div>;
    // }

    return (
      <div>
        {/* {content} */}
        <div>
          {/* <img src={this.state.test} /> */}
          <button onClick={this.addUser} />
          <div> below: add to firebase doc "imageStock"
            <form onSubmit={this.addFirebase}>
              <input
                type="text"
                name="doc"
                placeholder="doc"
                onChange={this.updateFire}
                value={this.state.doc}
              />
              <input
                type="text"
                name="key"
                placeholder="key"
                onChange={this.updateFire}
                value={this.state.key}
              />
              <select name="level" onChange={this.updateFire} value={this.state.level}>
                <option name="easy" value="easy">easy</option>
                <option name="hard" value="hard">hard</option>
              </select>
              <input
                type="text"
                name="yes"
                placeholder="yes"
                onChange={this.updateFire}
                value={this.state.yes}
              />
              <input
                type="text"
                name="no"
                placeholder="no"
                onChange={this.updateFire}
                value={this.state.no}
              />
              <input
                type="text"
                name="reason"
                placeholder="reason"
                onChange={this.updateFire}
                value={this.state.reason}
              />
              <button type="submit">Add to Firebase</button>
            </form>
          </div>
        </div>



      </div>
    );
  }
}

export default Header;
