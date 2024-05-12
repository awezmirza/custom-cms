import { configureStore } from "@reduxjs/toolkit";
import userData from "./userDataSlice";

export const store = configureStore({
    reducer: {
        userDataSlice: userData
    }
});
