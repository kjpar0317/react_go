import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { all } from 'redux-saga/effects';

import { LOGIN, loginReducer } from 'features/Login/slice';
import { DASHBOARD, dashboardReducer } from 'features/DashBoard/slice';
import { UNSPLASH, unsplashReducer } from 'features/ImageGrid/slice';

import { watchLogin } from 'features/Login/saga';
import { watchDashboardLayoutList } from 'features/DashBoard/saga';
import { watchUnsplash } from 'features/ImageGrid/saga';

export const rootReducer = combineReducers({
    [LOGIN]: loginReducer,
    [DASHBOARD]: dashboardReducer,
    [UNSPLASH]: unsplashReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([watchLogin(), watchDashboardLayoutList(), watchUnsplash()]);
}

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: [sagaMiddleware],
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

export default createStore;
