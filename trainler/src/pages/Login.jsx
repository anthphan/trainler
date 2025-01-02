import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "aws-amplify/auth";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check if a user is already logged in (only once on component mount)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser(); // Check if there's an active session
        console.log("Already signed in:", user);
        navigate("/"); // Redirect to planner if user is already logged in
      } catch (error) {
        console.log("No user signed in:", error);
      }
    };
    checkAuth();
  }, []); // Empty dependency array ensures it runs only once

  const handleLogin = async () => {
    try {
      await signIn({
        username: email,
        password,
      });
      onLogin();
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage(error.message || "An error occurred during login.");
    }
  };

  const handleSignUpNavigation = () => {
    navigate("/signup");
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
      >
        Log In
      </button>

      {/* Sign Up Button */}
      <button
        onClick={handleSignUpNavigation}
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 mt-3"
      >
        Sign Up
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default Login;
