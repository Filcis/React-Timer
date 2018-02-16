import React from 'react';
import ReactDOM from 'react-dom';
import {TimerInput} from './components/TimerInput';
import {Timer} from './components/Timer';
import './style/scss/style.scss'

class TimerApp extends React.Component {
  constructor() {
    super();

    this.state = {
        intervalTime : 30,
        restTime: 5,
        sets: 3
    }
  }

  handleIncrementButton (valueToChange) {
    return () => {
      this.setState((prevState) => {
        //Starting with ECMAScript 2015, the object initializer syntax also supports computed property names.
        // That allows you to put an expression in brackets [], that will be computed and used as the property name.
        let key = valueToChange;
        return {[key] : prevState[key] +1};
      })
    }
  }

  handleDecrementButton (valueToChange) {
    return () => {
      this.setState((prevState) => {
        //Starting with ECMAScript 2015, the object initializer syntax also supports computed property names.
        // That allows you to put an expression in brackets [], that will be computed and used as the property name.
        let key = valueToChange;
        if(prevState[key] !== 0) return {[key] : prevState[key] -1};
      })
    }
  }

  render() {
    return(
      <div id="TimerInnerWrapper">
        <TimerInput
          timerOptions={this.state}
          handleIncrementButton={this.handleIncrementButton.bind(this)}
          handleDecrementButton={this.handleDecrementButton.bind(this)}
        />
        <Timer timerOptions={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<TimerApp />, document.getElementById('app'));
