import React from 'react';
import logo from './title.png';
import unknownBird from './unknownBird.png';
import rightMP3 from './win31.mp3';
import wrongMP3 from './wrong_answer.mp3';
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
    name: 'Ястреб',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Я́стребы, или ястреба́ — подсемейство хищных птиц из семейства ястребиных. В более широком смысле, ' +
      'я́стребом называют любую птицу из этого подсемейства. На территории России широкое распространение имеют ' +
      'ястреб-перепелятник и ястреб-тетеревятник.'
  },
  yastreb1: {
    id: 'voron',
    type: 1,
    name: 'Ворон',
    img: 'https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. ' +
      'Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, ' +
      'монархия рухнет.'
  },
  yastreb2: {
    id: 'juravl',
    type: 2,
    name: 'Журавль',
    img: 'https://live.staticflickr.com/65535/49221158846_b0b69a58f1.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – ' +
      'одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает ' +
      'только звук «кур».'
  },
  yastreb3: {
    id: 'lastochka',
    type: 3,
    name: 'Ласточка',
    img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. ' +
      'Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. ' +
      'Ласточки любят петь дуэтом.'
  },
  yastreb4: {
    id: 'kozodoj',
    type: 4,
    name: 'Козодой',
    img: 'https://live.staticflickr.com/65535/48456345286_dbc8530027.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Козодой – неприметная птица, известная благодаря своему голосу. Песня козодоя звучит как монотонная ' +
      'трель похожая на тарахтение мотоцикла. Такое дребезжание слышно от заката до рассвета, его тональность, ' +
      'частота и громкость изменяются.'
  },
  yastreb5: {
    id: 'kukushka',
    type: 5,
    name: 'Кукушка',
    img: 'https://live.staticflickr.com/65535/48377838151_e15f430ec1.jpg',
    voice: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
    description: 'Кукушку назвали так из-за особенностей ее песен. Звонкое «ку-ку» не спутать ни с какой другой птицей.' +
      ' Кукушки не строят гнезда, их потомство выращивают другие виды пернатых, которым кукушки подбрасывают свои яйца.'
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
      guessed: false,
      score: 0
    };
    this.rightAudio = React.createRef();
    this.wrongAudio = React.createRef();
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
    const { score } = this.state;
    if (this.state.currentBird.name === name) {
      this.setState({
        guessed: true,
        score: score + (steps.length - clickedBirds.length - 1)
      });
      this.rightAudio.current.play();
    } else {
      this.setState({
        clickedBirds: [...clickedBirds, name]
      });
      this.wrongAudio.current.play();
    }
  };
  
  render() {
    const { clickedBirds, currentBird, currentStep, guessed, score } = this.state;
    const { img, name: currentName, voice } = currentBird;
    const lastClicked = clickedBirds[clickedBirds.length-1];
    const lastClickedInfo = guessed ? currentBird : Object.values(birds).filter(({ name }) => name === lastClicked)[0];
    
    return (
      <div className='App'>
        <header>
          <img className='logoPosition' src={logo}/>
          <p className='scoreTextColor whiteText'>
            Score: {score}
          </p>
          <div className='header'>
            {steps.map(({ id, title }) => {
              const className = `questionListItem whiteText ${currentStep === id ? 'headerActiveColor' : 'headerNotActiveColor'} `;
              return <span key={id} className={className}>{title}</span>;
            })}
          </div>
        </header>
        <div className='currentQuestion flex'>
          <img className='flex padding15 currentBird' src={guessed ? img : unknownBird}/>
          <div className='currentBirdBlock'>
            <div className='currentBirdName whiteText'>{guessed ? currentName : '******'}</div>
            <div>
              <audio className='audio' controls>
                <source src={voice} type="audio/mp3" preload="metadata"/>
              </audio>
            </div>
          </div>
        </div>
        <div className='flex'>
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
                <div key={name} className='answerItem whiteText' onClick={onClick}>
                  <span className={`answerItemCircle ${className}`}> </span>
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
          <div className='currentQuestion flex marginTop'>
            { clickedBirds.length !== 0 || guessed ?
              <div className='clickedBirdInfo'>
                <div className='flex'>
                  <img className='padding15 currentBird' src={lastClickedInfo.img}/>
                  <div className='currentBirdBlock'>
                    <div className='currentBirdName'>{guessed ? currentName : lastClicked}</div>
                    <div>
                      <audio className='audio' controls>
                        <source src={voice} type="audio/mp3" preload="metadata"/>
                      </audio>
                    </div>
                  </div>
                </div>
                <div className='padding15'>{currentBird.description}</div>
              </div> : <div className='whiteText'> Послушайте плеер. Выберите птицу из списка </div>
            }
          </div>
          <div>
          </div>
          <audio ref={this.rightAudio}>
            <source src={rightMP3} type="audio/mp3" preload="metadata"/>
          </audio>
          <audio ref={this.wrongAudio}>
            <source src={wrongMP3} type="audio/mp3" preload="metadata"/>
          </audio>
        
        </div>
        <button className={`nextLevelBtn marginTop whiteText ${guessed ? 'rightAnswerItem' : 'nextLevelBtnDefault'}`}
                onClick={this.onClick} disabled={!guessed}>Next level
        </button>
      </div>
    );
  }
}

export default App;
