import userPNG from './User.png'
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Instruction() {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const targetWord = 'CONTINUE';

    const handleInputChange = (e) => {
        const text = e.target.value.toUpperCase();
        if (text.length <= targetWord.length) {
            setInputText(text);
            if (text.toLowerCase() === 'continue') {
                setTimeout(() => {
                    navigate('/game');
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
                <img className='profileImage' src={userPNG} />
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
                    <p>Type the words into the text box, including all spaces, punctuation, and proper capitalization. If you make a mistake, you will have to correct it before you can finish the race.</p>
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
                                maxLength={8}
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

export default Instruction;
