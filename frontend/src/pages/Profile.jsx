import React from "react";
import "../styles/profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector(
        (state) => state.userDataSlice.userProfileDetails
    );
    console.log(userData);

    return (
        <div className="profile-page-container">
            {userData && (
                <>
                    <div className="pic-container">
                        <img
                            class="navbar-profile-pic"
                            src="https://lh3.googleusercontent.com/a/ACg8ocJSLj4CSoCha3ZAYa6o18m8ZHShSajOqw2qLD58amwY8L7izVQl=s96-c"
                            alt="User Profile Pic"
                        />
                    </div>
                    <div className="profile-details">
                        <div>Email: {userData.email}</div>
                        <div>Total Tables: {userData.tables.length || 0}</div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
