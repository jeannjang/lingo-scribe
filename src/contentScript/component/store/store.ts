import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@/src/contentScript/component/store/rootReducer';
import rootSaga from '@/src/contentScript/component/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>; // type of state when using useSelector
export type StoreDispatch = typeof store.dispatch; // type of dispatch function when using useDispatch
