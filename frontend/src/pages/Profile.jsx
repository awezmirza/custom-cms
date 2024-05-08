import React from "react";
import "../styles/profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector((state) => state.userDataSlice);

    return (
        <div>
            <div className="profile-card-container">
                <div className="pfcontainer">
                    <div className="topbarpf">Profile Details</div>
                    <div className="details">
                        <div className="data-label-container">
                            <div className="profile-label"> Username </div>
                            <div className="profile-data">
                                {userData.username || "username"}
                                <span className="material-symbols-rounded">
                                    edit
                                </span>
                            </div>
                        </div>
                        <div className="data-label-container">
                            <div className="profile-label"> Email </div>
                            <div className="profile-data">
                                {userData.email || "email"}
                            </div>
                        </div>
                        <div className="data-label-container">
                            <div className="profile-label"> Discord </div>
                            <div className="profile-data">
                                {userData.discordusername || "discordusername"}
                                {userData.discordusername ? (
                                    <span className="material-symbols-rounded">
                                        link_off
                                    </span>
                                ) : (
                                    <span className="material-symbols-rounded">
                                        link
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id="SignOutButtonContainer">
                        <button id="SignOutButton">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
