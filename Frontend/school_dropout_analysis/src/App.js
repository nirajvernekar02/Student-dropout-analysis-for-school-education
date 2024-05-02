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
<<<<<<< HEAD
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
=======
>>>>>>> f744e7604ec0b61b7d1a0022aab65aea25794278

>>>>>>> 0202838f646cc4d95f0154d881c64815e975502f
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/HOME" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
          <Route path="/" element={<Landing />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<IndiaMap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
=======
          <Route path="/landing" element={<Landing />} />
<<<<<<< HEAD
          <Route path="/contact" element={<Contact/>}></Route>
=======
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/map" element={<IndiaMap/>}/>
>>>>>>> f744e7604ec0b61b7d1a0022aab65aea25794278
>>>>>>> 0202838f646cc4d95f0154d881c64815e975502f
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
