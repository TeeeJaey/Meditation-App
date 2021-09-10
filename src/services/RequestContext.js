import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import TrainerService from "./TrainerService";
import RequestService from "./RequestService";
import Constants from "../Constants";
import { useAuth } from "../services/AuthContext";

const RequestContext = React.createContext()

export function useRequest() {
  return useContext(RequestContext)
}

export function RequestProvider({ children }) {
    const { currentUser } = useAuth();
    const [currentRequest, setCurrentRequest] = useState();

    const activateRequest = (req) => {
        setCurrentRequest(req);
        return RequestService.update(req.id, {status : Constants.requestStatus.active});
    };

    const deleteRequest = ()=>{
        return RequestService.delete(currentRequest.id);
    };

    useEffect(() => {
        RequestService.getAll().onSnapshot(requestList => {
            let curreq = {};
            requestList.forEach(requestRef => {
                const request = requestRef.data();
                request.id = requestRef.id;
                if(request.status !== Constants.requestStatus.pending) {
                    if(currentUser.type === Constants.userTypes.trainer && request.reciever === currentUser.email)
                    {
                        request.with = request.sender;
                        curreq = request;
                    }
                    if(currentUser.type === Constants.userTypes.seeker && request.sender === currentUser.email)
                    {
                        request.with = request.reciever;
                        curreq = request;
                    }
                }
            });
            setCurrentRequest(curreq);
        });
    }, []);

    const value = {
        currentRequest,
        activateRequest,
        deleteRequest
    }

    return (
        <RequestContext.Provider value={value}>
        {children}
        </RequestContext.Provider>
    )
}
