import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Resources from './components/Resources';
import PlannerPage from './pages/PlannerPage';
import About from './components/About';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/PlannerPage" element={<PlannerPage />} />
        <Route path="/About" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;