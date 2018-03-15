import React from 'react';
import {secondsToMs} from '../utils/utilities.js'

export class TimerInput extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOption(i, convertToMs = false) {
    let value = '';
    convertToMs ? value = secondsToMs(this.props.timerOptions[i]) : value = this.props.timerOptions[i];
    return (
      <TimerOption
        disabled={this.props.timerOptions.trainingStarted}
        OptionValue={value}
        handleIncrementButton={this.props.handleIncrementButton(i)}
        handleDecrementButton={this.props.handleDecrementButton(i)}
      />
    )
  }

  componentWillUnmount() {
    console.log("updating options")
  }

  render() {
    return (
      <div className = "optionsWrapper">
          {this.renderOption("intervalTime", true)}
          {this.renderOption("restTime", true)}
          {this.renderOption("sets")}
      </div>
    )
  }
}

const TimerOption = (props) => (
  <div>
    <IncrementButton clickHandler={props.handleIncrementButton} disabled={props.disabled}/>
    <p>{props.OptionValue}</p>
    <DecrementButton clickHandler={props.handleDecrementButton} disabled={props.disabled}/>
  </div>
)

const IncrementButton = (props) => (
  <button onClick={props.clickHandler}disabled={props.disabled}>+</button>
)

const DecrementButton = (props) => (
  <button onClick={props.clickHandler}disabled={props.disabled}>-</button>
)
