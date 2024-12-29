import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Planner from './pages/Planner';

function App() {
  return (
    <Router>
      <div className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between">
          <Link to="/" className="font-bold text-lg">
            Login
          </Link>
          <Link to="/planner" className="font-bold text-lg">
            Planner
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default App;
