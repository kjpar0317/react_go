import { call, put, takeLatest } from 'redux-saga/effects';
import { getDashboardLayouts } from 'api';
import { dashboardAction } from './slice';

function* handleDashboardLayoutList() {
    const { getLayoutSuccess, callFail } = dashboardAction;

    try {
        const res = yield call(getDashboardLayouts);

        yield put(
            getLayoutSuccess({
                layouts: res.layouts,
            }),
        );
    } catch (err) {
        yield put(callFail(err));
    }
}

export function* watchDashboardLayoutList() {
    const { getLayouts } = dashboardAction;

    yield takeLatest(getLayouts, handleDashboardLayoutList);
}
