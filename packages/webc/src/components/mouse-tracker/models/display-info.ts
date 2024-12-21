import type { ValueOf } from '@ylfjuk/core';

export const DisplayInfo = {
    Mouse: 'mouse',
    Client: 'client',
    Page: 'page',
    Screen: 'screen',
    Offset: 'offset',
    Movement: 'movement',
} as const;

export type DisplayInfo = ValueOf<typeof DisplayInfo>;
