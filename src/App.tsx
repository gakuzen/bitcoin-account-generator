import React from "react";
import Navbar from "react-bootstrap/Navbar";

import "./App.css";
import AccountGenerator from "./components/AccountGenerator";

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="">Bitcoin account generator</Navbar.Brand>
      </Navbar>
      <div>
        <AccountGenerator></AccountGenerator>
      </div>
    </div>
  );
}

export default App;
