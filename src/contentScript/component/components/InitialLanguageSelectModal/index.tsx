import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ComboBox from '@/src/contentScript/component/components/InitialLanguageSelectModal/ComboBox';
import {
    RootState,
    StoreDispatch,
} from '@/src/contentScript/component/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setUserPreferences as setUserPreferencesInDB } from '@/src/serviceWorker/indexedDbOperations';
import { UserPreferences } from '@/src/types/userPreferences';
import { VideoPauseMessage, VideoPlayMessage } from '@/src/types/messages';
import { userPreferencesSet } from '@/src/contentScript/component/actions';

const InitialLanguageSelectModal = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    const isInitialLanguageModalOpen =
        userState.status === 'success' && !userState.preferences?.studyLanguage;

    useEffect(() => {
        if (isInitialLanguageModalOpen) {
            window.postMessage(
                { type: 'VIDEO/PAUSE' } satisfies VideoPauseMessage,
                '*'
            );
        }
    }, [isInitialLanguageModalOpen]);

    const [studyLanguage, setStudyLanguage] = useState<string | undefined>();
    const [guideLanguage, setGuideLanguage] = useState<string | undefined>();

    const handleSave = async () => {
        if (!studyLanguage || !guideLanguage) return;

        const preferences: UserPreferences = {
            version: 1,
            isAppEnabled: true,
            studyLanguage,
            guideLanguage,
        };

        dispatch(userPreferencesSet(preferences));

        await setUserPreferencesInDB(preferences);

        window.postMessage(
            { type: 'VIDEO/PLAY' } satisfies VideoPlayMessage,
            '*'
        );
    };

    return (
        <Dialog open={isInitialLanguageModalOpen}>
            <DialogContent showCloseButton={false} className="p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl pb-2 leading-none">
                        Select your language!
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Select languages you want to learn, and your native.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <p className={'text-base font-semibold'}>
                            Study Language
                        </p>
                        <p className="text-sm text-muted-foreground">
                            This is the language that will be used for
                            dictation.
                        </p>
                        <ComboBox
                            value={studyLanguage}
                            onSelect={setStudyLanguage}
                        />
                    </div>
                    <div className="grid gap-2">
                        <p className={'text-base font-semibold'}>
                            Guide Language
                        </p>
                        <p className="text-sm text-muted-foreground">
                            This is the language that will be used for
                            translation.
                        </p>
                        <ComboBox
                            value={guideLanguage}
                            onSelect={setGuideLanguage}
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button
                        variant="default"
                        onClick={handleSave}
                        disabled={!studyLanguage || !guideLanguage}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default InitialLanguageSelectModal;
