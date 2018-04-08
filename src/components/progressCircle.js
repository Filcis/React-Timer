import React from 'react';

export const ProgressCircle = (props) => {

  let strokeColor = "grey";
  let completionMeterColor = "#21A0A0";

  switch (props.trainingState) {
    case "training" :
      completionMeterColor = "#E53D00"
      break;
    case "resting" :
      strokeColor = "grey";
      completionMeterColor = "#21A0A0"
    break;
  }

  let completion = 904.8 * (1 - props.completionPercentage/100);
  let circleClassName = ""

  //disable css class responsible for transitions, to remove backward motion whent at 0%
  props.completionPercentage === 0 ? circleClassName = "" : circleClassName = "progressValue"

  return(
    <div className="progressBarWrapper">
      <svg width="400" height="400" viewBox="0 0 300 300">
        <circle className="circleProgressBackground" cx="150" cy="150" r="144" fill="none" stroke-width="12" transform="rotate(-90 150 150)"/>
        <circle className={circleClassName} cx="150" cy="150" r="144" fill="none" stroke={completionMeterColor} stroke-width="12"
         stroke-dasharray="904.8" stroke-dashoffset={completion} transform="rotate(-90 150 150)"
        />
      </svg>
      <div className="info">
        <h2>{props.timeLeft}</h2>
      </div>
    </div>
  )
}
