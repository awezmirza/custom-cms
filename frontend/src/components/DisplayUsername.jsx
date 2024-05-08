import axios from "axios";
import { useEffect, useState } from "react";
import { USER_SERVICE_URL } from "../utils/constant";
import Shimmer from "./Shimmer";

const DisplayUsername = ({ userId }) => {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        async function fetchUsername() {
            const usernameData = await axios.get(
                USER_SERVICE_URL + "/get-username-by-id/" + userId
            );
            setUsername(usernameData.data.data.username);
        }
        fetchUsername();
    }, []);
    if (!username) {
        return <Shimmer />;
    }
    return <>{username}</>;
};

export default DisplayUsername;
