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

  render() {
    const currentTime = secondsToMs(this.props.currentTime);
    const initialTime = secondsToMs(this.props.initialTime);

    return (
      <div>
      {this.props.isActive ? (
            <ProgressCircle trainingState={this.props.trainingState} timeLeft={currentTime}/>
            ) : (
            <ProgressCircle timeLeft={initialTime} />
            )}
      </div>
    )
  }
}
