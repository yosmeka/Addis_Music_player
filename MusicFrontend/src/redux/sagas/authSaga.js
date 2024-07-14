import { takeEvery, call, put, all } from 'redux-saga/effects';
import axios from '../../axiosUtils.js';
import { authFailure, authSuccess, getUserStart, loginStart, signUpStart, logout, logoutSuccess, logoutFailure } from '../slices/authSlice';

function* signUpSaga(action) {
    try {
        const response = yield call(axios.post, 'user/register', action.payload);
        const {id, email, refreshToken, accessToken} = response.data.data;
        localStorage.setItem('token', refreshToken);
        localStorage.setItem('accesstoken', accessToken);
        localStorage.setItem('id', id);
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
        yield put(authSuccess({id, email}));
    } catch(error) {
        yield put(authFailure(error.response.data.message));
    }
}

function* loginSaga(action) {
    try {
        const response = yield call(axios.post, 'user/login', action.payload);
        const {id, email, refreshToken, accessToken} = response.data.data;
        localStorage.setItem('token', refreshToken);
        localStorage.setItem('accesstoken', accessToken);
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        yield put(authSuccess({id, email}));
    } catch (error) {
        yield put(authFailure(error.response.data.message));
    }
}

function* logoutSaga(action) {
    try {
        const id = action.payload;
        const refreshtoken = localStorage.getItem('token')||''; 
        yield call(axios.post, `user/${id}/logout`, {refreshtoken});
        localStorage.clear();
        axios.defaults.headers['Authorization'] = '';
        yield put(logoutSuccess(true));
    } catch(error) {
        yield put(logoutFailure(error));
    }
}

export function* watchAuth() {
    yield all([
        takeEvery(signUpStart.type, signUpSaga),
        takeEvery(loginStart.type, loginSaga),
        takeEvery(logout.type, logoutSaga)
    ]);
}