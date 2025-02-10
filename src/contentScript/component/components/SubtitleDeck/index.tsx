import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/contentScript/component/store/store';
import SubtitleBar from '@/src/contentScript/component/components/SubtitleDeck/SubtitleBar';
import DictationTextInput from '@/src/contentScript/component/components/SubtitleDeck/DictationTextInput';
import DeckModeSwitch from '@/src/contentScript/component/components/SubtitleDeck/DeckModeSwitch';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export type DeckMode = 'dictation' | 'dualSub';
const SubtitleDeck = () => {
    const subtitles = useSelector(
        (state: RootState) => state.subtitle.subtitles
    );
    const [isUserAnswerChecking, setIsUserAnswerChecking] = useState(false);
    const [deckMode, setDeckMode] = useState<DeckMode>('dictation');
    const [isAutoPause, setIsAutoPause] = useState(false);

    console.log('All subtitles:', subtitles);

    return (
        <>
            <div
                className={
                    'absolute bottom-44 w-full flex flex-col items-center justify-center space-y-1.5 pointer-events-auto'
                }
            >
                {subtitles.study && (
                    <SubtitleBar
                        subtitle={subtitles.study}
                        isUserAnswerChecking={isUserAnswerChecking}
                        deckMode={deckMode}
                        subType="study"
                        isAutoPause={isAutoPause}
                    />
                )}
                {subtitles.guide && (
                    <SubtitleBar
                        subtitle={subtitles.guide}
                        isUserAnswerChecking={isUserAnswerChecking}
                        deckMode={deckMode}
                        subType="guide"
                        isAutoPause={isAutoPause}
                    />
                )}

                {deckMode === 'dictation' ? (
                    //Control video playback based on the study subtitle timestamps.
                    <DictationTextInput
                        subtitle={subtitles.study}
                        setIsUserAnswerChecking={setIsUserAnswerChecking}
                    />
                ) : (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="auto-pause"
                            checked={isAutoPause}
                            onCheckedChange={(checked) =>
                                setIsAutoPause(checked)
                            }
                        />
                        <Label htmlFor="auto-pause" className={'text-white'}>
                            Auto Pause
                        </Label>
                    </div>
                )}

                <DeckModeSwitch mode={deckMode} setDeckModeChange={setDeckMode} />
            </div>
        </>
    );
};

export default SubtitleDeck;
