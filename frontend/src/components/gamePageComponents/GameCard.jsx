import { Link } from "react-router-dom";
import "../../styles/gamePageStyles/gameCard.css";

const GameCard = ({ data }) => {
    return (
        <Link to={"game/" + data?.gameSlug} className="game-card">
            {data.comingSoon && (
                <div className="coming-soon-capsule">Coming Soon</div>
            )}

            <div className="image-container">
                <img
                    src={
                        data?.poster
                            ? data?.poster
                            : "https://th.bing.com/th/id/OIP.eNoAOBEsHuWCc9MMxdM_SQAAAA?rs=1&pid=ImgDetMain"
                    }
                    alt={data?.gameName}
                />
            </div>

            <h1 className="game-name-container">{data.gameName}</h1>
        </Link>
    );
};

export default GameCard;
