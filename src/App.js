import React from "react";
import './App.css';
import ProjectRoutes from './Routes';  // Import the routes component
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>  
      <ProjectRoutes /> 
    </Router>
  );
}

export default App;
