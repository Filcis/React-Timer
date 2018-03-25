import React from 'react';
import {secondsToMs} from '../utils/utilities.js'

export class TimerInput extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOption(i, convertToMs = false, optionName) {
    let value = '';
    convertToMs ? value = secondsToMs(this.props.timerOptions[i]) : value = this.props.timerOptions[i];
    return (
      <TimerOption
        disabled={this.props.timerOptions.trainingStarted}
        OptionValue={value}
        OptionName={optionName}
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
      <h2>Ustawienia</h2>
          {this.renderOption("intervalTime", true, "Czas interwału")}
          {this.renderOption("restTime", true, "Czas odpoczynku")}
          {this.renderOption("sets",false, "Liczba powtórzeń")}
      </div>
    )
  }
}

const TimerOption = (props) => (
  <div className="option">
    <p>{props.OptionName}</p>
    <div>
      <DecrementButton clickHandler={props.handleDecrementButton} disabled={props.disabled}/>
      <p>{props.OptionValue}</p>
      <IncrementButton clickHandler={props.handleIncrementButton} disabled={props.disabled}/>
    </div>
  </div>
)

const IncrementButton = (props) => (
  <button type="button" onClick={props.clickHandler}disabled={props.disabled}>+</button>
)

const DecrementButton = (props) => (
  <button type="button" onClick={props.clickHandler}disabled={props.disabled}>-</button>
)
