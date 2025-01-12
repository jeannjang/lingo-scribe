import { all } from 'redux-saga/effects';
import { fetchUserPreferencesSaga } from '@/src/contentScript/component/sagas/userSaga';
export default function* rootSaga() {
    yield all([fetchUserPreferencesSaga()]);
}
