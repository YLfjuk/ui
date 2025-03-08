import { css } from 'lit';

const bgPrimaryVar = css`var(--mouse-tracker-primary-bg, var(--__primary-bg))`;
const bgSecondaryVar = css`var(--mouse-tracker-secondary-bg, var(--__secondary-bg));`;
const textPrimaryVar = css`var(--mouse-tracker-primary-text, var(--__primary-text))`;
const borderColorVar = css`var(--mouse-tracker-border-color, var(--__border-color))`;
const shadowColorVar = css`var(--mouse-tracker-shadow-color, var(--__shadow-color))`;

const pinFillVar = css`var(--mouse-tracker-pin-fill, var(--__pin-fill))`;
const systemShadowVar = css`var(--mouse-tracker-theme-system-shadow, var(--__theme-system-shadow))`;
const lightShadowColorVar = css`var(--mouse-tracker-theme-light-shadow, var(--__theme-light-shadow))`;
const darkShadowVar = css`var(--mouse-tracker-theme-dark-shadow, var(--__theme-dark-shadow))`;

const scaleVar = css`var(--mouse-tracker-scale, 1)`;

export const styles = css`
    :host {
        --__primary-bg: #2a2a2a;
        --__secondary-bg: #2a2a2ae6;
        --__primary-text: #ffffff;
        --__border-color: #404040;
        --__shadow-color: rgba(0, 0, 0, 0.3);

        --__pin-fill: darkred;

        --__theme-system-shadow: teal;
        --__theme-light-shadow: gold;
        --__theme-dark-shadow: rgb(50 151 204);

        opacity: 0.6;
        font-size: calc(1rem * ${scaleVar});
    }

    @supports (color: oklch(0.55 0.22 33.58)) {
        :host {
            --__pin-fill: oklch(0.55 0.22 33.58);
        }
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
        --__primary-bg: #ffffff;
        --__primary-text: #333333;
        --__border-color: #e2e2e2;

        --__secondary-bg: rgba(255, 255, 255, 0.9);
        --__shadow-color: rgba(0, 0, 0, 0.1);

        --__pin-fill: orangered;
        --__theme-system-shadow: teal;
    }

    button {
        display: flex;
        justify-content: center;
        background-color: ${bgPrimaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(4px * ${scaleVar});
        padding: calc(2px * ${scaleVar}) calc(4px * ${scaleVar});
        color: ${textPrimaryVar};
        cursor: pointer;
        opacity: 0.8;
    }

    button:hover {
        opacity: 1;
    }

    .tracker {
        display: flex;
        flex-direction: column;
        gap: calc(4px * ${scaleVar});
        background-color: ${bgSecondaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(8px * ${scaleVar});
        padding: calc(6px * ${scaleVar});
        box-shadow: 0 2px 4px ${shadowColorVar};
        color: ${textPrimaryVar};
        min-width: calc(115px * ${scaleVar});
        transition: all 0.3s ease;
    }

    .controls {
        display: none;
        gap: 8px;
    }

    .pin {
        fill: none;
    }

    :host([pinned]) .pin {
        fill: ${pinFillVar};
    }

    .pin:hover {
        filter: drop-shadow(0 0 0.2em ${pinFillVar});
    }

    :host([pinned]) .pin:hover {
        filter: drop-shadow(0 0 0.2em rgb(120, 120, 120));
    }

    .expanded:hover {
        filter: drop-shadow(0 0 0.2em rgb(120, 120, 120));
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

    .theme.system:hover .system {
        filter: drop-shadow(0 0 0.1em ${systemShadowVar});
    }

    .theme.light:hover .light {
        filter: drop-shadow(0 0 0.2em ${lightShadowColorVar});
    }

    .theme.dark:hover .dark {
        filter: drop-shadow(0 0 0.1em ${darkShadowVar});
    }

    .pin,
    .expanded,
    .system,
    .light,
    .dark {
        width: calc(24px * ${scaleVar});
        height: calc(24px * ${scaleVar});
    }

    .info {
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr 0.5fr 0.5fr;
        gap: calc(8px * ${scaleVar});
    }

    .label {
        min-width: calc(70px * ${scaleVar});
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
        font-size: calc(0.75rem * ${scaleVar});
        text-transform: capitalize;
        font-weight: 600;
    }

    .info-footer .position {
        cursor: default;
    }

    @media (prefers-color-scheme: light) {
        :host([theme='system']) {
            --__primary-bg: #ffffff;
            --__primary-text: #333333;
            --__border-color: #e2e2e2;

            --__secondary-bg: rgba(255, 255, 255, 0.9);
            --__shadow-color: rgba(0, 0, 0, 0.1);

            --__pin-fill: orangered;

            :host([pinned]) .pin:hover {
                filter: drop-shadow(0 0 0.2em black);
            }

            .expanded:hover {
                filter: drop-shadow(0 0 0.2em black);
            }
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        :host {
            transition: background-color 0.2s ease, opacity 0.2s ease-in-out;
        }

        .expand,
        .theme,
        .theme .system,
        .theme .light,
        .theme .dark {
            will-change: filter;
            transition: filter 300ms, scale 0.5s ease-in;
        }
    }
`;
