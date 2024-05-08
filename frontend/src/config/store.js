import { configureStore } from "@reduxjs/toolkit";
import gamesData from "./gamesDataSlice";
import userData from "./userDataSlice";
import leaderboardsData from "./leaderboardsDataSlice";

export const store = configureStore({
    reducer: {
        gamesDataSlice: gamesData,
        userDataSlice: userData,
        leaderboardsDataSlice: leaderboardsData
    }
});
