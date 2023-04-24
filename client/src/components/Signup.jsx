import React, { useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = () => {
    console.log("submitting form");
    console.log(username, email, password, confirmPassword);
    setUsername("");
    setEmail("");
    setPassowrd("");
    setConfirmPassword("");
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="heading">Sign Up Page</h1>
        <form action="">
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              type="submit"
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form.Group>
          <Navbar.Text>
            Already have an account? <a href="login">Login</a>
          </Navbar.Text>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
