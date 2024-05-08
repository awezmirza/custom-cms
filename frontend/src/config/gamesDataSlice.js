import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GAMES_SERVICE_URL } from "../utils/constant";

const initialState = {
    gamesData: null,
    gamesDataLoading: true,
    gamesDataError: null
};

export const fetchGamesData = createAsyncThunk(
    "fetchGamesData",
    async (dispatch, getState) => {
        const gamesData = getState.getState()?.gamesDataSlice?.gamesData;
        if (gamesData) {
            return gamesData;
        } else {
            const response = await axios.get(GAMES_SERVICE_URL + "/games");
            return response?.data?.data;
        }
    }
);

export const gamesDataSlice = createSlice({
    name: "gamesData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamesData.pending, (state) => {
                state.gamesDataLoading = true;
                state.gamesDataError = null;
            })
            .addCase(fetchGamesData.fulfilled, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesData = action.payload;
                state.gamesDataError = null;
            })
            .addCase(fetchGamesData.rejected, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesDataError = action.error.message;
            });
    }
});

export default gamesDataSlice.reducer;
