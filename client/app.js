import React from 'react';
import ReactDOM from 'react-dom';
import {TimerClock} from './TimerClock';
import {TimerInput} from './TimerInput';
import './scss/style.scss'

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingTime: 15,
      restTime: 5,
      repetitions: 5,
      coolDown: 10,
      playing: false,
      rest: false,
    }
    this.toggleTimer = this.toggleTimer.bind(this);
  }

//save initial time values for resetting
  componentWillMount () {
    this.setState({
       initialRepetitions: this.state.repetitions,
       currentClockState: this.state.trainingTime,
     });
  }

// toggle if timer is playing
  toggleTimer(e) {
    this.setState((prevState) => {
      return {playing: !prevState.playing};
    });
  }

// start or pause countdown if playing state changed
  componentDidUpdate(prevProps, prevState) {
    if(this.state.playing !== prevState.playing) {
      if (this.state.playing) {
        this.countDownTimer()
      } else {
        this.pauseTimer()
      }
    }
    if(!this.state.repetitions && !this.state.rest) {
        this.pauseTimer()
    }
  }

  resetTimer() {
    this.setState({currentClockState: this.state.trainingTime, playing: false, rest:false});
  }

  pauseTimer() {
    clearInterval(this.Timer);
  }

  countDownTimer() {
      this.Timer = setInterval( () => {
        let newValue = this.state.currentClockState;
        let rest = this.state.rest;
        let state = {currentClockState: newValue  -1}
        if(!newValue && !rest) {
          state.currentClockState = this.state.restTime;
          state.repetitions = this.state.repetitions -1;
          state.rest = !rest;
        } else if(!newValue && rest) {
          state.currentClockState = (this.state.repetitions ? this.state.trainingTime : 0);
          state.rest = !rest;
        }
        this.setState(state);
      }, 1000);
  }

  render() {

    if (this.state.playing) {
      var playButtonValue = "stop";
    } else {
      var playButtonValue = "start";
    }

    return(
      <div>
        <TimerClock rest={this.state.rest} isPlaying={this.state.playing} restTime={this.state.restTime} overallTime={this.state.trainingTime} clockValue={this.state.currentClockState} reps={this.state.repetitions}/>
        <TimerInput />
        <button onClick={this.toggleTimer}>{playButtonValue}</button>
        <button onClick={this.resetTimer.bind(this)}>reset</button>
      </div>
    );
  }
  handleChange(e) {
    //handle timer input change
  }
}

ReactDOM.render(<Timer />, document.getElementById('app'));
