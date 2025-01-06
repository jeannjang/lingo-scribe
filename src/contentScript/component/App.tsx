import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPreferences } from './store/userSlice';
import { RootState, StoreDispatch } from './store/store';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const App = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    if (userState.status === 'idle') {
        dispatch(fetchUserPreferences());
    }

    return (
        <div className={'fixed top-0 left-0 w-full h-full bg-transparent'}>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant={'secondary'}>Cancel</Button>
                        <Button>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default App;
