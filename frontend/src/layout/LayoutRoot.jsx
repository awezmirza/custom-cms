import Navbar from "../components/navbarComponents/Navbar";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUserAccessToken } from "../config/userDataSlice";
import { useEffect } from "react";
import getCookie from "../utils/authFunctionsAndHooks/handleCookies/getCookie";
import handleAccessToken from "../utils/handleAccessToken";
import deleteCookie from "../utils/authFunctionsAndHooks/handleCookies/deleteCookie";
import { toast } from "react-toastify";

const LayoutRoot = () => {
    const { accessToken, isLogin } = useSelector(
        (state) => state.userDataSlice
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserData());
    }, [accessToken]);

    const params = useSearchParams()[0];
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            const token = getCookie("access-token");
            if (token) {
                handleAccessToken(token);
                dispatch(updateUserAccessToken(token));
                deleteCookie("access-token");
                toast.success("Logged in successfully");
            } else {
                const isLoginFailed = params.get("login-failed");
                if (isLoginFailed === "true") {
                    toast.error("Login Failed");
                }
                navigate("/auth/login");
            }
        }
    }, [isLogin]);

    // TODO - Check Toastify location

    return (
        <>
            <Navbar />
            <>
                <Outlet />
            </>
        </>
    );
};

export default LayoutRoot;
