import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from './store/store';
import InitialLanguageSelectModal from '@/src/contentScript/component/components/InitialLanguageSelectModal';
import { determineIfWindowOnPlayerPage } from '@/src/pageScript/spyOnPageUrl';
import { setIsWindowOnPlayerPage } from '@/src/contentScript/component/store/appSlice';
import { fetchUserPreferencesInitialised } from '@/src/contentScript/component/actions/userActions';

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
            setIsWindowOnPlayerPage({
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
