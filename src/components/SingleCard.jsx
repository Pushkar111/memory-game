import React from "react";
import "./SingleCard.css";

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                {/* front of the card -- Dynamically */}
                <img src={card.src} className="front" alt="card-front" />

                {/* back of the card -- cover.png */}
                <img src="/img/cover.png" className="back" onClick={()=>{handleClick()}} alt="card-back" />
            </div>
        </div>
    );
};
