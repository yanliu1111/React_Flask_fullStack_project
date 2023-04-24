import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import NavBarr from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import SignUpPage from "./components/Signup";
import LoginPage from "./components/Login";
import CreateRecipePage from "./components/CreateRecipe";
import "./styles/main.css";

// 1st api call test
const App = () => {
  // useEffect(() => {
  //   fetch("/api/recipe/hello")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMessage(data.hello);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // const [message, setMessage] = useState("");

  return (
    <Router>
      <div className="">
        <NavBarr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create_recipe" element={<CreateRecipePage />} />
        </Routes>
      </div>
    </Router>
  );
};

<roots className="render">
  {createRoot(document.getElementById("root")).render(<App />)}
</roots>;
