import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert ,Card} from "react-bootstrap";
import { auth, db } from "../firebase";
import "../CSS/login.css";
// import { Card } from "react-bootstrap";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Sign in the user with their email and password
      await auth.signInWithEmailAndPassword(email, password);

      // Get the user's email from Firestore
      const userRef = db.collection("accounts").doc(auth.currentUser.uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userEmail = userDoc.data().email;

        // Check if the user's email in Firestore matches their email in Authentication
        if (userEmail === email) {
          navigate("/home"); // Allow user to login
        } else {
          throw new Error(
            "Authentication and Firestore credentials do not match."
          ); // Give error message
        }
      } else {
        throw new Error("User document does not exist in Firestore"); // Give error message
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = () => {};

  return (
    <Card className="login-card">
    <Card.Body>
    <Form className="login-form"   onSubmit={handleSubmit}>
      <h2 id="h2forlogin">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicEmail" className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          
          type="email"
          placeholder="Enter your Email"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      
      <Button id="login-button" onClick={handleClick} type="submit" variant="success mt-4">LOGIN</Button>{' '}
       
      <Link id="login-link" className="text-success mt-3 text-center" to="/forgot-password">
        Forgot Password?
      </Link>
      <p className="mt-3">
        Don't have an account?{" "}
        <Link className="text-success" id="login-link" to="/signup">
          Create an account
        </Link>
      </p>
    </Form>
    </Card.Body>
    </Card>
   
  );
}

export default LoginForm;
