import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';

export function* rootSaga() {
    yield all([
        watchAuth(),
    ]);
  }
