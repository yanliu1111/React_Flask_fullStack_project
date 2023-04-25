import React, { useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
    reset();
  };

  console.log(watch("username"));
  console.log(watch("email"));
  console.log(watch("password"));
  console.log(watch("confirmPassword"));

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
              {...register("username", { required: true, maxLength: 25 })}
            />
          </Form.Group>
          <br></br>
          {errors.username && (
            <p style={{ color: "red" }}>
              <small>Username is required</small>
            </p>
          )}

          {errors.username?.type == "maxLength" && (
            <p style={{ color: "red" }}>
              <small>Username cannot exceed 25 characters</small>
            </p>
          )}

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
                maxLength: 80,
              })}
            />
          </Form.Group>
          <br></br>
          {errors.email && (
            <p style={{ color: "red" }}>
              <small>Email is required</small>
            </p>
          )}

          {errors.email?.type == "pattern" && (
            <p style={{ color: "red" }}>
              <small>Email is invalid</small>
            </p>
          )}

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </Form.Group>
          <br></br>
          {errors.password?.type == "required" && (
            <p style={{ color: "red" }}>
              <small>Password is required</small>
            </p>
          )}

          {errors.password?.type == "minLength" && (
            <p style={{ color: "red" }}>
              <small>Password must be at least 6 characters</small>
            </p>
          )}

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                validate: (value) => value === watch("password"),
              })}
            />
          </Form.Group>
          <br></br>
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>
              <small>Password does not match</small>
            </p>
          )}

          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              type="submit"
              onClick={handleSubmit(submitForm)}
            >
              Submit
            </Button>
          </Form.Group>
          <br></br>
          <Navbar.Text>
            Already have an account? <a href="login">Login</a>
          </Navbar.Text>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
