import { SubtitleLine } from '../types/subtitle';

const parseXmlToSubtitles = (xmlSubtitleString: string): SubtitleLine[] => {
    const domParser = new DOMParser();
    const parsedDocument = domParser.parseFromString(
        xmlSubtitleString,
        'text/xml'
    );

    const tickRateString = parsedDocument
        .querySelector<'tt'>('tt')
        ?.getAttribute('ttp:tickRate');
    const tickRate = tickRateString ? parseInt(tickRateString) : 1;
    const millisecondsPerTick = 1000 / tickRate;
    const subtitleElements = parsedDocument.querySelectorAll('body>div>p');
    return (
        Array.from(subtitleElements)
            .filter(
                (element) =>
                    element.getAttribute('begin') && element.getAttribute('end')
            )
            .map((element) => {
                return {
                    beginMs:
                        parseInt(
                            <string>(
                                element.getAttribute('begin')?.replace('t', '')
                            )
                        ) * millisecondsPerTick,
                    endMs:
                        parseInt(
                            <string>(
                                element.getAttribute('end')?.replace('t', '')
                            )
                        ) * millisecondsPerTick,
                    text: element.innerHTML,
                };
            })
            .map((subtitleLine) => {
                const sanitizedText = subtitleLine.text
                    // to merge subtitles that were split into two lines by <br> tags, replacing it with a space.
                    .replace(/<br\b[^>]*\/?>/g, ' ')
                    // Removing tags in <>, () or [] which are not human spoken text
                    .replace(/(\[[^\]]*\]|<[^>]*>|\([^)]*\))/g, '')
                    // When there are multiple characters lines are in one text line, they are separated by '-'
                    // We would like to put a space between the end of line and the delimiter ('-').
                    .replace(/(.)-/g, '$1 -');
                return {
                    ...subtitleLine,
                    text: sanitizedText,
                };
            })
            .filter((subtitleLine) => subtitleLine.text.length > 0)
            // Sometimes one subtitle line is broken into two pieces.
            .reduce((acc, currentLine, currentIndex) => {
                if (currentIndex == 0) {
                    acc.push(currentLine);
                    return acc;
                }

                const lastLine = acc[acc.length - 1];
                if (
                    lastLine.beginMs === currentLine.beginMs &&
                    lastLine.endMs === currentLine.endMs
                ) {
                    acc[acc.length - 1] = {
                        beginMs: lastLine.beginMs,
                        endMs: lastLine.endMs,
                        text: [lastLine.text, currentLine.text].join(' '),
                    };
                } else {
                    acc.push(currentLine);
                }

                return acc;
            }, [] as SubtitleLine[])
            // Merge overlapped lines into one
            .reduce((acc, currentSubtitleLine, currentIndex) => {
                if (currentIndex == 0) {
                    acc.push(currentSubtitleLine);
                    return acc;
                }

                const lastSubtitleLine = acc[acc.length - 1];
                if (lastSubtitleLine.endMs >= currentSubtitleLine.beginMs) {
                    acc[acc.length - 1] = {
                        beginMs: lastSubtitleLine.beginMs,
                        endMs: Math.max(
                            lastSubtitleLine.endMs,
                            currentSubtitleLine.endMs
                        ),
                        text: [
                            lastSubtitleLine.text,
                            currentSubtitleLine.text,
                        ].join(' '),
                    };
                } else {
                    acc.push(currentSubtitleLine);
                }
                return acc;
            }, [] as SubtitleLine[])
    );
};

export default parseXmlToSubtitles;
