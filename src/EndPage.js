import userPNG from './User.png'
import homePNG from './Home.png'
import retryPNG from './Refresh cw.png'
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';

function EndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const stats = location.state?.stats || {
    time: 0,
    wpm: 0,
    accuracy: 0,
    errors: 0
  };

  const handleRetry = () => {
    navigate('/game');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <div className='ProfileContainer'>
        <img className='profileImage' src={userPNG} alt="User profile" />
        <p className='userNameText'> Username </p>
      </div>

      <div className='homeContainer'>
        <img className='homeImage' src={homePNG} alt="Home" onClick={handleHome} />
        <p className='userNameText'> Home </p>
      </div>

      <div className='retryContainer'>
        <img className='retryImage' src={retryPNG} alt="Retry" onClick={handleRetry} />
        <p className='userNameText'> Retry </p>
      </div>

      <header className="App-header">
        <div className='appTitle'>
          <p>Not TypeRacer</p>
        </div>
        <div className='textBoxSpace'>
          <div className='statsContainer'>
            <h2>Game Complete!</h2>
            <div className='statRow'>
              <span>Time:</span>
              <span>{stats.time} seconds</span>
            </div>
            <div className='statRow'>
              <span>WPM:</span>
              <span>{stats.wpm}</span>
            </div>
            <div className='statRow'>
              <span>Accuracy:</span>
              <span>{stats.accuracy}%</span>
            </div>
            <div className='statRow'>
              <span>Errors:</span>
              <span>{stats.errors}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default EndPage; 