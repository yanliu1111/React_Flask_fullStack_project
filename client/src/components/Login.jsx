import React, { useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");

  const loginUser = () => {
    console.log(username, password);
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="heading">Login Page</h1>
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
            <Button
              as="sub"
              variant="primary"
              type="submit"
              onClick={loginUser}
            >
              Login
            </Button>
          </Form.Group>
          <Navbar.Text>
            Don't have Account? <a href="signup">Sign Up</a>
          </Navbar.Text>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
