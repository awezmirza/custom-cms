import { configureStore } from "@reduxjs/toolkit";
import userData from "./userDataSlice";
import tableData from "./tableDataSlice";

export const store = configureStore({
    reducer: {
        userDataSlice: userData,
        tableDataSlice: tableData
    }
});
