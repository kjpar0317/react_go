import { createSelector, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'LOGIN',
    initialState: {
        isLogining: false,
        token: '',
        userid: '',
        password: '',
        username: '',
        group: '',
        error: null,
    },
    reducers : {
        dologin: (state, {payload : { userid, password }}) => {
            console.log('reducer : '+ userid)
            state.isLogining = true;
            state.userid = userid;
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

const selectUserid = createSelector(
    (state) => state.userid,
    (userid) => userid
);

const selectPassword= createSelector(
    (state) => state.password,
    (password) => password
);

const selectUsername= createSelector(
    (state) => state.username,
    (username) => username
);

const selectToken= createSelector(
    (state) => state.token,
    (token) => token
);

const selectAllState = createSelector(
    selectUserid,
    selectPassword,
    selectUsername,
    selectToken,
    (userid, password, username, token) => {
        return { userid, password, username, token };
    },
);

export const LOGIN = slice.name;
export const loginSelector = {
    all: (state) => selectAllState(state[slice.name]),
    token: (state) => selectToken(state[slice.name]),
}
export const loginReducer = slice.reducer;
export const loginAction = slice.actions;
