import { DisplayInfo } from '../models/display-info';
import type { CursorPosition } from '../types/cursor';
import type { DisplaysMeta } from '../types/display';

export const InfoFooter = {
    x: 'x',
    y: 'y',
} as const satisfies CursorPosition;

export const DisplayMeta: DisplaysMeta = {
    [DisplayInfo.Offset]: {
        description: 'Position relative to the target element',
    },
    [DisplayInfo.Client]: {
        description: 'Position relative to the viewport',
    },
    [DisplayInfo.Page]: {
        description: 'Position relative to the document',
    },
    [DisplayInfo.Screen]: {
        description: 'Position relative to the screen',
    },
    [DisplayInfo.Movement]: {
        label: 'mov',
        description: 'Relative mouse movement since last event',
    },
};
