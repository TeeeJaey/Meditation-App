import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Constants from "../Constants";
import { useAuth } from "../services/AuthContext";
import { useRequest } from "../services/RequestContext";
import RequestService from "../services/RequestService";

export default function TrainerDashboardContent(props) {
    const { currentUser } = useAuth();
    const { activateRequest } = useRequest();
    const [ pendingRequests, setPendingRequests ] = useState([]);

    useEffect(() => {
        return RequestService.getAll().onSnapshot(requestList => {
            const requests = [];
            requestList.forEach(requestRef => {
                const request = requestRef.data();
                request.id = requestRef.id;
                if(request.reciever === currentUser.email && request.status === Constants.requestStatus.pending)
                    requests.push(request);
            });
            setPendingRequests(requests);
        });
    });

    if(pendingRequests && pendingRequests.length > 0)
        return (
                <div className="card-body">
                    <h5 className="card-title"> You have pending requests </h5>
                    <ListGroup>
                    {pendingRequests.map(req => {
                        return (
                        <ListGroup.Item key={req.id} className="trainer-list" > 
                            <span style={{margin:"auto 0"}} > {req.sender} </span>  
                            <button className="btn btn-info" style={{float:"right"}} onClick={() => activateRequest(req)} > Accept </button>
                        </ListGroup.Item>);
                    })}
                    </ListGroup>
                </div>
            );
    else
        return (
            <div className="card-body">
                <h5 className="card-title"> Waiting for a seeker </h5>
            </div>
        );
}
