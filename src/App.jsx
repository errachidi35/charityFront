import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Missions } from "./pages/Missions";
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Gallery } from "./pages/Gallery"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup";
import { MissionsGrid } from "./components/Missions/MissionsGrid";
import { Donation } from "./pages/Donation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>Page Not Found</div>}></Route>
        <Route path="/" element={<MissionsGrid />} />
    <Route path="/donate/:id" element={<Donation />} />
      </Routes>
    </Router>

  );
}

export default App;
