import logo from './logo.svg';
import userPNG from './User.png'
import './App.css';

function App() {
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
        </div>
      </header>

    </div>
  );
}

export default App;
