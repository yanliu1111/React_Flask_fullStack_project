import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const LoggedInLinks = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link  active" to="/create_recipe">
          Create Recipes
        </Link>
      </li>
      <li className="nav-item">
        <a
          className="nav-link active"
          href="#"
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </a>
      </li>
    </>
  );
};

const LoggedOutLinks = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/signup">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/login">
          Login
        </Link>
      </li>
    </>
  );
};

const NavBarr = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Recipes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/create_recipe">
            Create Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Sign Out
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default NavBarr;
