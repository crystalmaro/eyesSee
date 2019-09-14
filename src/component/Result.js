/* eslint-disable */
import React, { Component } from 'react';
import '../css/result.css';
// import { Facebook } from 'react-sharingbuttons';
// import Facebook from 'react-sharingbuttons/dist/buttons/Facebook';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { GameContext } from './Game';

class Result extends Component {
  state = {
    shareURL: 'https://creeeyessee.web.app'
  };

  render() {
    return (
      <GameContext.Consumer>
        {(context) => {
          const { currentScore, ranking } = context;
          return (
            <div className="resultContainer">
              <div className="resultBackground" />
              <div className="resultMain">
                <div>eyesSee</div>
                <div>Score: {currentScore}</div>
                <div>Rank: top {ranking}%</div>
                <FacebookShareButton url={this.state.shareURL}>
                  <FacebookIcon size={60} borderRadius={10} />
                </FacebookShareButton>
              </div>
              <div className="resultFooter">
                <div>Developed by Crystal Wang</div>
              </div>
            </div>
          )
        }}
      </GameContext.Consumer>
    );
  }
}

export default Result;
