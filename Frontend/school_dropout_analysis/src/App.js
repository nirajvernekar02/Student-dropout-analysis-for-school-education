import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login";

import SignUp from "./components/Authentication/Sign_up";
import Landing from "./components/Landing Page/LandingPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h1>Welcome to the School Student Dropout Analysis App</h1>;
};

export default App;
