
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import PlannerPage from './pages/PlannerPage';
import TestingPage from './pages/TestingPage';
import Contacts from './components/Contacts';
import AgendaPage from './pages/AgendaPage';
import About from './components/About';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {useState} from "react";


// jenna branch
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/PlannerPage" element={<PlannerPage />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/AgendaPage" element={<AgendaPage />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;