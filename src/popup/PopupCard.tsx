import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComboBox from '@/src/contentScript/component/components/InitialLanguageSelectModal/ComboBox';
import { DeckMode, UserPreferences } from '@/src/types/userPreferences';
import { messageType } from '@/src/types/messages';

interface IProps {
    userPreferences: UserPreferences | undefined;
}

const PopupCard: React.FC<IProps> = ({ userPreferences }) => {
    if (!userPreferences) {
        return null;
    }

    const handleAppEnabledChange = (isEnabled: boolean) => {
        const newUserPreferences = {
            ...userPreferences,
            isAppEnabled: isEnabled,
        };

        chrome.runtime.sendMessage({
            type: messageType.setUserPreferences,
            payload: { userPreferences: newUserPreferences },
        });
    };

    const handleDeckModeChange = (newDeckModeValue: DeckMode) => {
        const newUserPreferences = {
            ...userPreferences,
            deckMode: newDeckModeValue,
            isAutoPause:
                newDeckModeValue === 'dictation'
                    ? true
                    : userPreferences.isAutoPause,
        };
        chrome.runtime.sendMessage({
            type: messageType.setUserPreferences,
            payload: { userPreferences: newUserPreferences },
        });
    };

    const handleStudyLanguageChange = (language: string) => {
        const newUserPreferences = {
            ...userPreferences,
            studyLanguage: language,
        };

        chrome.runtime.sendMessage({
            type: messageType.setUserPreferences,
            payload: { userPreferences: newUserPreferences },
        });
    };

    const handleGuideLanguageChange = (language: string) => {
        const newUserPreferences = {
            ...userPreferences,
            guideLanguage: language,
        };

        chrome.runtime.sendMessage({
            type: messageType.setUserPreferences,
            payload: { userPreferences: newUserPreferences },
        });
    };

    const handleIsAutoPauseChange = (isAutoPaused: boolean) => {
        const newUserPreferences = {
            ...userPreferences,
            isAutoPause: isAutoPaused,
        };

        chrome.runtime.sendMessage({
            type: messageType.setUserPreferences,
            payload: { userPreferences: newUserPreferences },
        });
    };

    return (
        <div className={'w-[330px] flex flex-col p-5'}>
            {/* A: Title and App Switch*/}
            <div className={'flex items-center justify-between mb-10'}>
                <h1 className={'text-xl font-semibold'}>LINGO SCRIBE</h1>
                <Switch
                    id={'app-switch'}
                    checked={userPreferences.isAppEnabled}
                    onCheckedChange={handleAppEnabledChange}
                />
            </div>

            {/* B: Set Mode Tabs*/}
            <div>
                <h2 className={'text-lg font-semibold mb-2'}>Mode</h2>
                <Tabs
                    value={userPreferences.deckMode}
                    onValueChange={(newDeckModeValue) =>
                        handleDeckModeChange(newDeckModeValue as DeckMode)
                    }
                >
                    <TabsList className={'w-full grid grid-cols-2 mb-10'}>
                        <TabsTrigger value={'dictation'}>Dictation</TabsTrigger>
                        <TabsTrigger value={'dualSub'}>Dual Sub</TabsTrigger>
                    </TabsList>
                    <TabsContent value={'dictation'}>
                        {/* C: Select Study Language*/}
                        <div className={'space-y-2 mb-10'}>
                            <h2 className={'text-lg font-semibold'}>
                                Study Language
                            </h2>
                            <ComboBox
                                value={userPreferences?.studyLanguage}
                                onSelect={handleStudyLanguageChange}
                            />
                            <p>This will be your target language.</p>
                        </div>

                        {/* C: Select Guide Language*/}
                        <div className={'space-y-2 mb-10'}>
                            <h2 className={'text-lg font-semibold'}>
                                Guide Language
                            </h2>
                            <ComboBox
                                value={userPreferences?.guideLanguage}
                                onSelect={handleGuideLanguageChange}
                            />
                            <p>This will be your native language.</p>
                        </div>

                        {/* D: Auto Pause Switch*/}
                        <div className={'space-y-2'}>
                            <div
                                className={'flex items-center justify-between'}
                            >
                                <h2 className={'text-lg font-semibold'}>
                                    Auto Pause
                                </h2>
                                <Switch
                                    disabled
                                    checked={userPreferences.isAutoPause}
                                    aria-readonly
                                />
                            </div>
                            <p>AP is always on in dictation mode</p>
                        </div>
                    </TabsContent>

                    <TabsContent
                        value={'dualSub' as DeckMode}
                        className={'space-y-10'}
                    >
                        {/* C: Select Study Language*/}
                        <div className={'space-y-2'}>
                            <h2 className={'text-lg font-semibold'}>
                                Study Language
                            </h2>
                            <ComboBox
                                value={userPreferences?.studyLanguage}
                                onSelect={handleStudyLanguageChange}
                            />
                            <p>This will be your target language.</p>
                        </div>

                        {/* C: Select Guide Language*/}
                        <div className={'space-y-2'}>
                            <h2 className={'text-lg font-semibold'}>
                                Guide Language
                            </h2>
                            <ComboBox
                                value={userPreferences?.guideLanguage}
                                onSelect={handleGuideLanguageChange}
                            />
                            <p>This will be your native language.</p>
                        </div>

                        {/* D: Auto Pause Switch*/}
                        <div className={'space-y-2'}>
                            <div
                                className={'flex items-center justify-between'}
                            >
                                <h2 className={'text-lg font-semibold'}>
                                    Auto Pause
                                </h2>

                                <Switch
                                    id={'ap-switch'}
                                    checked={userPreferences.isAutoPause}
                                    onCheckedChange={handleIsAutoPauseChange}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PopupCard;
