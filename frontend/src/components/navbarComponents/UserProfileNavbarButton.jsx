import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Shimmer from "../Shimmer";

const UserProfileNavbarButton = () => {
    const { userProfileDetails, isLogin, userDataLoading } = useSelector(
        (state) => state.userDataSlice
    );

    return (
        <div className="profile-container">
            {isLogin ? (
                <NavLink className="navbar-link" to="/profile">
                    {userDataLoading || !userProfileDetails?.avatar ? (
                        <span className="material-symbols-rounded">person</span>
                    ) : (
                        // TODO - Handle this after implementing media
                        <img
                            className="navbar-profile-pic"
                            src={userProfileDetails?.avatar}
                            alt="User Profile Pic"
                        />
                    )}
                    <div className="nav-label">
                        {userDataLoading ? (
                            <Shimmer />
                        ) : (
                            userProfileDetails?.username || "username"
                        )}
                    </div>
                </NavLink>
            ) : (
                <NavLink className="navbar-link" to="/auth/login">
                    <span className="material-symbols-rounded explore-btn">
                        login
                    </span>
                    <div className="nav-label">Login</div>
                </NavLink>
            )}
        </div>
    );
};

export default UserProfileNavbarButton;
