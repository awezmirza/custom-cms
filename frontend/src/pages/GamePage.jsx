import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GamePageCard from "../components/gamePageComponents/GamePageCard";
import Leaderboard from "../components/Leaderboard";
import "../styles/gamePageStyles/gamePage.css";
import { useEffect, useState } from "react";
import { fetchGamesData } from "../config/gamesDataSlice";

const GamePage = () => {
    const { gameslug } = useParams();
    const { gamesData, gamesDataLoading } = useSelector(
        (state) => state.gamesDataSlice
    );
    const dispatch = useDispatch();

    const [gameData, setGameData] = useState(undefined);

    useEffect(() => {
        if (!gamesData) {
            dispatch(fetchGamesData());
        } else {
            setGameData(gamesData.find((item) => item.gameSlug === gameslug));
        }
    }, [dispatch, gamesData, gameslug]);

    if (gamesDataLoading) {
        return (
            <>
                <h1>Loading</h1>
            </>
        );
    }

    if (!gameData) {
        return (
            <>
                <h1>Game Not Found!</h1>
            </>
        );
    }

    return (
        <div className="game-page-container">
            <GamePageCard data={gameData} />
            <Leaderboard />
        </div>
    );
};

export default GamePage;
