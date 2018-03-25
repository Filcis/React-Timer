import React from 'react';

export const Controls = (props) => {

  let button = props.playing ? "pause" : "start";
  const isActive = props.isActive;

  return (
    <div>
    { isActive
      ? (<div><TogglePlay togglePlayButtonHandler={props.togglePlayButtonHandler}/> <Stop resetHandler={props.resetHandler}/></div>)
      : (<Start startButtonHandler={props.startButtonHandler}/>)
    }
    </div>
  )
}

const Start = (props) => {
  return <button onClick={props.startButtonHandler}>start</button>
}

const TogglePlay = (props) => {
  return <button onClick={props.togglePlayButtonHandler}>play / pause</button>
}

const Stop = (props) => {
  return <button onClick={props.resetHandler}>stop</button>
}
