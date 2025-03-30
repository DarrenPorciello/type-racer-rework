import userPNG from './User.png'
import homePNG from './Home.png'
import retryPNG from './Refresh cw.png'
import blackStarPNG from './Star 1.png'
import redStarPNG from './Star 2.png'
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [errors, setErrors] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  // The target text that users need to type
  const targetText = "Aliquam malesuada euismod urna at tincidunt. Donec sit amet laoreet Aliquam malesuada euismod urna at tincidunt. Donec sit amet laoreet Aliquam malesuada euismod urna at tincidunt. Donec sit amet laoreet Aliquam malesuada euismod urna at tincidunt. Donec sit amet laoreet";

  // Timer effect
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleRetryClick = () => {
    // Reset all game state
    setInputText('');
    setStartTime(null);
    setErrors(0);
    setElapsedTime(0);
    // Focus the input
    inputRef.current?.focus();
  };

  const calculateStats = () => {
    const timeElapsed = (Date.now() - startTime) / 1000; // Convert to seconds
    const wordsTyped = inputText.split(' ').length;
    const minutes = timeElapsed / 60;
    const wpm = Math.round(wordsTyped / minutes);
    const accuracy = Math.round(((inputText.length - errors) / inputText.length) * 100);

    return {
      time: Math.round(timeElapsed),
      wpm,
      accuracy,
      errors
    };
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    
    // Start timing when user starts typing
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    // Only check the last character typed for errors
    const lastCharIndex = text.length - 1;
    if (lastCharIndex >= 0 && text[lastCharIndex] !== targetText[lastCharIndex]) {
      setErrors(prevErrors => prevErrors + 1);
    }
    
    // If user completes the entire text, redirect to end page
    if (text === targetText) {
      const stats = calculateStats();
      navigate('/end', { state: { stats } });
    }
  };

  const renderPlaceholderText = () => {
    // Split text into words, keeping spaces attached to the previous word
    const words = targetText.split(' ').map((word, i) => 
      i === targetText.split(' ').length - 1 ? word : word + ' '
    );
    
    let currentPosition = 0;

    return words.map((word, wordIndex) => {
      const letters = word.split('').map((letter, letterIndex) => {
        const absoluteIndex = currentPosition + letterIndex;
        const isTyped = absoluteIndex < inputText.length;
        const isNext = absoluteIndex === inputText.length;
        const isCorrect = isTyped && inputText[absoluteIndex] === letter;
        const isWrong = isTyped && inputText[absoluteIndex] !== letter;
        const isSpace = letter === ' ';
        
        const classes = [
          'placeholderLetter',
          isCorrect ? 'matched' : '',
          isWrong ? 'wrong' : '',
          isNext ? 'next' : '',
          (!isCorrect && !isWrong) ? 'untyped' : '',
          isSpace ? 'space' : '',
          isSpace && isWrong ? 'wrongSpace' : '',
          isSpace && isCorrect ? 'correctSpace' : ''
        ].filter(Boolean).join(' ');
        
        return (
          <span key={absoluteIndex} className={classes}>
            {isSpace ? '\u00A0' : letter}
          </span>
        );
      });

      currentPosition += word.length;
      
      return (
        <span key={wordIndex} className="word">
          {letters}
        </span>
      );
    });
  };

  return (
    <div className="App" autoComplete="off">
      <div className='ProfileContainer' autoComplete="off">
        <img className='profileImage' src={userPNG} alt="User profile" />
        <p className='userNameText'> Username </p>
      </div>

      <div className='homeContainer' onClick={handleHomeClick} autoComplete="off">
        <img className='homeImage' src={homePNG} alt="Home" />
        <p className='userNameText'> Home </p>
      </div>

      <div className='retryContainer' onClick={handleRetryClick} autoComplete="off">
        <img className='retryImage' src={retryPNG} alt="Retry" />
        <p className='userNameText'> Retry </p>
      </div>

      <div className='legend' autoComplete="off">
        <img className='legendImage' src={blackStarPNG} alt="User legend" />
        <p>User</p>
        <img className='legendImage' src={redStarPNG} alt="CPU legend" />
        <p>CPU</p>
      </div>

      <header className="App-header game" autoComplete="off">
        <div className='appTitle' autoComplete="off">
          <p>Not TypeRacer</p>
        </div>
        <div className='timer' autoComplete="off">
          <span>{formatTime(elapsedTime)}</span>
        </div>
        <div className='textBoxSpace game' onClick={handleContainerClick} autoComplete="off">
          <div className='typedTextHomePage game' autoComplete="off">
            <div 
              className={`game-input-container ${isFocused ? 'focused' : ''}`}
              autoComplete="off"
            >
              <form autoComplete="off">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className='game-input'
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  data-form-type="other"
                />
              </form>
              <div className="game-placeholder-text">
                {renderPlaceholderText()}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Game; 