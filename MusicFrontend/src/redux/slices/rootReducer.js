import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import currentMusicReducer from './currentMusicSlice';
import authReducer from './authSlice';
import playListReducer from './playListSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  currentMusic: currentMusicReducer,
  auth: persistedAuthReducer,
  playlist: playListReducer
});

export default rootReducer;
