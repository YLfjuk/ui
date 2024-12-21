import type { DisplayInfo } from './models';

export type MousePosition = {
    x: number | string;
    y: number | string;
};

export type MouseData = {
    [K in DisplayInfo]: MousePosition;
};

export type DisplayMeta = {
    label?: string;
    description: string;
};

export type DisplaysMeta = {
    [K in DisplayInfo]: DisplayMeta;
};
