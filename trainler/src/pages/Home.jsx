import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ isLoggedIn }) {
  const navigate = useNavigate();

  return (
    <div className="p-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Workout Planner</h1>
      <p className="text-lg text-gray-600 mb-8">
        Plan and track your workouts efficiently. Create splits, manage your weekly workouts, and achieve your fitness goals!
      </p>
      <div className="flex justify-center space-x-4">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/viewer")}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              View Workouts
            </button>
            <button
              onClick={() => navigate("/planner")}
              className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
            >
              Plan Workouts
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
