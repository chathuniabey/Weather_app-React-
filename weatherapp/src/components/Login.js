import React, { useEffect, useState } from 'react';
import FrontPage from './FrontPage'; // Import the FrontPage component
import './css/Login.css';  // Import the CSS file

// Create a functional component named Login
const Login = () => {

  // Initialize state variables using useState hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define a function to handle login attempt
  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      // Perform authentication logic here
      // Set token or session information upon successful login

      // Set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // Clear input fields and display error message
      setUsername('');
      setPassword('');
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  // Set document title when the component mounts
  useEffect(() => {
    document.title = 'Weather-app Login';
  }, []);

  if (isLoggedIn) {
    // Render FrontPage component when logged in
    return <FrontPage />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text"   placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>{errorMessage}</p>
    </div>
  );
};

// Export the Login component as the default export
export default Login;