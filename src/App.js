import { useEffect, useState } from "react";
import "./App.css";
import { SingleCard } from "./components/SingleCard";

// 6 different card images
const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {
    // card states
    const [cards, setCards] = useState([]); // cards on the board
    // turn states
    const [turns, setTurns] = useState(0);
    // step-4 : choice states -- 2 cards
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // Sound effects
    const flipSound = new Audio('/sound/flipped.mp3');
    const matchSound = new Audio('/sound/match.mp3');

    // Step-1 : shuffle the cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages] // double the cards
        .sort(() => Math.random()-0.5) 
        .map((card)=>({...card, id: Math.random()})) // add id to each card

        setChoiceOne(null);
        setChoiceTwo(null);

        setCards(shuffledCards);
        setTurns(0);
    }
  
    // console.log(cards, turns);


    // step-4 : handleChoice
    const handleChoice = (card) => {
        flipSound.play();
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    // step-5 : Compare the choices
    useEffect(()=>{
      if(choiceOne && choiceTwo){
        setDisabled(true);
        if(choiceOne.src === choiceTwo.src) {
          setTimeout(() => {
            matchSound.play();
            setCards((prevCards => prevCards.map((card) => {
              if(card.src === choiceOne.src){
                return {...card, matched: true}
              } else {
                return card;
              }
            })))
            resetTurn();
          }, 1000);
        }else{
          setTimeout(() => {
            resetTurn();
          }, 1000);
        } 
      }
    }, [choiceOne, choiceTwo])

    console.log(cards);

    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1);
      setDisabled(false);
    }


    // Start Game Automatically
    useEffect(() => {
      shuffleCards();
    },[])

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={() => {shuffleCards()}}>New Game</button>

            {/* step-2 : card-grid */}
            <div className="card-grid">
              {
                cards.map((card)=>(
                  // step-3 : create Single card Component
                  <SingleCard 
                    key={card.id} 
                    card={card} 
                    handleChoice={handleChoice} 
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                  />
                ))
              }
            </div>

            {/* step-10 : Turns */}
            <h2>Turns: {turns}</h2>
        </div>
    );
}

export default App;
