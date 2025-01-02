import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import awsExports from "./aws-exports";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WorkoutPlanner from "./pages/WorkoutPlanner";
import WorkoutViewer from "./pages/WorkoutViewer";

// Configure Amplify
import { Amplify } from "aws-amplify";
Amplify.configure(awsExports);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        console.log("User is already signed in:", user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("No user signed in:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <a href="/">AP</a>
          </div>
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <a href="/viewer" className="font-bold hover:underline">Viewer</a>
              <a href="/planner" className="font-bold hover:underline">Planner</a>
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white py-1 px-3 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <SignUp />
              )
            }
          />
          {isLoggedIn && (
            <>
              <Route path="/planner" element={<WorkoutPlanner />} />
              <Route path="/viewer" element={<WorkoutViewer />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
