import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import { useRequest } from "../services/RequestContext";
import { useHistory } from "react-router-dom";
import SeekerDashboardContent from "./SeekerDashboardContent";
import TrainerDashboardContent from "./TrainerDashboardContent";
import Meditation from "./Meditation";
import Constants from "../Constants";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const { currentRequest } = useRequest();
  const [ meditating, setMeditating ] = useState(false);
  const [ meditatingWith, setMeditatingWith ] = useState("");
  const history = useHistory();
  
  let showStop = false;
  if(currentUser.type === Constants.userTypes.trainer)
    showStop = true;
  
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  let dashboardDisplay = 0;
  if(currentRequest && currentRequest.status !== Constants.requestStatus.active) {
    if(currentUser.type === Constants.userTypes.seeker)
        dashboardDisplay = 1;
    else 
      dashboardDisplay = 2;
     
  }

  return (
      <div className="card" style={{height:"90vh"}}>
        <div className="card-header">
          <div className="dashboard-header" >
            <div className="dashboard-header-data" >
              <span style={{margin: "auto 0px", marginRight:"15px"}}>
                <strong>User:</strong> {currentUser.email}
              </span>
              <span style={{margin: "auto 0px", textTransform: "capitalize"}}>
                <strong>Type:</strong> {currentUser.type}
              </span>
            </div>
            <Button variant="link" onClick={handleLogout} className="red-button" disabled={meditating}>
              Log Out
            </Button>
          </div>
                {error && <Alert variant="danger">{error}</Alert>}
        </div>

        { dashboardDisplay === 0 && 
            <Meditation sec={60} showStop={showStop}  />
        }
        { dashboardDisplay === 1 && 
            <SeekerDashboardContent /> 
        }
        { dashboardDisplay === 2 && 
            <TrainerDashboardContent /> 
        }
      
      </div>
  );
}
