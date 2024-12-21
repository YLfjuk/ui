import type { Theme } from '@ylfjuk-ui/core';
import { ControlledTheme } from './consts';

export const isThemeControlled = (
    theme: Theme | typeof ControlledTheme
): theme is typeof ControlledTheme => theme === ControlledTheme;
