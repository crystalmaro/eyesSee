/* eslint-disable */
import React, { Component } from 'react';
import './css/header.css';
import firebase from 'firebase';
// import firestore from 'firestore'

class Header extends Component {
  state = {
    test: ' hh',
    key: '',
    yes: '',
    no: '',
    level: '',
  };

  updateFire = e => { this.setState({ [e.target.name]: e.target.value }); }
  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();

    db.collection('imageStock')
      .doc('001')
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('data: ' + doc.data().no);
          console.log(typeof doc.data().no);
          this.setState({
            test: doc.data().yes,
            // test: "../imageStock/yes.png"
          });
        }
      });
  };

  addFirebase = e => {
    e.preventDefault();
    alert("hi")
  }
  render() {
    return (
      <div>
        <div className="header">
          <img src={this.state.test} />
        </div>
        <button onClick={this.addUser} />

        <form onSubmit={this.addFirebase}>
          <input
            type="text"
            name="key"
            placeholder="key"
            onChange={this.updateFire}
            value={this.state.key}
          />
          <select onChange={this.updateFire} value={this.state.level}>
            <option name="easy">easy</option>
            <option name="hard">hard</option>
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
          <button type="submit">Add to Firebase</button>
        </form>
      </div>
    );
  }
}

export default Header;
