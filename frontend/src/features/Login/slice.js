import { createSelector, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'LOGIN',
    initialState: {
        isLogining: false,
        token: '',
        username: '',
        password: '',
        group: '',
        error: null,
    },
    reducers : {
        dologin: (state, {payload : { username, password }}) => {
            console.log('reducer : '+ username)
            state.isLogining = true;
            state.username = username;
            state.password = password;
        },
        loginSuccess: (state, { payload: { token, username, group } }) => {
            state.isLogining = false;
            state.token = token;
            state.username = username;
            state.group = group;
        },
        loginFail: (state, { payload: error }) => {
            state.isLogining = false;
            state.error = error;
        },
    },
});

const selectUsername= createSelector(
    (state) => state.username,
    (username) => username
);

const selectPassword= createSelector(
    (state) => state.password,
    (password) => password
);

const selectToken= createSelector(
    (state) => state.token,
    (token) => token
);

const selectAllState = createSelector(
    selectUsername,
    selectPassword,
    selectToken,
    (username, password, token) => {
        return { username, password, token };
    },
);

export const LOGIN = slice.name;
export const loginSelector = {
    all: (state) => selectAllState(state[slice.name]),
    token: (state) => selectToken(state[slice.name]),
}
export const loginReducer = slice.reducer;
export const loginAction = slice.actions;
