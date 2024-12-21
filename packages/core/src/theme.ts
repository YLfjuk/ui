import type { ValueOf } from '@ylfjuk-core/types';

export const Theme = {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
} as const;

export type Theme = ValueOf<typeof Theme>;
