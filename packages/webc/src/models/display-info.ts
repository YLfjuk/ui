import type { ValueOf } from '@ylfjuk/core';

export const DisplayInfo = {
    Offset: 'offset',
    Client: 'client',
    Page: 'page',
    Screen: 'screen',
    Movement: 'movement',
} as const;

export type DisplayInfo = ValueOf<typeof DisplayInfo>;
