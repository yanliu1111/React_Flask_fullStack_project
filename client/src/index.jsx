import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  useEffect(() => {
    fetch("/api/recipe/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
