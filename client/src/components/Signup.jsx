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
          {errors.username && (
            <span style={{ color: "red" }}>Username is required</span>
          )}
          <br />
          {errors.username?.type == "maxLength" && (
            <span style={{ color: "red" }}>
              Username cannot exceed 25 characters
            </span>
          )}
          <br />
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
          {errors.email && (
            <span style={{ color: "red" }}>Email is required</span>
          )}
          <br />
          {errors.email?.type == "pattern" && (
            <span style={{ color: "red" }}>Email is invalid</span>
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
          {errors.password?.type == "required" && (
            <span style={{ color: "red" }}>Password is required</span>
          )}
          <br />
          {errors.password?.type == "minLength" && (
            <span style={{ color: "red" }}>
              Password must be at least 6 characters
            </span>
          )}
          <br />

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
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>Password does not match</span>
          )}
          <br />
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
          <br />
          <Navbar.Text>
            Already have an account? <a href="login">Login</a>
          </Navbar.Text>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
