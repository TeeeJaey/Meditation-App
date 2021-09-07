import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import TrainerService from "../services/TrainerService";
import Meditation from "./Meditation";

export default function DashboardContent() {
  const { currentUser } = useAuth();
  const [ availableTrainers, setAvailableTrainers ] = useState([]);
  const [ meditating, setMeditating ] = useState(false);
  
  //const availableTrainers = ["trainer-1", "trainer-2"];
  useEffect(() => {
    TrainerService.getAll().on("value", dbTrainerList => {
        let dbAvailableTrainers = [];
        dbTrainerList.forEach(dbTrainerRef => {
            const dbTrainer = dbTrainerRef.val();
            if(dbTrainer && dbTrainer.available)  {
              dbAvailableTrainers.push(dbTrainer.email);
            }
        });
        setAvailableTrainers(dbAvailableTrainers);
    });       
  },[]);
  
  if(meditating)
    return <Meditation sec={60} showStop={true} stopMeditation={()=>setMeditating(false)} />

  if(currentUser.type == "seeker") {
    if(availableTrainers && availableTrainers.length > 0)
        return (
              <div className="card-body">
                <h5 className="card-title"> Showing avaliable trainers </h5>
                <ListGroup>
                  {availableTrainers.map(trainer => {
                      return (
                      <ListGroup.Item key={trainer} className="trainer-list" > 
                        <span style={{margin:"auto 0"}} > {trainer} </span>  
                        <button className="btn btn-info" style={{float:"right"}} onClick={()=>setMeditating(true)} > Request </button>
                      </ListGroup.Item>);
                  })}
                  </ListGroup>
              </div>
        );
    else
        return (
              <div className="card-body">
                <h5 className="card-title"> No avaliable trainers </h5>
              </div>
        );
  }
  else
    return (
          <div className="card-body">
            <h5 className="card-title"> Waiting for seeker </h5>
          </div>
    );
}
