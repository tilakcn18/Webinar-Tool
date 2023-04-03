import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "../CSS/forgot.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("A password reset link has been sent to your email.");
    } catch (error) {
      alert("Failed to send password reset link.");
    }
  };

  return (
    <Card className="forgot-card">
      <Card.Body>
     
      <Form className="forgot-form" onSubmit={handleSubmit}>
      <h2 id="h2forgot" style={{ textAlign: "center" }}>
        Forgot Password
      </h2>
        <Form.Group controlId="formBasicEmail" className="mb-4">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your Email to reset your Password"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>
       
        <Button variant="success" id="forgot-button" type="submit">
          Click
        </Button>
      </Form>
      </Card.Body>
    </Card>
  );
}

export default ForgotPassword;
