import { combineReducers } from '@reduxjs/toolkit';
import currentMusicReducer from './currentMusicSlice';
import authReducer from './authSlice';
import playListReducer from './playListSlice';


const rootReducer = combineReducers({
  currentMusic: currentMusicReducer,
  auth: authReducer,
  playlist: playListReducer
});

export default rootReducer;
