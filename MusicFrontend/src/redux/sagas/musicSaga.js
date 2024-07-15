import { takeEvery, call, put, all } from 'redux-saga/effects';
import axios from '../../axiosUtils.js';
import { getMusicSuccess, getMusicFailure, getMusicStart } from '../slices/musicSlice.js';

function* fetchMusic() {
    try {
        const response = yield call(axios.get, 'music');
        yield put(getMusicSuccess(response.data.data));
    } catch (error) {
        yield put(getMusicFailure(error.message));
    }
}

export function* watchMusic() {
    yield takeEvery(getMusicStart.type, fetchMusic);
}
