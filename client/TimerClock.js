import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export class TimerClock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const trainingState = this.props.rest === false ? "working" : "rest";

    const currentTime = this.props.clockValue;
    const overallTime = this.props.overallTime;
    const restTime = this.props.restTime;
    const completionPercent = (currentTime/overallTime) * 100;
    const restPercent = (currentTime/restTime) * 100;

    const data = {
        datasets: [{
            label: '# of Votes',
            data: [100 - completionPercent, completionPercent],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 0
        }]
    }

    const data2 = {
        datasets: [{
            label: '# of Votes',
            data: [100 - restPercent, restPercent],
            backgroundColor: [
                'rgba(138, 202, 8, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 0
        }]
    }

    return(
      <div className={trainingState}>
        <h1>Go</h1>
        <div className="clockContainer">
        <Doughnut
          ref="clock"
          data={(this.props.rest === false)? data : data2}
          width={100}
          height={50}
          options={{
          maintainAspectRatio: false
          }}
        />
        </div>
        <h2>sek:{this.props.clockValue}</h2>
        <h3>liczba powtórzeń: {this.props.reps}</h3>
      </div>
    );
  }
}
