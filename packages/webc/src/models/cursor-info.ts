import type { CursorData, CursorPosition } from '../types/cursor';
import { DisplayInfo } from './display-info';

export class CursorInfo {
    private data: CursorData;

    constructor(event: MouseEvent) {
        this.data = {
            [DisplayInfo.Offset]: { x: event.x, y: event.y },
            [DisplayInfo.Client]: { x: event.clientX, y: event.clientY },
            [DisplayInfo.Page]: { x: event.pageX, y: event.pageY },
            [DisplayInfo.Screen]: { x: event.screenX, y: event.screenY },
            [DisplayInfo.Movement]: { x: event.movementX, y: event.movementY },
        };
    }

    getPosition(type: DisplayInfo): CursorPosition {
        return this.data[type];
    }
}
