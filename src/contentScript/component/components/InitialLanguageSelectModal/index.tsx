import React from 'react';
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
import { setUserPreferences } from '@/src/contentScript/component/store/userSlice';
import { setUserPreferences as setUserPreferencesInDB } from '@/src/serviceWorker/indexedDbOperations';
import { UserPreferences } from '@/src/types/userPreferences';

const InitialLanguageSelectModal = () => {
    const dispatch = useDispatch<StoreDispatch>();
    const userState = useSelector((state: RootState) => state.user);

    const isInitialLanguageModalOpen =
        userState.status === 'success' && !userState.preferences?.studyLanguage;

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

        dispatch(setUserPreferences(preferences));

        await setUserPreferencesInDB(preferences);
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
