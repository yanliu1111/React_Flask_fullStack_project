import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../auth";
import Recipe from "./Recipe";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => setShow(false);
  const showModal = (id) => {
    setShow(true);
    setRecipeId(id);
    recipes.map((recipe) => {
      if (recipe.id === id) {
        setValue("title", recipe.title);
        setValue("description", recipe.description);
      }
    });
  };
  const updateRecipe = (data) => {
    console.log(data);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    // console.log(token); //Sorry to GR
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    };
    fetch(`/api/recipe/recipe/${recipeId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const reload = window.location.reload();
        reload();
      })
      .catch((err) => console.log(err));
    reset();
  };

  useEffect(() => {
    fetch("/api/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getAllRecipes = () => {
    fetch("/api/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteRecipe = (id) => {
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    fetch(`/api/recipe/recipe/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getAllRecipes();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Modal show={show} size="lg" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Update Recipe</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                {...register("title", { required: true, maxLength: 25 })}
              />
            </Form.Group>
            {errors.title && (
              <p style={{ color: "red" }}>
                <small>Title is required</small>
              </p>
            )}
            {errors.title?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Title should be less than 25 characters</small>
              </p>
            )}
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Enter Description"
                {...register("description", { required: true, maxLength: 255 })}
              />
            </Form.Group>
            {errors.description && (
              <p style={{ color: "red" }}>
                <small>Description is required</small>
              </p>
            )}
            {errors.description?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Description should be less than 255 characters</small>
              </p>
            )}
            <br />
            <Form.Group>
              <Button variant="primary" onClick={handleSubmit(updateRecipe)}>
                {/* ihavequestion */}
                Update
              </Button>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
      <h1 className="heading">List of Recipes</h1>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          onClick={() => showModal(recipe.id)}
          // ihavequestion
          onDelete={() => {
            deleteRecipe(recipe.id);
          }}
        />
      ))}
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the Secret Recipes</h1>

      <Link to="/signup" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

const HomePage = () => {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default HomePage;
