import React from "react";
import Carousel from "../Carousel";
import "../../styles/gamePageStyles/gamePageCard.css";
import StarRating from "../StarRating";

const GamePageCard = ({ data }) => {
    return (
        <>
            <div className="game-page-card-container">
                <div className="carasoul-container">
                    <Carousel data={data} />
                </div>
                <div className="game-data-style">
                    <div className="game-info">
                        <h1 className="game-name">{data.gameName}</h1>
                        <p className="game-description">{data.description}</p>
                    </div>
                    <StarRating />
                </div>
            </div>
        </>
    );
};

export default GamePageCard;
