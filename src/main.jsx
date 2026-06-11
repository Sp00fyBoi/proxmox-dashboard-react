import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VMProvider } from "./context/VMContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VMProvider>
      <App />
    </VMProvider>
  </React.StrictMode>
);
