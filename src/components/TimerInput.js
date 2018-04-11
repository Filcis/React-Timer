import React from 'react';
import {secondsToMs} from '../utils/utilities.js'

export class TimerInput extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOption(i, convertToMs = false, optionName) {
    let value = '';
    convertToMs ? value = secondsToMs(this.props[i]) : value = this.props[i];
    return (
      <TimerOption
        disabled={this.props.isActive}
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
    let optionsClassName="";
    console.log('render called');
    if(this.props.isActive) {optionsClassName ="disabled";}
    return (
      <div className = "optionsWrapper">
      <h2>OPTIONS</h2>
      <ul className={optionsClassName}>
          {this.renderOption("intervalTime", true, "Interval time")}
          {this.renderOption("restTime", true, "Rest Time")}
          {this.renderOption("sets",false, "Sets")}
      </ul>
      </div>
    )
  }
}

const TimerOption = (props) => (
  <li className="option">
    <p>{props.OptionName}</p>
    <div>
      <DecrementButton clickHandler={props.handleDecrementButton} disabled={props.disabled}/>
      <input type="text" value={props.OptionValue} readOnly/>
      <IncrementButton clickHandler={props.handleIncrementButton} disabled={props.disabled}/>
    </div>
  </li>
)

const IncrementButton = (props) => (
  <input value="+" className="increment" type="button" onClick={props.clickHandler}disabled={props.disabled}/>
)

const DecrementButton = (props) => (
  <input value="-" className="decrement" type="button" onClick={props.clickHandler}disabled={props.disabled}/>
)
