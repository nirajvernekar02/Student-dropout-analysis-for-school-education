import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/Authentication/Sign_up";
import Login from "./components/Authentication/Log_in";
import Landing from "./components/Landing Page/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import Analytics from "./components/Analytics/Analytics";
import IndiaMap from "./components/Map/map";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/HOME" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Landing />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<IndiaMap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

const Home = () => {
  return <h1></h1>;
};

export default App;
