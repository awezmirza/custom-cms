import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../utils/constant";

const initialState = {
    leaderboardsData: {},
    leaderboardsDataLoading: true,
    leaderboardsDataError: null
};

export const fetchLeaderboardData = createAsyncThunk(
    "fetchLeaderboardData",
    async (gameId, getState) => {
        const leaderboardsData =
            getState.getState()?.leaderboardsDataSlice?.leaderboardsData;
        if (leaderboardsData && leaderboardsData[gameId]) {
            return false;
        }
        const response = await axios.get(
            GAMES_SERVICE_URL + "/leaderboard/" + gameId
        );
        return { gameId, data: response?.data?.data };
    }
);

export const leaderboardsDataSlice = createSlice({
    name: "leaderboardsData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeaderboardData.pending, (state) => {
                state.leaderboardsDataLoading = true;
                state.leaderboardsDataError = null;
            })
            .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
                state.leaderboardsDataError = null;
                state.leaderboardsDataLoading = false;
                if (action.payload !== false) {
                    const { gameId, data } = action.payload;
                    state.leaderboardsData = {
                        ...state.leaderboardsData,
                        [gameId]: data
                    };
                }
            })
            .addCase(fetchLeaderboardData.rejected, (state, action) => {
                state.leaderboardsDataLoading = false;
                state.leaderboardsDataError = action.error.message;
            });
    }
});

export default leaderboardsDataSlice.reducer;
