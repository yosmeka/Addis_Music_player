import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchMusic } from './musicSaga';

export function* rootSaga() {
    yield all([
        watchAuth(),
        watchMusic()
    ]);
  }
