import React from 'react';
import logo from './title.png';
import unknownBird from './unknownBird.png';
import yastreb from './yastreb.png';
import './App.css';
import mp3 from './zvuk-jastreba.mp3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentBirdImg: unknownBird};
    this.myAudio = React.createRef();
    this.onClick = this.onClick.bind(this);
  }
    onClick() {
      this.setState({
        currentBirdImg: yastreb
      });
  }
  
  render() {
      return (
    <div className='App'>
      <header>
        <img className='logoPosition' src={logo}/>
        <p className='scoreTextColor'>
          Score:
        </p>
        <div className='header'>
          <span className='questionListItem headerActiveColor'>Разминка</span>
          <span className='questionListItem headerNotActiveColor'>Воробьиные</span>
          <span className='questionListItem headerNotActiveColor'>Лесные птицы</span>
          <span className='questionListItem headerNotActiveColor'>Певчие птицы</span>
          <span className='questionListItem headerNotActiveColor'>Хищные птицы</span>
          <span className='questionListItem headerNotActiveColor'>Морские птицы</span>
        </div>
      </header>
      <div className='currentQuestion flex'>
        <img className='flex currentBird' src={this.state.currentBirdImg}/>
        <div className='currentBirdBlock'>
          <div className='currentBirdName'>Ястреб</div>
          <div>
          <audio className='audio' ref={this.myAudio} controls>
            <source src={mp3} type="audio/mp3" preload="metadata"/>
          </audio>
        </div>
        </div>
      </div>
      <button onClick={this.onClick}>Отгадано!</button>
    </div>
    );
  }
}

export default App;
