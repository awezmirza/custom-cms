import { Link } from "react-router-dom";
import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";

import useLogout from "../utils/useLogout";

const Home = () => {

    return (
        <>
            <GameCardContainer />
            <Link to={"/auth/login"}>Login</Link>
        </>
    );
};

export default Home;
