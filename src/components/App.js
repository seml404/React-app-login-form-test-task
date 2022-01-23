import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authorization from "./Authorization";
import LoginOrAuthorize from "./LoginOrAuthorize";
import Registration from "./Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginOrAuthorize />}></Route>
        <Route path="/authorise" element={<Authorization />}></Route>
        <Route path="/register" element={<Registration />}></Route>
      </Routes>
    </div>
  );
}

export default App;
