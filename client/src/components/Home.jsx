import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, logout } from "../auth";
import Recipe from "./Recipe";

const LoggedInHome = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("/api/recipe/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1 className="heading">List of Recipes</h1>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
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
