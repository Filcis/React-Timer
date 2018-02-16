import React from 'react';
import {Clock} from './Clock';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // training state: [string(training, resting)]
      trainingState: "stop"
      // trainTime: this.props.timerOptions.intervalTime,
      // restTime: this.props.timerOptions.intervalTime,
      // sets: this.props.timerOptions.intervalTime
    }
  }

  updateTrainingState(value){
    this.setState({trainingState: value});
  }

  renderClock(initialTime){
    return (
      <Clock
        initialClockTime={initialTime}
        trainingState={this.state.trainingState}
        updateTrainingState={this.updateTrainingState.bind(this)}
      />
    )
  }

  render() {

    const trainingState = this.state.trainingState;
    let Clock = null;
    switch (trainingState) {
      case (trainingState === "train" || "stop"):
        Clock = this.renderClock(this.props.timerOptions.intervalTime);
        break;
      case "rest" :
        Clock = this.renderClock(this.props.timerOptions.restTime);
      break;
    }

    return (
      <div className = "timerWrapper">
        {Clock}
        <p>kontrolery</p>
      </div>
    )
  }
}
