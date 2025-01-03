import React from 'react';
import TestBox from './features/TestBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPreferences } from './store/userSlice';
import { RootState, StoreDispatch } from './store/store';

const App = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    if (userState.status === 'idle') {
        dispatch(fetchUserPreferences());
    }

    return <TestBox />;
};

export default App;
