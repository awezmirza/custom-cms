import React, { useEffect, useState } from "react";
import GoogleLoginComponent from "../components/authPageComponents/GoogleLoginComponent";
import { LOGIN_PAGE_BANNER_URL } from "../utils/constant";
import "../styles/loginPageStyles/loginPage.css";
import RegistrationForm from "../components/authPageComponents/RegistrationForm";
import LoginForm from "../components/authPageComponents/LoginForm";
import ResetPass from "../components/authPageComponents/resetPass/ResetPass";
import { useNavigate, useParams } from "react-router-dom";

// TODO find for {" "} and replace with nothing

const Auth = () => {
    const [wantsToRegister, setWantsToRegister] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const { purpose } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (purpose === "login") {
            setWantsToRegister(false);
            setShowResetPassword(false);
        } else if (purpose === "register") {
            setWantsToRegister(true);
        } else if (purpose === "reset-pass") {
            setWantsToRegister(false);
            setShowResetPassword(true);
        } else {
            navigate("/auth/login");
        }
    }, [purpose]);

    return (
        <div className="login-page-container">
            <div className="login-components-container">
                <img
                    className="login-page-banner"
                    src={LOGIN_PAGE_BANNER_URL}
                    alt="Login Page Banner"
                />
                <div
                    className={
                        "components-container glass-effect " +
                        (wantsToRegister ? "abs-pos-left" : "abs-pos-right")
                    }
                >
                    {wantsToRegister ? (
                        <RegistrationForm />
                    ) : (
                        <>
                            {showResetPassword ? <ResetPass /> : <LoginForm />}

                            <div className="forgot-pass-btn-container">
                                <button
                                    className="forgot-pass-btn"
                                    type="button"
                                    onClick={() => {
                                        if (showResetPassword) {
                                            navigate("/auth/login");
                                        } else {
                                            navigate("/auth/reset-pass");
                                        }
                                    }}
                                >
                                    {showResetPassword ? (
                                        <>Back to login</>
                                    ) : (
                                        <>Forgot Password?</>
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    <div className="line-container">
                        <div className="line"></div>
                        <div className="or-text">OR</div>
                        <div className="line"></div>
                    </div>

                    <GoogleLoginComponent />
                    <button
                        type="button"
                        className="toggle-login-register-btn"
                        onClick={() => {
                            if (wantsToRegister) {
                                navigate("/auth/login");
                            } else {
                                navigate("/auth/register");
                            }
                        }}
                    >
                        {wantsToRegister ? (
                            <>
                                Already have an account?&nbsp;
                                <span>Click to Login</span>
                            </>
                        ) : (
                            <>
                                Don't have an account?&nbsp;
                                <span>Click to Register</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
