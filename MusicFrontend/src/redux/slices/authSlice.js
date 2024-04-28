import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authenticating: false,
    user: null,
    error: '',
    loggedout: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state, action) => {},
        authSuccess: (state, action) => {
            state.authenticating = false;
            state.user = action.payload;
            state.error = '';
        },
        authFailure: (state, action) => {
            state.authenticating = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state, action) => {},
        logoutSuccess: (state, action) => {
            state.loggedout = action.payload
            state.authenticating = false;
            state.user = null;
            state.error = '';
        },
        logoutFailure: (state, action) => {
            state.error = action.payload
        },
        signUpStart: (state) => {
            state.authenticating = true;
            state.user = null;
            state.error = null;
        },
        getUserStart: (state) => {}
    }
});

export const { loginStart, authFailure, authSuccess, logout, signUpStart, getUserStart, logoutFailure, logoutSuccess } = authSlice.actions
export default authSlice.reducer;
