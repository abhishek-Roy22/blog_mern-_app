import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BlogsContextProvider } from "./context/BlogsContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogsContextProvider>
        <App />
      </BlogsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
