import type { ValueOf } from '@ylfjuk-core/types';

export const Theme = {
    Light: 'light',
    Dark: 'dark',
    System: 'system',
} as const;

export type Theme = ValueOf<typeof Theme>;
