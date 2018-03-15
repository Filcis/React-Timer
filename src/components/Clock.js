import React from 'react';
import {secondsToMs} from '../utils/utilities.js'

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
    const time = secondsToMs(this.props.currentTime)
    return (
      <div>
      {this.props.isActive ? (
                <p>timer aktywny, pozostało: {time}</p>
            ) : (
                <p>timer nieaktywny</p>
            )}
      </div>
    )
  }
}
