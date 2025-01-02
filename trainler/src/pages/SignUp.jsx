import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom"; 
import awsExports from '../aws-exports';

// Configure Amplify once in your root file (or here for demo)
Amplify.configure(awsExports);

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // React Router navigation hook
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Modular Auth: signUp
      await signUp({
        username: email,
        password,
      });
      setMessage('Sign-up successful! Please check your email for confirmation.');
    } catch (error) {
      setMessage(error.message || 'An error occurred during sign-up.');
      console.error('Sign-up error:', error);
    }
  };

  // Navigate to Sign Up page
  const handleLoginNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Sign Up Button */}
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>

      {/* Sign Up Button */}
      <button
        onClick={handleLoginNavigation}
        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mt-3"
      >
        Already a member? Login
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
}

export default SignUp;
