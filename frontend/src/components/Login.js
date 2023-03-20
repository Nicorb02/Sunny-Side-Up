import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <body className="login-body">
        <div className="login-form">
            <p className="welcome-text">Welcome Back</p>
            <section className="email-section">
                <div className="email-div">
                    <span className="email-name">Email Address</span>
                    <input type="text" className="field-input"></input>
                </div>
            </section>
            <section className="password-section">
                <div className="password-div">
                    <span className="password-name">Password</span>
                    <input type="text" className="field-input"></input>
                </div>
            </section>
            <section className="login-form-bottom">
                <button className="login-button">Login</button>
                <p className="register-prompt">Don't have an account?</p>
                <a href="#" className="go-register-button">Register</a>
            </section>
        </div>
        <div className="loginpage-background">
            <div className="title-div">
                <p className="title-text">Sunny Side Up</p>
            </div>
        </div>
    </body>
  );
}

export default Login;