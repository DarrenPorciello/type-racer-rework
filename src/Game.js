import userPNG from './User.png'
import homePNG from './Home.png'
import retryPNG from './Refresh cw.png'
import blackStarPNG from './Star 1.png'
import redStarPNG from './Star 2.png'
import './App.css';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  // The target text that users need to type
  const targetText = "Aliquam malesuada euismod urna at tincidunt. Donec sit amet laoreet ";

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    
    // If user completes the entire text, redirect after delay
    if (text === targetText) {
      setTimeout(() => {
        navigate('/start');
      }, 500);
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
    <div className="App">
      <div className='ProfileContainer'>
        <img className='profileImage' src={userPNG} alt="User profile" />
        <p className='userNameText'> Username </p>
      </div>

      <div className='homeContainer'>
        <img className='homeImage' src={homePNG} alt="Home" />
        <p className='userNameText'> Home </p>
      </div>

      <div className='retryContainer'>
        <img className='retryImage' src={retryPNG} alt="Retry" />
        <p className='userNameText'> Retry </p>
      </div>

      <div className='legend'>
        <img className='legendImage' src={blackStarPNG} alt="User legend" />
        <p>User</p>
        <img className='legendImage' src={redStarPNG} alt="CPU legend" />
        <p>CPU</p>
      </div>

      <header className="App-header">
        <div className='appTitle'>
          <p>Not TypeRacer</p>
        </div>
        <div className='textBoxSpace'>
          <div className='typedTextHomePage'>
            <div 
              className={`game-input-container ${isFocused ? 'focused' : ''}`}
              onClick={handleContainerClick}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='game-input'
                autoFocus
              />
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