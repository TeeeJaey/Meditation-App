import React from 'react';
import { useTimer } from 'react-timer-hook';
import Constants from '../Constants';
import { useAuth } from '../services/AuthContext';
import { useRequest } from '../services/RequestContext';

function MyTimer(props) {
    const { currentRequest, deleteRequest } = useRequest();
    const { currentUser } = useAuth();
    const expiryTimestamp = props.expiryTimestamp
    const { seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => console.log('MyTimer onExpire')
    });

    if(currentRequest) {
      
      let sec = seconds;
      if (minutes === 1) sec = 60;
      if (sec === 0) deleteRequest(false);

      let stopClass = "btn red-button ";
      if(!props.showStop) stopClass+="display-none";

      let meditationWith = "Someone";
      if(currentUser.type === Constants.userTypes.trainer && currentRequest.reciever === currentUser.email)
          meditationWith = currentRequest.sender;
      if(currentUser.type === Constants.userTypes.seeker && currentRequest.sender === currentUser.email)
          meditationWith = currentRequest.reciever;

      return (
            <div style={{ textAlign: 'center', marginTop:"100px" }}>
                <h2> Meditating for one minute with <span style={{color:"red"}}>{meditationWith}</span> </h2> 
                <div style={{ fontSize: '100px' }}>
                    <span>{sec}</span>
                </div>
                <button onClick={()=>deleteRequest()} className={stopClass} > Stop session </button>
            </div>
      );
  }
  return <div/>;
}

export default function Meditation(props) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + props.sec);
  return (
    <div>
      <MyTimer expiryTimestamp={time} showStop={props.showStop} />
    </div>
  );
}
