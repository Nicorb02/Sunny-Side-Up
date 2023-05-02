import React, { useState } from 'react';
import '../styles/PassResetEmail.css'

const PassReset = ({ setIsPassResetFormSlid }) => {
    // import buildPath 
    let bp = require('./Path.js');

    async function handleSendCode () {
        const response = await fetch(bp.buildPath('/api/forgot-password'), {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({email})
        });
        const data = await response.json();
        
        if (data.error === '')
        {
            setShowEmailCodePass(1);
            setRealCode(data.code)
            console.log("good code send")
        }
        else 
        {
            console.log("bad code send")
        }
    }

    async function handleVerifyCode () {
        if (code == realCode)
        {
            console.log("good verify code")
            setShowEmailCodePass(2);
        }
        else
        {
            console.log("bad verify code")
        }
    }

    function handleNewPasswordClick() {
        isPasswordValidFunc(newPassword);
    }

    function isPasswordValidFunc(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let flag = regex.test(password);
        if (flag)
        {
            handleNewPassword()
        }
        else
        {
            setNewPassword('');
        }
      }

    async function handleNewPassword () {
        const response = await fetch(bp.buildPath('/api/reset-password'), {
            method: 'POST',
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password_new: newPassword })
        });
        const data = await response.json();
        
        if (data.error === '')
        {
            setShowEmailCodePass(0);
            console.log("good password reset");
            toggleIsPassResetFormSlid();
            setEmail('')
            setNewPassword('')
            setCode('')
            setRealCode('')
        }
        else 
        {
            console.log("bad password reset");
        }
    }

    function toggleIsPassResetFormSlid () {
        setIsPassResetFormSlid(false);
    }

    const [realCode, setRealCode] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showEmailCodePass, setShowEmailCodePass] = useState(0);

    return (
        <div className='password-reset-form'>
            {showEmailCodePass === 0 && (
                <div className='password-reset-email-form'>
                    <span className='pass-reset-email'>Enter Email</span>
                    <input type='text' className='pass-reset-email-input' value={email} onChange={e => setEmail(e.target.value)}></input>
                    <button className='send-email-button' onClick={handleSendCode}>Enter</button>
                </div>
            )}
            {showEmailCodePass === 1 && (
                <div className='password-reset-code-form'>
                    <span className='pass-reset-email'>Enter Code</span>
                    <input type='text' className='pass-reset-email-input' value={code} onChange={e => setCode(e.target.value)}></input>
                    <button className='send-email-button' onClick={handleVerifyCode}>Enter</button>
                </div>
            )}
            {showEmailCodePass === 2 && (
                <div className='password-reset-newpass-form'>
                    <span className='pass-reset-email'>Enter New Password</span>
                    <input type='text' className='pass-reset-email-input' value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
                    <button className='send-email-button' onClick={handleNewPasswordClick}>Enter</button>
                </div>
            )}
        </div>
    );    
};

export default PassReset;