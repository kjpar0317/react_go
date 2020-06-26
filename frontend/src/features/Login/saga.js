import { call, put, select, takeLatest } from 'redux-saga/effects';
import { doLogin } from '../../api/login';
import { loginAction, loginSelector } from './slice';

function* handleLogin() {
    const { loginSuccess, loginFail } = loginAction;

    try {

        const logininfo = yield select(loginSelector.all);

        const res = yield call(doLogin, logininfo.userid, logininfo.password);

        yield put(
            loginSuccess({
                token: res.token,
                username: res.userinfo.username,
                group: res.userinfo.group
            }),
        );
    } catch (err) {
        yield put(loginFail(err));
    }
}

export function* watchLogin() {
    const { dologin } = loginAction;

    yield takeLatest(dologin, handleLogin);
}
