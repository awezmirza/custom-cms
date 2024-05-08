import "../../styles/gamePageStyles/gameCardLoader.css";
import Shimmer from "../Shimmer";

const GameCardLoader = () => {
    return (
        <div className="game-card-loader">
            <div className="loader-container">
                <div className="image-loader-container">
                    <Shimmer />
                </div>
                <h1 className="loading-game-name-container">
                    <Shimmer />
                </h1>
            </div>
        </div>
    );
};

export default GameCardLoader;
