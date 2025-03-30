import userPNG from './User.png'
import homePNG from './Home.png'
import retryPNG from './Refresh cw.png'
import blackStarPNG from './Star 1.png'
import redStarPNG from './Star 2.png'
import './App.css';

function App() {
  return (
    <div className="App">

      <div className='ProfileContainer'>
        <img className='profileImage' src={userPNG}/>
        {/*Need to change this to reflect the users actual username when logged in*/}
        <p className='userNameText'> Username </p>
      </div>

      <div className='homeContainer'>
        <img className='homeImage' src={homePNG}/>
        {/*Need to change this to reflect the users actual username when logged in*/}
        <p className='userNameText'> Home </p>
      </div>

      <div className='retryContainer'>
        <img className='retryImage' src={retryPNG}/>
        {/*Need to change this to reflect the users actual username when logged in*/}
        <p className='userNameText'> Retry </p>
      </div>

      <div className='legend'>
        <img className='legendImage' src={blackStarPNG}/>
        <p>User</p>
        <img className='legendImage' src={redStarPNG}/>
        <p>CPU</p>
      </div>

      <header className="App-header">
        <div className='appTitle'>
          <p>Not TypeRacer</p>
        </div>
        <div className='textBoxSpace'>
          <div className='statsContainer'>
            <img className='statsImage' src={blackStarPNG}/>
            <p>You</p>
            <img className='statsImage' src={redStarPNG}/>
            <p>CPU</p>
          </div>
          <div className='statsContainer'>
            <p>WPM: 70 words/min</p>
            <p>WPM: 65 words/min</p>
          </div>
          <div className='statsContainer'>
            <p>Time: 66 seconds</p>
            <p>Time: 70 seconds</p>
          </div>
          <div className='statsContainer'>
            <p>You won!</p>
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
