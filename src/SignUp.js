import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import googleIcon from './google.png';
import linkedinIcon from './linkedin.png';
import ssoIcon from './sso.png';

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', 'Other'];
  const takenUsernames = ['admin', 'test', 'user123']; // Mock list

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

  // Username check (mocked)
  useEffect(() => {
    const isTaken = takenUsernames.includes(name.trim().toLowerCase());
    setUsernameTaken(isTaken);
  }, [name]);

  // Password validation
  useEffect(() => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/\d/.test(password)) {
      setPasswordError('Password must contain at least one number.');
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  // Confirm password check
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  // Check if form is valid
  const isFormValid = (
    name.trim() &&
    email.includes('@') &&
    password &&
    confirmPassword &&
    !usernameTaken &&
    !passwordError &&
    passwordsMatch
  );

  return (
    
    <div className="signup-container">
        <button
    className="back-btn-top"
    onClick={() => navigate('/')}
  >
    ⬅ Back
  </button>

      <div className="signup-card">
        <h2>Sign up</h2>
        <p>Sign up to continue</p>

        

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {usernameTaken && <p className="error-text">This username is taken</p>}

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
        {passwordError && <p className="error-text">{passwordError}</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!passwordsMatch && <p className="error-text">Passwords do not match</p>}

        <button
          className={`signup-btn ${!isFormValid ? 'disabled-btn' : ''}`}
          disabled={!isFormValid}
        >
          Sign up
        </button>

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
          Already have an account?<a href="/signin"> Sign in</a>
        </p>

       
      </div>
    </div>
  );
}
