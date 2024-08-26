import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    palylists: [],
    error: ''
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        fetchStarted: (state, action) => {},
        fetchSuccess: (state, action) => {
            state.authenticating = false;
            state.user = action.payload;
            state.error = '';
        },
        fetchFailure: (state, action) => {
            state.authenticating = false;
            state.user = null;
            state.error = action.payload;
        }
    }
});

export const { fetchFailure, fetchStarted, fetchSuccess } = playlistSlice.actions
export default playlistSlice.reducer;
