import React from 'react';
import './CSS/Login.css';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const handleSubmit = () => {
    const validation = true;

    if (validation) {
      login({ email, password });
    } else {
      alert('Validation failed');
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-title"><span>Login Form</span></div>
          <section>
            <div className="login-row">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
            </div>
            <div className="login-row">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            </div>
            <div className="login-pass"><a href="#">Forgot password?</a></div>
            <div className="login-row login-button">
              <input type="submit" value="Login" onClick={handleSubmit} />
            </div>
            <div className="login-signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
