import "./App.css";
import React from "react";
import Home from "../src/pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { DriverProvider } from "./users/DriverProvider";

function App() {
  return (
    <React.StrictMode>
      <DriverProvider>
        <Home />
      </DriverProvider>
    </React.StrictMode>
  );
}

export default App;
