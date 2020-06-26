import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { all } from 'redux-saga/effects';

import { LOGIN, loginReducer } from '../features/Login/slice';
import { UNSPLASH, unsplashReducer } from '../features/ImageGrid/slice';

import { watchLogin } from '../features/Login/saga';
import { watchUnsplash } from '../features/ImageGrid/saga';

export const rootReducer = combineReducers({
    [LOGIN]: loginReducer,
    [UNSPLASH]: unsplashReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([watchLogin(), watchUnsplash()]);
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
