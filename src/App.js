import userPNG from './User.png'
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const targetWord = 'START';

  const handleInputChange = (e) => {
    const text = e.target.value.toUpperCase();
    if (text.length <= targetWord.length) {
      setInputText(text);
      if (text.toLowerCase() === 'start') {
        setTimeout(() => {
          navigate('/start');
        }, 500);
      }
    }
  };

  const renderPlaceholderLetters = () => {
    return targetWord.split('').map((letter, index) => {
      const isTyped = index < inputText.length;
      const isNext = index === inputText.length;
      const isCorrect = isTyped && inputText[index].toUpperCase() === letter;
      const isWrong = isTyped && inputText[index].toUpperCase() !== letter;
      
      const classes = [
        'placeholderLetter',
        isCorrect ? 'matched' : '',
        isWrong ? 'wrong' : '',
        isNext ? 'next' : '',
        (!isCorrect && !isWrong) ? 'untyped' : '',
      ].filter(Boolean).join(' ');
      
      return (
        <span key={index} className={classes}>
          {letter}
        </span>
      );
    });
  };

  return (
    <div className="App">

      <div className='ProfileContainer'>
        <img className='profileImage' src={userPNG}/>
        {/*Need to change this to reflect the users actual username when logged in*/}
        <p className='userNameText'> Username </p>
      </div>

      <div className='signUpSignInContainer'>
        <p className='signUpSignInButton'>Sign up</p>
        <p className='signUpSignInButton'>Sign in</p>
      </div>

      <header className="App-header">
        <div className='appTitle'>
          <p>Not TypeRacer</p>
        </div>
        <div className='textBoxSpace'>
          <p>Just type "START" below</p>
          <div className='typedTextHomePage'>
            <div className={`inputContainer ${isFocused ? 'focused' : ''}`}>
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='startInput'
                autoFocus
                maxLength={5}
              />
              <div className="placeholderText">
                {renderPlaceholderLetters()}
              </div>
            </div>
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
