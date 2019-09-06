// import React, { Component } from 'react'

// class Card extends Component {
//   render() {
//     return (
//       <div
//         onClick={this.props.clickImg}

//         style={this.props.yesOnTop == true ? { zIndex: 1 } : null}
//         className={this.props.origClass}
//         id={this.props.isYes}
//         level={this.props.imgData[this.props.randomRound[this.props.currentRound]].level}
//       >
//         <img src={this.props.imgData[this.props.randomRound[this.props.currentRound]].this.props.isYes} alt="" />
//       </div>
//     )
//   }
// }

// export default Card;

import React from 'react';

const Card = (clickImg, yesOnTop, origClass, imgData, randomRound, currentRound, isYes) => {
  return (
    <div
      onClick={clickImg}

      style={yesOnTop == true ? { zIndex: 1 } : null}
      className={origClass}
      id={isYes}
      level={imgData[randomRound[currentRound]].level}
    >
      <img src={imgData[randomRound[currentRound]].isYes} alt="" />
    </div>
  );
}

export default Card;
