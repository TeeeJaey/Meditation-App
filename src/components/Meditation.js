import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer(props) {
    const expiryTimestamp = props.expiryTimestamp
    const { seconds, minutes, pause } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('onExpire called')
    });

    let sec = seconds;
    if (minutes === 1) sec = 60;
    if (sec === 0) props.toggleMeditating(false);

    let stopClass = "btn red-button ";
    if(!props.showStop) stopClass+="display-none";

    return (
        <div style={{ textAlign: 'center', marginTop:"100px" }}>
            <h2> Meditating for one minute with <span style={{color:"red"}}>{props.meditatingWith}</span> </h2>
            <div style={{ fontSize: '100px' }}>
                <span>{sec}</span>
            </div>
            <button onClick={pause} className={stopClass} onClick={()=>props.toggleMeditating(false)}> Stop session </button>
        </div>
    );
}

export default function Meditation(props) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + props.sec); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} showStop={props.showStop} meditatingWith={props.meditatingWith} toggleMeditating={(toggle)=>props.toggleMeditating(toggle)} />
    </div>
  );
}
