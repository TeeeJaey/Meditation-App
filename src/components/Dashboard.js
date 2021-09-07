import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../services/AuthContext";
import { useHistory } from "react-router-dom";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
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
            <Button variant="link" onClick={handleLogout} className="red-button">
              Log Out
            </Button>
          </div>
        </div>

        <DashboardContent/>
      </div>
  );
}
