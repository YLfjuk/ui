import { DisplayInfo } from './models';
import type { MousePosition } from './types';
import type { DisplaysMeta } from './types';

export const ControlledTheme = 'controlled';

export const InfoFooter = {
    x: 'x',
    y: 'y',
} as const satisfies MousePosition;

export const DisplayMeta: DisplaysMeta = {
    [DisplayInfo.Mouse]: {
        description: 'Position relative to the viewport. Alias for client',
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
    [DisplayInfo.Offset]: {
        description: 'Position relative to the target element',
    },
    [DisplayInfo.Movement]: {
        label: 'mov',
        description: 'Relative mouse movement since last event',
    },
};
