import { createSelector, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'DASHBOARD',
    initialState: {
        isLogining: false,
        layouts: [],
        error: null,
    },
    reducers: {
        getLayouts: (state) => {
            console.log('getLayouts');
            state.isLogining = true;
        },
        getLayoutSuccess: (state, { payload: { layouts } }) => {
            console.log('getLayoutSuccess');
            state.isLogining = false;
            state.layouts = layouts;
        },
        setLayouts: (state, { payload: { layouts } }) => {
            state.layouts = layouts;
        },
        callFail: (state, { payload: error }) => {
            state.isLogining = false;
            state.error = error;
        },
    },
});

const selectLayouts = createSelector(
    (state) => state.layouts,
    (layouts) => layouts,
);

const selectAllState = createSelector(selectLayouts, (layouts) => {
    return { layouts };
});

export const DASHBOARD = slice.name;
export const dashboardSelector = {
    all: (state) => selectAllState(state[slice.name]),
};
export const dashboardReducer = slice.reducer;
export const dashboardAction = slice.actions;
