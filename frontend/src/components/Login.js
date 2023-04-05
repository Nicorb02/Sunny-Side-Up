import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Blobs from './Blobs';
import '../styles/Login.css';

// imports svgs for password visibility
import EyeOpen from '../styles/assets/EyeOpen';
import EyeClosed from '../styles/assets/EyeClosed';

function Login() {
  // "email" is the variable name, "setEmail" is the function we invoke later in the html to set the email value
  // since email is a string, useState('') is just an empty string
  // reference line 90 for using "setEmail"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // useStates to check if login or register is open
  const [isLoginFormSlid, setIsLoginFormSlid] = useState(false);
  const [isRegisterFormSlid, setIsRegisterFormSlid] = useState(false);
  const [isPassCompFormSlid, setIsPassCompFormSlid] = useState(false);
  // useState to password visibility
  // since showPassword is a boolean, useState(false) initialize it as false
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // toggle password visibility
  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  // if password complexity is valid, then set as password
  function handlePasswordChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(isPasswordValidFunc(newPassword));
  }

  // checking for password complexity 
  // 1 lowercase, 1 uppercase, 1 special, 1 num, length >= 8
  function isPasswordValidFunc(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let flag = regex.test(password);
    setIsPasswordValid(flag);
    return flag;
  }

  // for local and prod testing build paths (connects us to the backend)
  // const app_name = 'ssu-planner'     // prod server
  const app_name = 'ssu-testing'        // testing server
  function buildPath(route)
  {
    // check if we are on a server
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name + '.herokuapp.com' + route;
    }
    // else, we are working locally
    else
    {
        return 'http://localhost:8080' + route;
    }
  }

  // connects to login api
  async function handleLogin() {
    const response = await fetch(buildPath('/api/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // prints to console for now (inspect element to see console)
      if (data.error == '') 
      {
        console.log('good login');
        //useNavigate("/LandingPage");
      }
      else 
      {
        console.error(data.error);
      }
  }

  // connects to register api
  async function handleRegister() {
    // checks for valid password complexity first
    if (!isPasswordValidFunc(password))
    {
        setIsPassCompFormSlid(true);
        return;
    }
    else
    {
        setIsPassCompFormSlid(false);
        const response = await fetch(buildPath('/api/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
          });
          const data = await response.json();
          // prints to console for now (inspect element to see console)
          if (data.error === '') 
          {
            console.log('good register');
          } 
          else 
          {
            console.error(data.error);
          }
    }
  }

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/LandingPage`; 
    navigate(path);
  }

  
  // jsx ("html") of the login and register forms
  return (
    <body className="login-body">    
        <div>
            <Blobs />
        </div>    
        <div className={`login-form ${isLoginFormSlid ? 'slide-left' : ''}`}>
            <p className="welcome-text">Welcome Back</p>
            <section className="email-section">
                <div className="email-div">
                    <span className="form-name">Email Address</span>
                    <input type="text" className="field-input" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
            </section>
            <section className="password-section">
                <div className="password-div">
                    <span className="form-name">Password</span>
                    <input type={showPassword ? "text" : "password"} className="field-input" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="button" className="password-toggle" onClick={toggleShowPassword}>
                    {showPassword ? <div> <EyeClosed /></div> : <div><EyeOpen /></div>}
                </button>
            </section>
            <section className="login-form-bottom">
                <button className="login-button" onClick={event => {handleLogin(); routeChange(); }}>Login</button>
                <p className="register-prompt">Don't have an account?</p>
                <a href="#" className="go-register-button" onClick={() => { setIsLoginFormSlid(true); setIsRegisterFormSlid(true);}}>Register</a>
            </section>
        </div>
        <div className={`register-form ${isRegisterFormSlid ? 'slide-right' : ''}`}>
            <div className={`pass-comp-form ${isPassCompFormSlid ? 'slide-down' : ''}`}>
                <p className="pass-comp-text">
                    1 Lowercase <br />
                    1 Uppercase <br />
                    1 Special Character <br />
                    Minimum Length 8
                </p>
            </div>
            <p className="welcome-text">Welcome</p>
            <section className="register-email-section">
                <div className="field-form-div">
                    <span className="form-name">Email Address</span>
                    <input type="text" className="field-input" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
            </section>
            <section className="register-name-section">
                <div className="field-form-div">
                    <span className="form-name">First Name</span>
                    <input type="text" className="field-input" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                </div>
            </section>
            <section className="register-name-section">
                <div className="field-form-div">
                    <span className="form-name">Last Name</span>
                    <input type="text" className="field-input" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                </div>
            </section>
            <section className="register-name-section">
                <div className="field-form-div">
                    <span className="form-name">Password</span>
                    <input type={showPassword ? "text" : "password"} className="field-input" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="button" className="register-password-toggle" onClick={toggleShowPassword}>
                    {showPassword ? <div> <EyeClosed /></div> : <div><EyeOpen /></div>}
                </button>
            </section>
            <section className="register-form-button">
                <button className="register-button" onClick={handleRegister}>Register</button>
                <p className="register-prompt">Have an account?</p>
                <a href="#" className="go-login-button" onClick={() => { setIsLoginFormSlid(false); setIsRegisterFormSlid(false);}}>Login</a>
            </section>
        </div>
        <div className="loginpage-background">
            <div className="title-div">
                <a href="https://github.com/Nicorb02/Large-Project/tree/master" className='title-text-href'>
                    <p className="title-text">Sunny Side Up</p>
                </a>
            </div>
        </div>
    </body>
  );
}

export default Login;
