import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UserProfileNavbarButton = () => {
    const { userProfileDetails, userDataLoading } = useSelector(
        (state) => state.userDataSlice
    );

    return (
        <div className="profile-container">
            <NavLink className="navbar-link" to="/profile">
                {userDataLoading || !userProfileDetails?.avatar ? (
                    <span className="material-symbols-rounded">person</span>
                ) : (
                    <img
                        className="navbar-profile-pic"
                        src={userProfileDetails?.avatar}
                        alt="User Profile Pic"
                    />
                )}
                <div className="nav-label">Profile </div>
            </NavLink>
        </div>
    );
};

export default UserProfileNavbarButton;
