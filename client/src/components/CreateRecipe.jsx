import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
const CreateRecipePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createRecipe = (data) => {
    console.log(data);
    const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    console.log(token);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(data),
    };
    fetch("/api/recipe/recipes", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div className="container">
      <h1>Create A Recipe</h1>
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
          <Button variant="primary" onClick={handleSubmit(createRecipe)}>
            {/* ihavequestion */}
            Save
          </Button>
        </Form.Group>
      </form>
    </div>
  );
};

export default CreateRecipePage;
