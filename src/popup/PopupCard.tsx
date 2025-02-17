import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComboBox from '@/src/contentScript/component/components/InitialLanguageSelectModal/ComboBox';

const PopupCard = () => {
    const [studyLanguage, setStudyLanguage] = useState<string | undefined>(
        undefined
    );
    const [guideLanguage, setGuideLanguage] = useState<string | undefined>(
        undefined
    );

    return (
        <div className={'w-[330px] flex flex-col p-5'}>
            {/* A: Title and App Switch*/}
            <div className={'flex items-center justify-between mb-10'}>
                <h1 className={'text-xl font-semibold'}>LINGO SCRIBE</h1>
                <Switch id={'app-switch'} />
            </div>

            {/* B: Set Mode Tabs*/}
            <div>
                <h2 className={'text-lg font-semibold mb-2'}>Set Mode</h2>
                <Tabs defaultValue={'dictation'}>
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
                                value={studyLanguage}
                                onSelect={setStudyLanguage}
                            />
                            <p>This will be your target language.</p>
                        </div>

                        {/* C: Select Guide Language*/}
                        <div className={'space-y-2 mb-10'}>
                            <h2 className={'text-lg font-semibold'}>
                                Guide Language
                            </h2>
                            <ComboBox
                                value={guideLanguage}
                                onSelect={setGuideLanguage}
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
                                <Switch disabled aria-readonly />
                            </div>
                            <p>AP is always on in dictation mode</p>
                        </div>
                    </TabsContent>

                    <TabsContent value={'dualSub'} className={'space-y-10'}>
                        {/* C: Select Study Language*/}
                        <div className={'space-y-2'}>
                            <h2 className={'text-lg font-semibold'}>
                                Study Language
                            </h2>
                            <ComboBox
                                value={studyLanguage}
                                onSelect={setStudyLanguage}
                            />
                            <p>This will be your target language.</p>
                        </div>

                        {/* C: Select Guide Language*/}
                        <div className={'space-y-2'}>
                            <h2 className={'text-lg font-semibold'}>
                                Guide Language
                            </h2>
                            <ComboBox
                                value={guideLanguage}
                                onSelect={setGuideLanguage}
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

                                <Switch id={'ap-switch'} />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PopupCard;
