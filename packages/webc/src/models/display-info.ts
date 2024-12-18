import type { ValueOf } from '@ylfjuk-core/types';

export const DisplayInfo = {
    Offset: 'offset',
    Client: 'client',
    Page: 'page',
    Screen: 'screen',
    Movement: 'movement',
} as const;

export type DisplayInfo = ValueOf<typeof DisplayInfo>;
