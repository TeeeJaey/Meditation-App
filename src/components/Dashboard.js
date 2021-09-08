import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import { useHistory } from "react-router-dom";
import SeekerDashboardContent from "./SeekerDashboardContent";
import TrainerDashboardContent from "./TrainerDashboardContent";
import Meditation from "./Meditation";
import Constants from "../Constants";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [ meditating, setMeditating ] = useState(false);
  const [ meditatingWith, setMeditatingWith ] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const toggleMeditating = (toggle,medWith="someone") => {
    setMeditating(toggle);
    setMeditatingWith(medWith);
  };

  return (
      <div className="card" style={{height:"90vh"}}>
        <div className="card-header">
          <div className="dashboard-header" >
            <div className="dashboard-header-data" >
              <span style={{margin: "auto 0px", marginRight:"15px"}}>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>User:</strong> {currentUser.email}
              </span>
              <span style={{margin: "auto 0px", textTransform: "capitalize"}}>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Type:</strong> {currentUser.type}
              </span>
            </div>
            <Button variant="link" onClick={handleLogout} className="red-button" disabled={meditating}>
              Log Out
            </Button>
          </div>
        </div>

        {meditating && <Meditation sec={60} showStop={true} toggleMeditating={(toggle)=>toggleMeditating(toggle)} meditatingWith={meditatingWith} />}
        
        {!meditating && currentUser.type === Constants.userTypes.seeker && 
            <SeekerDashboardContent toggleMeditating={(toggle,medWith) =>toggleMeditating(toggle,medWith)} /> 
        }
        
        {!meditating && currentUser.type === Constants.userTypes.trainer && 
            <TrainerDashboardContent toggleMeditating={(toggle,medWith) =>toggleMeditating(toggle,medWith)} /> 
        }
      
      </div>
  );
}
