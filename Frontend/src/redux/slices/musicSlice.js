import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: '',
    musics: [],
}

const musicSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {
        getMusicStart: (state) => {
            state.isLoading = true;
        },
        getMusicSuccess: (state, action) => {
            state.isLoading = false;
            state.musics = action.payload;
            state.error = '';
        },
        getMusicFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addMusicStart: (state) => {
            state.isLoading = true;
        },
        addMusicSuccess: (state, action) => {
            state.isLoading = false;
            state.musics.push(action.payload);
            state.error = '';
        },
        addMusicFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        deleteMusicStart: (state) => {
            state.isLoading = true;
        },
        deleteMusicSuccess: (state, action) => {
            state.isLoading = false;
            state.musics = state.musics.filter(music => music.id !== action.payload);
            state.error = '';
        },
        deleteMusicFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateMusicStart: (state) => {
            state.isLoading = true;
        },
        updateMusicSuccess: (state, action) => {
            state.isLoading = false;
            state.musics = state.musics.map(music => music.id === action.payload.id ? action.payload : music);
            state.error = '';
        },
        updateMusicFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export const { getMusicStart, getMusicSuccess, getMusicFailure, addMusicStart, addMusicSuccess, addMusicFailure, deleteMusicStart, deleteMusicSuccess, deleteMusicFailure, updateMusicStart, updateMusicSuccess, updateMusicFailure } = musicSlice.actions
export default musicSlice.reducer;
