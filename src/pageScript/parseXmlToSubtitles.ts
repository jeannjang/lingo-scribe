import { Subtitle } from '../types/subtitle';

const parseXmlToSubtitles = (xmlSubtitleString: string): Subtitle[] => {
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

    return Array.from(subtitleElements)
        .filter(
            (element) =>
                element.getAttribute('begin') && element.getAttribute('end')
        )
        .map((element) => {
            return {
                startTime:
                    parseInt(
                        <string>element.getAttribute('begin')?.replace('t', '')
                    ) * millisecondsPerTick,
                endTime:
                    parseInt(
                        <string>element.getAttribute('end')?.replace('t', '')
                    ) * millisecondsPerTick,
                text: element.innerHTML,
            };
        });
};

export default parseXmlToSubtitles;