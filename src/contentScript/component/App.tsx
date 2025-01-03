import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPreferences } from './store/userSlice';
import { RootState, StoreDispatch } from './store/store';

const App = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    if (userState.status === 'idle') {
        dispatch(fetchUserPreferences());
    }

    return (
        <div className="fixed w-full h-full bg-amber-200">
            <h1>Subtitle Extension</h1>
        </div>
    );
};

export default App;
