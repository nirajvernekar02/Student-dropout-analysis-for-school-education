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
<<<<<<< HEAD
import Contact from "./components/Contact/Contact";
=======
import Analytics from "./components/Analytics/Analytics";
import IndiaMap from "./components/Map/map";
>>>>>>> f744e7604ec0b61b7d1a0022aab65aea25794278

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
<<<<<<< HEAD
          <Route path="/contact" element={<Contact/>}></Route>
=======
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<IndiaMap/>}/>
>>>>>>> f744e7604ec0b61b7d1a0022aab65aea25794278
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

const Home = () => {
  return <h1>Welcome to the School Student Dropout Analysis App</h1>;
};

export default App;
