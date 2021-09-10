import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import Constants from "../Constants";
import TrainerService from "../services/TrainerService";
import RequestService from "../services/RequestService";
import { useRequest } from "../services/RequestContext";

export default function SeekerDashboardContent(props) {
  const { currentUser } = useAuth();
  const { activateRequest } = useRequest();
  const [ availableTrainers, setAvailableTrainers ] = useState([]);
  const [ pendingRequests, setPendingRequests ] = useState([]);
  
    useEffect(() => {
        return TrainerService.getAll().onSnapshot(trainerList => {
            const trainers = [];
            trainerList.forEach(trainerRef => {
                const trainer = trainerRef.data();
                trainer.id = trainerRef.id;
                if(trainer.available)
                    trainers.push(trainer);
            });
            setAvailableTrainers(trainers);
        });
    });


    useEffect(() => {
        return RequestService.getAll().onSnapshot(requestList => {
            const requests = [];
            requestList.forEach(requestRef => {
                const request = requestRef.data();
                request.id = requestRef.id;
                if(request.sender === currentUser.email && request.status === Constants.requestStatus.active)
                {
                    activateRequest(request);
                }
                if(request.sender === currentUser.email && request.status === Constants.requestStatus.pending)
                    requests.push(request);
            });
            setPendingRequests(requests);
        });
    });

    const isPending = (trainer) => {
        return pendingRequests.find(req => req.reciever === trainer.email);
    }

    const makeRequest = (reciever) => {
        RequestService.create(currentUser.email, reciever.email);
    };

    if(availableTrainers && availableTrainers.length > 0)
        return (
                <div className="card-body">
                <h5 className="card-title"> Showing avaliable trainers </h5>
                <ListGroup>
                    {availableTrainers.map(trainer => {
                        return (
                        <ListGroup.Item key={trainer} className="trainer-list" > 
                        <span style={{margin:"auto 0"}} > {trainer.email} </span>  
                        {!isPending(trainer) && <button className="btn btn-info" style={{float:"right"}} onClick={()=>makeRequest(trainer)} > Request </button> }
                        {isPending(trainer) && <button className="btn btn-secondary" style={{float:"right"}} disabled > Requested </button> }
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
