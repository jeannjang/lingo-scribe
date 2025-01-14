export const waitUntilAsync = async (
    condition: () => boolean | Promise<boolean>,
    pollIntervalMs: number = 50,
    timeoutAfterMs: number = 60000
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

export const assertExhaustive = (value: never, message?: string): never => {
    throw new Error(message ? message : `Unhandled value: ${value}`);
};
