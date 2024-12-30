export const waitUntilAsync = async (
    condition: () => boolean | Promise<boolean>,
    pollIntervalMs: number = 50,
    timeoutAfterMs: number = 5000
) => {
    const startTime = Date.now();

    while (true) {
        if (startTime + timeoutAfterMs < Date.now()) {
            throw new Error('Timeout');
        }

        if (condition.constructor.name === 'AsyncFunction') {
            if (await condition()) {
                return;
            } else {
                await new Promise((resolve) =>
                    setTimeout(resolve, pollIntervalMs)
                );
            }
        } else if (condition()) {
            return;
        } else {
            await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        }
    }
};