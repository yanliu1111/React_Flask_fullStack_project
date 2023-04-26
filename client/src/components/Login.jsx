import React, { useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import { useForm } from "react-hook-form";
const LoginPage = () => {
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const loginUser = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("/api/auth/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
      });

    reset();
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
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          {errors.username && errors.username.type === "required" && (
            <p style={{ color: "red" }} className="error">
              <small>Username is required</small>
            </p>
          )}
          {errors.username?.type === "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Username should be less than 25 characters</small>
            </p>
          )}
          <br />
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </Form.Group>
          {errors.password && errors.password.type === "required" && (
            <p style={{ color: "red" }} className="error">
              <small>Password is required</small>
            </p>
          )}

          <br />
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              type="submit"
              onClick={handleSubmit(loginUser)}
            >
              Login
            </Button>
          </Form.Group>
          <br />
          <Navbar.Text>
            Do not have Account? <a href="signup">Sign Up</a>
          </Navbar.Text>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
