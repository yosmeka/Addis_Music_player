import { configureStore } from '@reduxjs/toolkit'
import crrentMusicReducer from './slices/currentMusicSlice'

const store = configureStore({
  reducer: {
    currentMusic: crrentMusicReducer
  }
})

export default store