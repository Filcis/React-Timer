import React from 'react';
import {Controls} from './Controls';

export class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.initialClockTime,
      playing: false
    }
  }

  //TODO pass array of availible training states to <Clock />

  countDown() {
    // decrement state as long as its bigger than 0
    if (this.state.timeLeft !== 0) {
      this.setState((prevState) => {
        return {timeLeft: prevState.timeLeft -1}
      });
    } else {
      this.pauseTimer();
    }
  }

  startTimer() {
    this.TimerInstantion = setInterval(this.countDown.bind(this) , 1000);
  }

  toggleTimerHandler() {
    this.setState((prevState) => {
      return {playing: !prevState.playing};
    });
  }

  pauseTimer() {
    clearInterval(this.TimerInstantion);
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.playing !== prevState.playing){
      this.state.playing ? this.startTimer() : this.pauseTimer();
    }
  }

  render() {
    return (
      <div className = "Clock">
        <p>Pozostały czas: {this.state.timeLeft}</p>
        <Controls playing= {this.state.playing} toggleTimerHandler = {this.toggleTimerHandler.bind(this)}/>
      </div>
    )
  }
}
