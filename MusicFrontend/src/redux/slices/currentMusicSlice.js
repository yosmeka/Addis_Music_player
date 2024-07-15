import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    music: null,
    isLooping: false,
}

const currentMusicSlice = createSlice({
    name: 'currentMusic',
    initialState,
    reducers: {
        play: (state, action) => {
            console.log('herre;', action)
            state.music = action.payload;
        },
        loop: (state) => {
            state.isLooping = !state.isLooping;
        }
    }
});

export const { play, loop } = currentMusicSlice.actions
export default currentMusicSlice.reducer
