import React from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import AccountGenerator from "./components/AccountGenerator";

function App() {
  // TODO: detect internet connection changes in real-time
  const isOnline: boolean = navigator.onLine;

  return (
    <div>
      <NavBar isOnline={isOnline}></NavBar>
      <div>
        <AccountGenerator></AccountGenerator>
      </div>
    </div>
  );
}

export default App;
