import React from 'react';

export const Controls = (props) => {

  let button = props.playing ? "pause" : "start";

  return (
    <div>
    <button onClick={props.toggleTimerHandler}>{button}</button>
    <button>reset</button>
    </div>
  )
}
