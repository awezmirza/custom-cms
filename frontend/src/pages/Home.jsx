import { Link } from "react-router-dom";
import GameCardContainer from "../components/gamePageComponents/GameCardsContainer";

import useLogout from "../utils/useLogout";

const Home = () => {
    const logout = useLogout();

    return (
        <>
            <GameCardContainer />
            <Link to={"/auth/login"}>Login</Link>
            <button onClick={logout}> Logout </button>
        </>
    );
};

export default Home;
