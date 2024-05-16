import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tableData: null,
    tableColumnData: null,
    loading: true,
    error: null
};

const tableDataSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        fetchDataStart(state) {
            state.loading = true;
        },
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.tableData = action.payload.tableData;
            state.tableColumnData = action.payload.tableColumns;
            state.error = null;
        },
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = tableDataSlice.actions;
export default tableDataSlice.reducer;