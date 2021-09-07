import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, InputGroup, FormControl } from "react-bootstrap"
import { useAuth } from "../services/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [type, setType] = useState("seeker");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, type);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  let SeekerTabClass="btn w-50 ";
  let TrainerTabClass="btn w-50 ";
  if(type == "seeker") SeekerTabClass+="selected";
  else TrainerTabClass+="selected";

  return (
    <div className="auth-form">
      <Card >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
        
          <Form.Group id="type">
            <button className={SeekerTabClass} onClick={()=>setType("seeker")} >
              Seeker
            </button>
            <button className={TrainerTabClass} onClick={()=>setType("trainer")} >
              Trainer
            </button>
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
