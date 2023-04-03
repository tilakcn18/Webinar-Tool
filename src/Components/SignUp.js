import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { Form, Button,Card } from "react-bootstrap";
import "../CSS/signup.css"

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("India");
  const [signupTime, setSignupTime] = useState(new Date().toISOString());
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create new user with email and password in Authentication
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Add user data to Firestore
      await db.collection("accounts").doc(user.uid).set({
        email,
        fullName,
        country,
        signupTime,
        status,
      });

      // Redirect user to home page after successful signup
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card className="signup-card">
    <Card.Body>
    <Form className="signup-form" onSubmit={handleSignup}>
      <h2 id="h2forsignup">Sign Up</h2>
      <Form.Group controlId="formFullName" className="text-center mb-3">
        <Form.Label >Full Name:</Form.Label>
        <Form.Control
         className="text-center"
          type="text"
          placeholder="Enter your FullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="text-center mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
         className="text-center"
        
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="text-center mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
         className="text-center"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formCountry" className=" text-center mb-4">
        <Form.Label>Country:</Form.Label>
        <Form.Control
         className="text-center"
          as="select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
        </Form.Control>
      </Form.Group>

      <Button id="signup-button" className="mb-3 " variant="success" type="submit">
        SIGN UP
      </Button>

      <p className="text-center ">
        Already have an account?{" "}
        <Link className="text-success" id="signup-link" to="/">
          {" "}
          Login
        </Link>
      </p>
    </Form>
    </Card.Body>
    </Card>
  );
}

export default Signup;
