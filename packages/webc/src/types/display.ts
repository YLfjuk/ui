import type { DisplayInfo } from '../models/display-info';

export type DisplayMeta = {
    label?: string;
    description: string;
};

export type DisplaysMeta = {
    [K in DisplayInfo]: DisplayMeta;
};
