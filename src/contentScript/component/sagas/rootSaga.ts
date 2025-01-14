import { all } from 'redux-saga/effects';
import { fetchUserPreferencesSaga } from '@/src/contentScript/component/sagas/userSaga';
import { subtitleSaga } from '@/src/contentScript/component/sagas/subtitleSaga';
import { loadSubtitlesSaga } from '@/src/contentScript/component/sagas/loadSubtitlesSaga';

export default function* rootSaga() {
    yield all([
        fetchUserPreferencesSaga(),
        subtitleSaga(),
        loadSubtitlesSaga(),
    ]);
}
