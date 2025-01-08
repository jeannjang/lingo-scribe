import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPreferences } from './store/userSlice';
import { RootState, StoreDispatch } from './store/store';
import InitialLanguageSelectModal from '@/src/contentScript/component/components/InitialLanguageSelectModal';

const App = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    if (userState.status === 'idle') {
        dispatch(fetchUserPreferences());
    }

    return <InitialLanguageSelectModal />;
};

export default App;
