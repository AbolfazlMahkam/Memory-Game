import React from 'react'
import SingleCard from './singleCard'

const cardImages = [
  { src: '/img/01.jpg', matched: false },
  { src: '/img/02.jpg', matched: false },
  { src: '/img/03.jpg', matched: false },
  { src: '/img/04.jpg', matched: false },
  { src: '/img/05.jpg', matched: false },
  { src: '/img/06.jpg', matched: false },
  { src: '/img/07.jpg', matched: false },
  { src: '/img/08.jpg', matched: false },
  { src: '/img/09.jpg', matched: false },
  { src: '/img/10.jpg', matched: false }
];

export default function Card() {
  const [showModal, setShowModal] = React.useState(true);
  const [title, setTitle] = React.useState('Start the Game');
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState(null);
  const [choiceTow, setChoiceTow] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [dots, setDots] = React.useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const preloadImages = () => {
    const promises = cardImages.flatMap(img => [
      new Promise(resolve => {
        const image = new Image();
        image.src = img.src;
        image.onload = resolve;
      }),
      new Promise(resolve => {
        const backImage = new Image();
        backImage.src = '/img/bc.jpg';
        backImage.onload = resolve;
      })
    ]);

    Promise.all(promises).then(() => {
      setImagesLoaded(true);
    });
  };

  React.useEffect(() => {
    preloadImages();
  }, []);

  const shuffleCards = () => {
    setShowModal(false);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTitle('New Game');
    setTurns(0);
  };

  const handleChoice = card => {
    choiceOne ? setChoiceTow(card) : setChoiceOne(card);
  };

  React.useEffect(() => {
    if (choiceOne && choiceTow) {
      setDisabled(true);
      if (choiceOne.src === choiceTow.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTow]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTow(null);
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false);
  };

  if (!imagesLoaded) {
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-dvh bg-black bg-opacity-50 backdrop-blur-xl">
        <p className="text-gray-50 text-4xl font-bold">Loading{'.'.repeat(dots)}</p>
      </div>
    );
  }

  return (
    <div>
      {showModal && (
        <div className='bg-black bg-opacity-50 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center w-full h-dvh'>
          <div className='bg-white rounded-xl p-5 text-center w-[500px] max-[1100px]:w-[400px] relative'>
            <h3 className='text-[#000950] font-black'>Welcome To My Game</h3>
            <p className='text-gray-700'>
              Find and match the matching images to complete the game. After
              finishing, run a new game by clicking on the new game option and
              enjoy it.
            </p>
            <button
              onClick={shuffleCards}
              className='text-white bg-[#950000] font-bold rounded-lg py-2 px-5 mt-4'
            >
              Start
            </button>
          </div>
        </div>
      )}
      <div className='text-center'>
        <button
          onClick={shuffleCards}
          className='backdrop-blur-[20px] text-slate-800 py-2 px-3 mt-5 rounded-xl border border-slate-400 hover:shadow-lg duration-300'
        >
          {title}
        </button>
        <div className='text-center w-full pt-2'>
          <p className='text-slate-900 font-semibold'>Turns: {turns}</p>
        </div>
        <div className='grid grid-cols-5 pt-5 gap-2 px-[480px] max-[1100px]:grid-cols-4 max-[1100px]:px-0 max-[1100px]:pt-20'>
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTow || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <div>
          <p className='fixed bottom-0 right-0 mr-5 text-white font-mono max-[1100px]:mr-32 max-[1100px]:mb-1'>
            Created by a.mahkam.950 &#169;
          </p>
        </div>
      </div>
    </div>
  );
}
