import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../config/userDataSlice";

const useLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            localStorage.removeItem("access-token");
            dispatch(logout());
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logged out failed");
        }
    };
    return handleLogout;
};

export default useLogout;
