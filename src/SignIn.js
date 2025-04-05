import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import googleIcon from './google.png';
import linkedinIcon from './linkedin.png';
import ssoIcon from './sso.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', 'Other'];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowEmailOptions(e.target.value && !e.target.value.includes('@'));
  };

  const handleEmailDomainClick = (domain) => {
    if (domain === 'Other') {
      setShowEmailOptions(false);
    } else {
      setEmail((prev) => prev + domain);
      setShowEmailOptions(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign     in</h2>
        <p>Welcome back!</p>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {showEmailOptions && (
            <div className="domain-buttons">
              {emailDomains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => handleEmailDomainClick(domain)}
                >
                  {domain}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signup-btn">Sign in</button>

        <label className="remember-me">
          <input type="checkbox" /> Remember me
        </label>

        <div className="quick-access">
          <button>
            <img src={googleIcon} alt="Google" className="auth-icon" />
          </button>
          <button>
            <img src={linkedinIcon} alt="LinkedIn" className="auth-icon" />
          </button>
          <button>
            <img src={ssoIcon} alt="SSO" className="auth-icon" />
          </button>
        </div>

        <p className="signin-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
