import React from 'react';

export class TimerInput extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOption(i) {
    return (
      <TimerOption
        OptionValue={this.props.timerOptions[i]}
        handleIncrementButton={this.props.handleIncrementButton(i)}
        handleDecrementButton={this.props.handleDecrementButton(i)}
      />
    )
  }

  render() {
    return (
      <div className = "optionsWrapper">
          {this.renderOption("intervalTime")}
          {this.renderOption("restTime")}
          {this.renderOption("sets")}
      </div>
    )
  }
}

const TimerOption = (props) => (
  <div>
    <IncrementButton clickHandler={props.handleIncrementButton} />
    <p>{props.OptionValue}</p>
    <DecrementButton clickHandler={props.handleDecrementButton} />
  </div>
)

const IncrementButton = (props) => (
  <button onClick={props.clickHandler}>+</button>
)

const DecrementButton = (props) => (
  <button onClick={props.clickHandler}>-</button>
)
