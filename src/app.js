import React from 'react';
import ReactDOM from 'react-dom';
import {TimerInput} from './components/TimerInput';
import {Clock} from './components/Clock';
import {Controls, OptionsButton} from './components/Buttons';
import 'normalize.css';
import './style/scss/style.scss'

class TimerApp extends React.Component {
  constructor() {
    super();

    this.state = {
      //initial timer options
        intervalTime : 6,
        restTime: 3,
        sets: 3,

        isActive: false,
        isPlaying: false,

        currentTime: 6,
        currentSets: 3,

        currentTrainingState: "training",
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

  startTraining () {
    this.setState(() => {
      // set state to active, update current time and sets
      return {isActive: true, currentTime:this.state.intervalTime, isPlaying: true}
    });

  }

  togglePlayHandler () {
    this.setState((prevState) => {
      return {isPlaying: !prevState.isPlaying}
    }
  );
  }

  decrementState(state, value = 1) {
    this.setState((prevState) => {
      return {[state]: prevState[state] - value}
    });
  }

  countDown() {
    // decrement state as long as its bigger than 0
    if (this.state.currentTime !== 0) {
      this.decrementState("currentTime", 1);
    } else {
      if (this.state.currentSets !== 0 && this.state.currentTrainingState === "training") {
        this.decrementState("currentSets", 1);
      } else if(this.state.currentSets === 0) {
        this.resetClock();
        return;
      }
      this.switchTrainingState();
    }
  }

  startClock() {
    this.TimerInstantion = setInterval(this.countDown.bind(this) , 1000);
  }

  pauseClock() {
    clearInterval(this.TimerInstantion);
  }

  resetClock() {
    this.pauseClock();
    this.setState({isPlaying: false, isActive: false, currentTime: this.state.intervalTime, currentSets: this.state.sets});
  }

  switchTrainingState() {
    this.setState((prevState) => {
      if (this.state.currentTrainingState === "training") {
        return {currentTrainingState: "resting", currentTime: this.state.restTime};
      } else {
        return {currentTrainingState: "training", currentTime: this.state.intervalTime};

      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isPlaying !== prevState.isPlaying) {
      this.state.isPlaying ? this.startClock() : this.pauseClock();
    }
  }

  render() {
      return(
        <div className="container">
          <MenuBar />
          <div className="mainContentWrapper">
          <TimerInput
            timerOptions={this.state}
            handleIncrementButton={this.handleIncrementButton.bind(this)}
            handleDecrementButton={this.handleDecrementButton.bind(this)}
          />
          <Clock
          isActive={this.state.isActive}
          trainingState={this.state.currentTrainingState}
          currentTime={this.state.currentTime}
          initialTime={this.state.intervalTime}
          restTime={this.state.restTime}
           />
          <Controls
           isActive={this.state.isActive}
           startButtonHandler={this.startTraining.bind(this)}
           togglePlayButtonHandler={this.togglePlayHandler.bind(this)}
           resetHandler={this.resetClock.bind(this)}
           />
          </div>
        </div>
      );
  }
}

const MenuBar = (props) => {
  return (
    <menu>
      <h1>{props.title}</h1>
    </menu>
  )
}

ReactDOM.render(<TimerApp />, document.getElementById('app'));
