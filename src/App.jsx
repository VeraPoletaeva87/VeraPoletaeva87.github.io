import React from 'react';
import logo from './title.png';
import unknownBird from './unknownBird.png';
import './App.css';

const steps = [
  { id: 0, title: 'Разминка' },
  { id: 1, title: 'Воробьиные' },
  { id: 2, title: 'Лесные птицы' },
  { id: 3, title: 'Певчие птицы' },
  { id: 4, title: 'Хищные птицы' },
  { id: 5, title: 'Морские птицы' }
];

const birds = {
  yastreb: {
    id: 'yastreb',
    type: 0,
    name: 'Ястреб0',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  },
  yastreb1: {
    id: 'yastreb1',
    type: 1,
    name: 'Ястреб1',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  },
  yastreb2: {
    id: 'yastreb2',
    type: 2,
    name: 'Ястреб2',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  },
  yastreb3: {
    id: 'yastreb3',
    type: 3,
    name: 'Ястреб3',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  },
  yastreb4: {
    id: 'yastreb4',
    type: 4,
    name: 'Ястреб4',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  },
  yastreb5: {
    id: 'yastreb5',
    type: 5,
    name: 'Ястреб5',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3'
  }
};

const getRandomBirdByStep = (step) => {
  // TODO:
  return Object.values(birds).filter(({ type }) => type === step)[0];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBird: getRandomBirdByStep(0),
      currentStep: 0,
      clickedBirds: [],
      guessed: false
    };
    this.myAudio = React.createRef();
  }
  
  onClick = () => {
    const { currentStep } = this.state;
    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      this.setState({
        currentBird: getRandomBirdByStep(nextStep),
        currentStep: nextStep,
        clickedBirds: [],
        guessed: false
      });
    }
  };
  
  onAnswerItemClick = (name) => {
    const { clickedBirds } = this.state;
    if (this.state.currentBird.name === name) {
      this.setState({
        guessed: true
      });
    } else {
      this.setState({
        clickedBirds: [...clickedBirds, name]
      });
    }
  };
  
  render() {
    const { clickedBirds, currentBird, currentStep, guessed } = this.state;
    const { img, name: currentName, voice } = currentBird;
    
    return (
      <div className='App'>
        <header>
          <img className='logoPosition' src={logo}/>
          <p className='scoreTextColor'>
            Score:
          </p>
          <div className='header'>
            {steps.map(({ id, title }) => {
              const className = `questionListItem ${currentStep === id ? 'headerActiveColor' : 'headerNotActiveColor'} `;
              return <span key={id} className={className}>{title}</span>;
            })}
          </div>
        </header>
        <div className='currentQuestion flex'>
          <img className='flex currentBird' src={guessed ? img : unknownBird}/>
          <div className='currentBirdBlock'>
            <div className='currentBirdName'>{guessed ? currentName : '******'}</div>
            <div>
              <audio className='audio' ref={this.myAudio} controls>
                <source src={voice} type="audio/mp3" preload="metadata"/>
              </audio>
            </div>
          </div>
        </div>
        <div className='marginTop'>
          {Object.values(birds).map(({ name }) => {
            const clicked = clickedBirds.includes(name);
            
            const className = clicked
              ? 'wrongAnswerItem'
              : guessed && name === currentName ? 'rightAnswerItem' : '';
            
            const onClick = (guessed || clicked)
              ? () => {
              }
              : () => this.onAnswerItemClick(name);
            
            return (
              <div key={name} className='answerItem' onClick={onClick}>
                <span className={`answerItemCircle ${className}`}> </span>
                <span>{name}</span>
              </div>
            );
          })}
        </div>
        <button className={`nextLevelBtn marginTop ${guessed ? 'rightAnswerItem' : 'nextLevelBtnDefault'}`}
                onClick={this.onClick} disabled={!guessed}>Next level</button>
      </div>
    );
  }
}

export default App;
