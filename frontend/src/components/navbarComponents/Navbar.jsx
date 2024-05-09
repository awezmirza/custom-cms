import "../../styles/navbar.css";
import { LOGO_URL } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import UserProfileNavbarButton from "./UserProfileNavbarButton";
import useLogout from "../../utils/useLogout";

// TODO Edit Different Pages

const Navbar = () => {
    const logout = useLogout();

    return (
        <>
            <div className="navbar-container">
                <div className="logo-container">
                    <NavLink to="/">
                        <img src={LOGO_URL} alt="Logo" className="logo" />
                    </NavLink>
                </div>

                <div className="navbar-links-container">
                    <NavLink className="navbar-link" to="/">
                        <span className="material-symbols-rounded">home</span>
                        <div className="nav-label">Home</div>
                    </NavLink>
                    <NavLink className="navbar-link" to="/reels">
                        <span className="material-symbols-rounded">movie</span>
                        <div className="nav-label">Reels</div>
                    </NavLink>
                    <NavLink className="navbar-link" to="/explore">
                        <span className="material-symbols-rounded">public</span>
                        <div className="nav-label">Near me</div>
                    </NavLink>
                    <UserProfileNavbarButton />
                </div>

                <div className="logout-container">
                    <div onClick={logout} className="logout-button">
                        <span className="material-symbols-rounded">logout</span>
                        <div className="nav-label">Logout</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
