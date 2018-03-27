import React from 'react';
import {secondsToMs} from '../utils/utilities.js';
import {ProgressCircle} from './progressCircle.js'


export class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleTimerHandler() {
    this.setState((prevState) => {
      return {playing: !prevState.playing};
    });
    if (this.props.trainingStarted === false) {
      this.props.startTraining();
    }
  }

  calculateCompletionPercentage(currentValue, initialValue) {
    let value = ((initialValue - currentValue) * 100) / initialValue;
    return value;
  }

  render() {
    const currentTime = secondsToMs(this.props.currentTime);
    const initialTime = secondsToMs(this.props.initialTime);
    const overallTime = secondsToMs(this.props.overallTime);

    let completionPercentage = this.calculateCompletionPercentage(this.props.currentTime, this.props.initialTime);
    if (this.props.trainingState === "resting") {
      completionPercentage = this.calculateCompletionPercentage(this.props.currentTime, this.props.restTime);
    }

    return (
      <div>
      {this.props.isActive ? (
            <ProgressCircle trainingState={this.props.trainingState} initialTime={initialTime} timeLeft={currentTime} completionPercentage={completionPercentage} overallTime={overallTime}/>
            ) : (
            <ProgressCircle trainingState="not started" timeLeft={initialTime} completionPercentage={0} overallTime={overallTime}/>
            )}
      </div>
    )
  }
}
