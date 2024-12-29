import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Enter your email" />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;