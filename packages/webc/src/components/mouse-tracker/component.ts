import { Theme } from '@ylfjuk-ui/core';
import { toggle } from '@ylfjuk/core';
import { LitElement, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { ControlledTheme, DisplayMeta, InfoFooter } from './consts';
import { DisplayInfo, MouseInfo } from './models';
import { styles } from './styles';
import type { MousePosition } from './types';
import { isThemeControlled } from './utils';

const tag = 'mouse-tracker';

@customElement(tag)
export class MouseTracker extends LitElement {
    // #region Styles
    static override styles = styles;
    // #endregion

    // #region Properties
    @property({ type: Boolean })
    hideUntilData = false;

    @property({ type: Boolean })
    controlled = false;

    @property({ type: Boolean, reflect: true })
    pinned = false;

    @property({ type: Boolean, reflect: true })
    expanded = false;

    @property({ reflect: true })
    theme: Theme | typeof ControlledTheme = Theme.System;
    // #endregion

    // #region State
    @state()
    private mouseInfo: MouseInfo | null = null;

    @state()
    private activeDisplay: DisplayInfo = DisplayInfo.Mouse;
    // #endregion

    // #region Lifecycle
    override attributeChangedCallback(
        name: string,
        oldVal: string | null,
        newVal: string | null
    ) {
        if (name !== 'theme') {
            super.attributeChangedCallback(name, oldVal, newVal);
            return;
        }

        if (
            newVal &&
            Object.values<string>(Theme)
                .concat(ControlledTheme)
                .includes(newVal)
        ) {
            super.attributeChangedCallback(name, oldVal, newVal);
        } else {
            super.attributeChangedCallback(name, oldVal, Theme.System);
        }
    }

    override connectedCallback() {
        super.connectedCallback();
        window.addEventListener('mousemove', this.#onMouseMove);
    }

    override disconnectedCallback() {
        window.removeEventListener('mousemove', this.#onMouseMove);
        super.disconnectedCallback();
    }
    // #endregion

    // #region Render
    override render() {
        if (this.hideUntilData && !this.mouseInfo) return nothing;

        const handleToggle = () => {
            if (this.expanded) return;
            this.#toggleDisplayInfo();
        };

        return html`
            <div class="tracker">
                ${this.#renderControls()}
                <div @click=${handleToggle} class="info">
                    ${this.#renderInfo()}
                    <div class="info-footer">
                        ${this.#renderPosition(InfoFooter)}
                    </div>
                </div>
            </div>
        `;
    }

    #renderControls() {
        if (this.controlled) {
            return nothing;
        }

        return html`<div class="controls">
            <button @click=${this.#togglePin}>${this.#renderPinSvg()}</button>
            <button @click=${this.#toggleExpand}>
                ${this.#renderExpandSvg()}
            </button>
            ${when(
                isThemeControlled(this.theme),
                () => nothing,
                () => html`<button @click=${this.#toggleTheme}>
                    ${this.#renderThemeSvg()}
                </button>`
            )}
        </div>`;
    }

    #renderPinSvg() {
        return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            stroke="var(--mouse-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            class="pin"
        >
            <path d="M12 17v5" />
            <path
                d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
        </svg>`;
    }

    #renderExpandSvg() {
        return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mouse-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            class="expanded"
        >
            <g>
                ${when(
                    this.expanded,
                    () => svg`
                        <polyline points="4 14 10 14 10 20"/>
                        <polyline points="20 10 14 10 14 4"/>
                        <line x1="14" x2="21" y1="10" y2="3"/>
                        <line x1="3" x2="10" y1="21" y2="14"/>
                    `,
                    () => svg`
                        <polyline points="15 3 21 3 21 9"/>
                        <polyline points="9 21 3 21 3 15"/>
                        <line x1="21" x2="14" y1="3" y2="10"/>
                        <line x1="3" x2="10" y1="21" y2="14"/>
                    `
                )}
            </g>
        </svg>`;
    }

    #renderThemeSvg() {
        const classes = {
            theme: true,
            system: this.theme === Theme.System,
            light: this.theme === Theme.Light,
            dark: this.theme === Theme.Dark,
        };

        return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mouse-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
            class="${classMap(classes)}"
        >
            <g class="system">
                <rect width="20" height="14" x="2" y="3" rx="2"/>
                <line x1="8" x2="16" y1="21" y2="21"/>
                <line x1="12" x2="12" y1="17" y2="21"/>
            </g>
            <g class="light">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
            </g>
            <g class="dark">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </g>
        </svg>`;
    }

    #renderInfo() {
        if (this.expanded) {
            return html`${Object.values(DisplayInfo).map((display) =>
                this.#renderInfoType(display, display === this.activeDisplay)
            )}`;
        }

        return this.#renderInfoType(this.activeDisplay);
    }

    #renderInfoType(display: DisplayInfo, highlight = false) {
        const position = this.mouseInfo?.getPosition(display);

        return this.#renderPosition(position, highlight, display);
    }

    #renderPosition(
        position?: MousePosition,
        highlight = false,
        display?: DisplayInfo
    ) {
        const classes = { position: true, highlight };

        const displayMeta = display ? DisplayMeta[display] : undefined;
        const label = displayMeta?.label || display;
        const description = displayMeta?.description;

        const handleToggle = () => {
            if (!(this.expanded && display)) return;
            this.#toggleDisplayInfo(display);
        };

        return html`
            <div
                @click=${handleToggle}
                aria-label=${label || nothing}
                aria-details=${description || nothing}
                class="${classMap(classes)}"
            >
                <span class="label">${label ? `${label}:` : nothing}</span>
                ${this.#renderCoordinates(position)}
            </div>
        `;
    }

    #renderCoordinates(position?: MousePosition) {
        if (!position) {
            return nothing;
        }

        const { x, y } = position;

        return html`
            <span class="coordinate" aria-label="X">${x}</span>
            <span class="coordinate" aria-label="Y">${y}</span>
        `;
    }
    // #endregion

    // #region Lifecycle-Handlers
    #onMouseMove = (ev: MouseEvent) => {
        this.mouseInfo = new MouseInfo(ev);
    };
    // #endregion

    // #region Handlers
    #togglePin() {
        this.pinned = !this.pinned;
    }

    #toggleExpand() {
        this.expanded = !this.expanded;
    }

    #toggleTheme() {
        if (isThemeControlled(this.theme)) return;

        const themes = Object.values(Theme);
        const [nextTheme] = toggle(themes, this.theme);

        if (nextTheme) {
            this.theme = nextTheme;
            return;
        }

        this.theme = Theme.System;
    }

    #toggleDisplayInfo(display?: DisplayInfo) {
        if (this.expanded && display) {
            this.activeDisplay = display;
            return;
        }

        const displays = Object.values(DisplayInfo);
        const [nextDisplay] = toggle(displays, this.activeDisplay);

        if (nextDisplay) {
            this.activeDisplay = nextDisplay;
            return;
        }

        this.activeDisplay = DisplayInfo.Offset;
    }
    // #endregion
}

declare global {
    interface HTMLElementTagNameMap {
        [tag]: MouseTracker;
    }
}
