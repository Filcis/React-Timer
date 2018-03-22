import React from 'react';

export const ProgressCircle = (props) => {

  let strokeColor = "white";
  let completionMeterColor = "white";

  switch (props.trainingState) {
    case "training" :
      strokeColor = "grey";
      completionMeterColor = "#B52626"
      break;
    case "resting" :
      strokeColor = "grey";
      completionMeterColor = "#217221"
    break;
  }

  let completion = 904.8 * (1 - props.completionPercentage/100);
  let circleClassName = ""

  //disable css class responsible for transitions, to remove backward motion whent at 0%
  props.completionPercentage === 0 ? circleClassName = "" : circleClassName = "progressValue"

  return(
    <div className="progressBarWrapper">
      <svg width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="144" fill="none" stroke={strokeColor} stroke-width="12" transform="rotate(-90 150 150)"/>
        <circle className={circleClassName} cx="150" cy="150" r="144" fill="none" stroke={completionMeterColor} stroke-width="12"
         stroke-dasharray="904.8" stroke-dashoffset={completion} transform="rotate(-90 150 150)"
        />
      </svg>
      <h2>{props.timeLeft}</h2>
    </div>
  )
}
