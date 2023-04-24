import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Navbarr from "./components/Navbar";

// eslint-disable-next-line react-refresh/only-export-components
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
    <div className="container">
      <Navbarr />
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
