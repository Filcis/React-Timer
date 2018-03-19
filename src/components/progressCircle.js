import React from 'react';

export const ProgressCircle = (props) => {

  let strokeColor = "white";

  switch (props.trainingState) {
    case "training" :
      strokeColor = "red";
      break;
    case "resting" :
      strokeColor = "green";
    break;
  }

  return(
    <div className="progressBarWrapper">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="144" fill="none" stroke={strokeColor} stroke-width="12" />
      </svg>
      <h2>{props.timeLeft}</h2>
    </div>
  )
}
