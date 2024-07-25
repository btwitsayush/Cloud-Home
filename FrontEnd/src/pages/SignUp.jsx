import React, { useState } from 'react';
import './CSS/SignUp.css';
import useSignUp from '../hooks/useSignUp';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useSignUp();

  const handleSubmit = () => {
    const validation = true;

    if (validation) {
      signUp({ name, email, password });
    } else {
      alert('Validation failed');
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <h2>Registration</h2>
        <section id='form'>
          <div className="signup-input-box">
            <input type="text" placeholder="Enter your name" onChange={(e) => { setName(e.target.value) }} value={name} />
          </div>
          <div className="signup-input-box">
            <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
          </div>
          <div className="signup-input-box">
            <input type="password" placeholder="Create password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
          </div>
          <div className="signup-policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>
          <div className="signup-input-box signup-button">
            <button onClick={handleSubmit}>Register Now</button>
          </div>
          <div className="signup-text">
            <h3>Already have an account? <Link to="/login">Login now</Link></h3>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
