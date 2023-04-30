import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PlannerPage from './pages/PlannerPage';
import TestingPage from './pages/TestingPage';
import About from './components/About';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/PlannerPage" element={<PlannerPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/TestingPage" element={<TestingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;