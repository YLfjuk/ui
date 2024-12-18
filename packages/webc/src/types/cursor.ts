import type { DisplayInfo } from '../models/display-info';

export type CursorPosition = {
    x: number | string;
    y: number | string;
};

export type CursorData = {
    [K in DisplayInfo]: CursorPosition;
};
