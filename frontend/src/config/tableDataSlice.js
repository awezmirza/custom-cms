import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tableData: null,
    tableColumnData: null,
    tableDataLoading: true,
    tableDataError: null
};

const tableDataSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.tableDataLoading = true;
        },
        fetchDataSuccess(state, action) {
            state.tableDataLoading = false;
            state.tableData = action.payload.tableData;
            state.tableColumnData = action.payload.tableColumns;
            state.tableDataError = null;
        },
        fetchDataFailure(state, action) {
            state.tableDataLoading = false;
            state.tableDataError = action.payload;
        }
    }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = tableDataSlice.actions;
export default tableDataSlice.reducer;