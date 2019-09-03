/* eslint-disable */
import React, { Component } from 'react';
import './css/header.css';
import firebase from 'firebase'
// import firestore from 'firestore'

class Header extends Component {
  state = {
    email: "",
    fullname: "",
    test: "hh"
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();

    db.collection("imageStock").doc("001").get().then(function (doc) {

      if (doc.exists) {
        console.log(doc.data().no)
        console.log(typeof doc.data().no)
      }
    })

    new Promise(function (resolve, reject) {
      if (this.state.test.length > 1) {
        resolve(
          this.setState({
            test: doc.data().no
            // test: "../imageStock/yes.png"
          })
        )
      }
    })
  }

  render() {
    return (
      <div>
        <div className='header'>
          <img src={this.state.test} />
        </div>
        <form onSubmit={this.addUser}>
          <input
            type="text"
            name="fullname"
            placeholder="Full nname"
            onChange={this.updateInput}
            value={this.state.fullname}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Header;
