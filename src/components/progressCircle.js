import React from 'react';

export const ProgressCircle = (props) => {

  let strokeColor = "white";
  let completionMeterColor = "white";

  switch (props.trainingState) {
    case "training" :
      strokeColor = "#F57373";
      completionMeterColor = "#B52626"
      break;
    case "resting" :
      strokeColor = "#5FD55F";
      completionMeterColor = "#217221"
    break;
  }

  let Completion = 904.8 * (1 - props.completionPercentage/100);

  return(
    <div className="progressBarWrapper">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="144" fill="none" stroke={strokeColor} stroke-width="12" transform="rotate(-90 150 150)"/>
        <circle className="progressValue" cx="150" cy="150" r="144" fill="none" stroke={completionMeterColor} stroke-width="12"
        stroke-dasharray="904.8" stroke-dashoffset={Completion} transform="rotate(-90 150 150)"
        />
      </svg>
      <h2>{props.timeLeft}</h2>
    </div>
  )
}
