import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import "../styles/homePageStyles/home.css";
import TableDataContainer from "../components/homePageComponents/TableDataContainer.jsx";

const Home = () => {
    const { userDataLoading } = useSelector((state) => state.userDataSlice);
    return (
        <div className="home-page-container">
            {userDataLoading ? (
                <Shimmer styleClass={"home-page-shimmer"} />
            ) : (
                <>
                    <TableDataContainer />
                </>
            )}
            <Link to={"/auth/login"}>Login</Link>
        </div>
    );
};

export default Home;
