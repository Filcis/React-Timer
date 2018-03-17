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
        intervalTime : 20,
        restTime: 3,
        sets: 3,

        isActive: false,
        isPlaying: false,
        isOptions: false,

        currentTime: 30,
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

  toggleOptionsHandler () {
    this.setState((prevState) => {
      return {isOptions: !prevState.isOptions}
    }
  );
  }

  togglePlayHandler () {
    this.setState((prevState) => {
      return {isPlaying: !prevState.isPlaying}
    }
  );
  }

  resetHandler () {
    this.setState((prevState) => {
      return {isActive: !prevState.isActive, isPlaying: false}
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
        this.pauseClock();
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
    let content = null;
      if(this.state.isOptions) {
          content = (
            <TimerInput
              timerOptions={this.state}
              handleIncrementButton={this.handleIncrementButton.bind(this)}
              handleDecrementButton={this.handleDecrementButton.bind(this)}
            />
          )
      } else {
        content = (
          <div>
          <Clock
          isActive={this.state.isActive}
          trainingState={this.state.currentTrainingState}
          currentTime={this.state.currentTime}
           />
          <Controls
            isActive={this.state.isActive}
            startButtonHandler={this.startTraining.bind(this)}
            togglePlayButtonHandler={this.togglePlayHandler.bind(this)}
            resetHandler={this.resetHandler.bind(this)}
          />
          </div>
        )
      }

      return(
        <div className="container">
          <MenuBar toggleOptionsHandler={this.toggleOptionsHandler.bind(this)}  isActive={this.state.isActive} title="React Timer"/>
          <div className="mainContentWrapper">
            {content}
          </div>
        </div>
      );
  }
}

const MenuBar = (props) => {
  return (
    <menu>
    <div className="optionsButtonWrapper">
      <OptionsButton toggleOptionsHandler={props.toggleOptionsHandler}  isActive={props.isActive} />
    </div>
      <h1>{props.title}</h1>
    </menu>
  )
}

ReactDOM.render(<TimerApp />, document.getElementById('app'));
