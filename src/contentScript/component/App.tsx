import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from './store/store';
import InitialLanguageSelectModal from '@/src/contentScript/component/components/InitialLanguageSelectModal';
import { determineIfWindowOnPlayerPage } from '@/src/pageScript/spyOnPageUrl';
import { fetchUserPreferencesInitialised } from '@/src/contentScript/component/actions/userActions';
import { isWindowOnPlayerPageSet } from '@/src/contentScript/component/actions';

const App = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);
    const isWindowOnPlayerPage = useSelector(
        (state: RootState) => state.app.isWindowOnPlayerPage
    );

    // When App is loaded firs time, we should check if the window is on videoPlayer page or not.
    useEffect(() => {
        const currentUrl = window.location.href;
        dispatch(
            isWindowOnPlayerPageSet({
                isWindowOnPlayerPage: determineIfWindowOnPlayerPage(currentUrl),
            })
        );
    }, []);

    if (!isWindowOnPlayerPage) {
        return null;
    }

    if (userState.status === 'idle') {
        dispatch(fetchUserPreferencesInitialised());
    }

    return <InitialLanguageSelectModal />;
};

export default App;
