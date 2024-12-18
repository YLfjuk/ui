import { Theme } from '@ylfjuk-ui/core';
import { LitElement, css, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { CursorInfo } from '../models/cursor-info';
import { DisplayInfo } from '../models/display-info';
import type { CursorPosition } from '../types/cursor';
import { DisplayMeta, InfoFooter } from '../utils/display.ts';

const tag = 'cursor-tracker';

@customElement(tag)
export class CursorTracker extends LitElement {
    // #region Styles
    static override styles = css`
        @supports (color: oklch(0.55 0.22 33.58)) {
            :host {
                --intrnl-pin-fill: oklch(0.55 0.22 33.58);
            }
        }

        :host {
            --intrnl-primary-bg: #2a2a2a;
            --intrnl-primary-text: #ffffff;
            --intrnl-border-color: #404040;
            --intrnl-secondary-bg: rgba(42, 42, 42, 0.9);
            --intrnl-shadow-color: rgba(0, 0, 0, 0.3);

            --intrnl-pin-fill: darkred;

            opacity: 0.6;
            position: absolute;

            /* TODO: change into a property */
            right: 0;
            bottom: 0;
            margin: 10px;
        }

        :host([pinned]),
        :host(:hover) {
            opacity: 1;
        }

        :host([pinned]),
        :host([expanded]),
        :host(:hover) {
            .controls {
                display: flex;
                /* TODO: fix display transition */
            }

            .info-footer {
                display: contents;
            }
        }

        :host([expanded]) {
            .info {
                cursor: default;
            }
        }

        :host([theme='light']) {
            --intrnl-primary-bg: #ffffff;
            --intrnl-primary-text: #333333;
            --intrnl-border-color: #e2e2e2;

            --intrnl-secondary-bg: rgba(255, 255, 255, 0.9);
            --intrnl-shadow-color: rgba(0, 0, 0, 0.1);

            --intrnl-pin-fill: orangered;
        }

        .tracker {
            display: flex;
            flex-direction: column;
            gap: 4px;
            background-color: var(--secondary-bg, var(--intrnl-secondary-bg));
            border: 1px solid var(--border-color, var(--intrnl-border-color));
            border-radius: 8px;
            padding: 6px;
            box-shadow: 0 2px 4px
                var(--shadow-color, var(--intrnl-shadow-color));
            color: var(
                --cursor-tracker-primary-text,
                var(--intrnl-primary-text)
            );
            min-width: 115px;
            transition: all 0.3s ease;
        }

        .controls {
            display: none;
            gap: 8px;
        }

        button {
            display: flex;
            justify-content: center;
            background: var(
                --cursor-tracker-primary-bg,
                var(--intrnl-primary-bg)
            );
            border: 1px solid
                var(--cursor-tracker-border-color, var(--intrnl-border-color));
            border-radius: 4px;
            padding: 2px 4px;
            color: var(
                --cursor-tracker-primary-text,
                var(--intrnl-primary-text)
            );
            cursor: pointer;
            opacity: 0.8;
        }

        button:hover {
            opacity: 1;
        }

        .theme .system,
        .theme .light,
        .theme .dark {
            opacity: 0;
        }

        .theme.system .system,
        .theme.light .light,
        .theme.dark .dark {
            opacity: 1;
        }

        .pin:hover {
            filter: drop-shadow(
                0 0 0.2em var(--cursor-tracker-pin-fill, var(--intrnl-pin-fill))
            );
        }

        :host([pinned]) .pin:hover {
            filter: drop-shadow(0 0 0.2em rgb(120, 120, 120));
        }

        .expanded:hover {
            filter: drop-shadow(0 0 0.2em rgb(120, 120, 120));
        }

        .theme.system:hover .system {
            filter: drop-shadow(0 0 0.1em rgb(120, 120, 120));
        }

        .theme.light:hover .light {
            filter: drop-shadow(0 0 0.2em gold);
        }

        .theme.dark:hover .dark {
            filter: drop-shadow(0 0 0.1em rgb(50 151 204));
        }

        .info {
            cursor: pointer;
            display: grid;
            grid-template-columns: 1fr 0.5fr 0.5fr;
            gap: 8px;
        }

        .label {
            min-width: 70px;
            text-transform: capitalize;
        }

        .position {
            cursor: pointer;
            display: contents;
        }

        .position.highlight {
            font-weight: 600;
        }

        .info-footer {
            display: none;
            font-size: 0.75rem;
            text-transform: capitalize;
            font-weight: 600;
        }

        .info-footer .position {
            cursor: default;
        }

        @media (prefers-color-scheme: light) {
            :host([theme='system']) {
                --intrnl-primary-bg: #ffffff;
                --intrnl-primary-text: #333333;
                --intrnl-border-color: #e2e2e2;

                --intrnl-secondary-bg: rgba(255, 255, 255, 0.9);
                --intrnl-shadow-color: rgba(0, 0, 0, 0.1);

                --intrnl-pin-fill: orangered;

                :host([pinned]) .pin:hover {
                    filter: drop-shadow(0 0 0.2em black);
                }

                .expanded:hover {
                    filter: drop-shadow(0 0 0.2em black);
                }

                .theme.system:hover .system {
                    filter: drop-shadow(0 0 0.1em black);
                }
            }
        }

        @media (prefers-reduced-motion: no-preference) {
            :host {
                transition: background-color 0.2s ease, opacity 0.2s ease-in-out;
            }

            .pin,
            .expand,
            .theme {
                will-change: filter;
                transition: filter 300ms;
            }

            .theme .system,
            .theme .light,
            .theme .dark {
                transition: filter 300ms, scale 0.5s ease-in;
            }
        }
    `;
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
    theme: Theme = Theme.System;
    // #endregion

    // #region State
    @state()
    private cursorInfo: CursorInfo | null = null;

    @state()
    private currentDisplay: DisplayInfo = DisplayInfo.Offset;
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

        if (newVal && Object.values<string>(Theme).includes(newVal)) {
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
        if (this.hideUntilData && !this.cursorInfo) return nothing;

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
            <button @click=${this.#toggleTheme}>
                ${this.#renderThemeSvg()}
            </button>
        </div>`;
    }

    #renderPinSvg() {
        return svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="${
                this.pinned
                    ? 'var(--cursor-tracker-pin-fill, var(--intrnl-pin-fill))'
                    : 'none'
            }"
            stroke="var(--cursor-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
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
            stroke="var(--cursor-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
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
            stroke="var(--cursor-tracker-stroke, currentColor)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
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
                this.#renderInfoType(display, display === this.currentDisplay)
            )}`;
        }

        return this.#renderInfoType(this.currentDisplay);
    }

    #renderInfoType(display: DisplayInfo, highlight = false) {
        const position = this.cursorInfo?.getPosition(display);

        return this.#renderPosition(position, highlight, display);
    }

    #renderPosition(
        position?: CursorPosition,
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

    #renderCoordinates(position?: CursorPosition) {
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
        this.cursorInfo = new CursorInfo(ev);
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
        const themes = Object.values(Theme);
        const currThemeIdx = themes.findIndex((theme) => theme === this.theme);
        const nextThemeIdx = (currThemeIdx + 1) % themes.length;
        const nextTheme = themes[nextThemeIdx];

        if (nextTheme) {
            this.theme = nextTheme;
            return;
        }

        this.theme = Theme.System;
    }

    #toggleDisplayInfo(display?: DisplayInfo) {
        if (this.expanded && display) {
            this.currentDisplay = display;
            return;
        }

        const displays = Object.values(DisplayInfo);
        const currentDisplayIdx = displays.indexOf(this.currentDisplay);
        const nextThemeIdx = (currentDisplayIdx + 1) % displays.length;
        const nextDisplay = displays[nextThemeIdx];

        if (nextDisplay) {
            this.currentDisplay = nextDisplay;
            return;
        }

        this.currentDisplay = DisplayInfo.Offset;
    }
    // #endregion
}

declare global {
    interface HTMLElementTagNameMap {
        [tag]: CursorTracker;
    }
}
