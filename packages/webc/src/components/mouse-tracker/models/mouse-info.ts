import type { MouseData, MousePosition } from '../types';
import { DisplayInfo } from './display-info';

export class MouseInfo {
    private data: MouseData;

    constructor(event: MouseEvent) {
        this.data = {
            [DisplayInfo.Mouse]: { x: event.x, y: event.y },
            [DisplayInfo.Client]: { x: event.clientX, y: event.clientY },
            [DisplayInfo.Page]: { x: event.pageX, y: event.pageY },
            [DisplayInfo.Screen]: { x: event.screenX, y: event.screenY },
            [DisplayInfo.Offset]: { x: event.offsetX, y: event.offsetY },
            [DisplayInfo.Movement]: { x: event.movementX, y: event.movementY },
        };
    }

    getPosition(type: DisplayInfo): MousePosition {
        return this.data[type];
    }
}
