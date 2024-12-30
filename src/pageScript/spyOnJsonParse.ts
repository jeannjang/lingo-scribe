import {
    addSubtitleDownloadUrls,
    SubtitleDownloadUrls,
} from './subtitleDownloadUrlsStore';

const AVAILABLE_SUBTITLE_FORMAT = ['dfxp-ls-sdh', 'simplesdh', 'imsc1.1'];

const spyOnJsonParse = (windowObject: Window & { JSON: any }) => {
    const originalJsonParse = windowObject.JSON.parse;

    windowObject.JSON.parse = (
        ...args: Parameters<typeof originalJsonParse>
    ) => {
        const result = originalJsonParse(...args);

        if (result && result.result && result.result.movieId) {
            // Extract subtitle download URLs from the JSON response
            const subtitleDownloadUrls: SubtitleDownloadUrls =
                result.result.timedtexttracks
                    .filter((textTrack: any) => textTrack.ttDownloadables)
                    .reduce((acc: SubtitleDownloadUrls, textTrack: any) => {
                        const availableUrls = Object.keys(
                            textTrack.ttDownloadables
                        )
                            .filter((key) =>
                                AVAILABLE_SUBTITLE_FORMAT.includes(key)
                            )
                            .flatMap(
                                (key) => textTrack.ttDownloadables[key].urls
                            )
                            .map((urlData) => urlData.url);

                        if (availableUrls.length > 0) {
                            acc[textTrack.language] = availableUrls;
                        }

                        return acc;
                    }, {});

            addSubtitleDownloadUrls(subtitleDownloadUrls);
        }

        return result;
    };
};

export default spyOnJsonParse;
