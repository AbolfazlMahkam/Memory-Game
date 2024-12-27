export default function singleCard ({ card, handleChoice, flipped, disabled }) {
  const handleClick = card => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div key={card.id} className='flex justify-center relative duration-300'>
      <div>
        <img
          className={
            flipped
              ? 'absolute top-0 w-40 roY00 z-20 rounded-lg border-2 border-green-950 hover:shadow-lg duration-200 cursor-pointer'
              : 'absolute top-0 w-40 roY90 z-20 rounded-lg border-2 border-green-950 hover:shadow-lg duration-200 cursor-pointer'
          }
          src={card.src}
          alt='card front'
        />
        <img
          className={
            flipped
              ? 'w-40 roY-90 border-2 border-green-950 rounded-lg cursor-pointer hover:shadow-lg duration-200 hover:shadow-lg focus:roY90'
              : 'w-40 roY00 border-2 border-green-950 rounded-lg cursor-pointer hover:shadow-lg duration-200 hover:shadow-lg focus:roY90'
          }
          src='/img/bc.jpg'
          alt='card back'
          onClick={() => handleClick(card)}
        />
      </div>
    </div>
  )
}
