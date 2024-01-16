import React, { useState } from 'react';
import '../SignUpForm.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Email': email
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`${isLogin ? 'Login' : 'Sign Up'} successful`);
        localStorage.setItem('token', data.token); // Simpan token ke 
        localStorage.setItem('userEmail', email); // Simpan email penerima ke localStorage
        navigate('/mail');
      } else {
        console.error(`${isLogin ? 'Login' : 'Sign Up'} failed:`, data.error);
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'signing up'}:`, error);
      setError(`Error ${isLogin ? 'logging in' : 'signing up'}`);
    }

    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <h2 style={{color: '#fff', fontSize: '30px', marginBottom: '60px' }}>{isLogin ? 'Login' : 'Sign Up'} - PacMail</h2>
      <form className="signup-form" onSubmit={handleFormSubmit} method="post">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group password-input-container">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`eye-icon ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="toggle-link">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default LoginSignup;