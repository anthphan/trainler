import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import WorkoutPlanner from './pages/WorkoutPlanner';
import WorkoutViewer from './pages/WorkoutViewer';

function App() {
  const [workoutSplits, setWorkoutSplits] = useState([]);

  return (
    <Router>
      <div className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between">
          <Link to="/" className="font-bold text-lg">
            Login
          </Link>
          <Link to="/viewer" className="font-bold text-lg">
            Viewer
          </Link>
          <Link to="/planner" className="font-bold text-lg">
            Planner
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/planner" element={<WorkoutPlanner workoutSplits={workoutSplits} setWorkoutSplits={setWorkoutSplits} />} />
        <Route path="/viewer" element={<WorkoutViewer workoutSplits={workoutSplits}/>} />
      </Routes>
    </Router>
  );
}

export default App;
