import { css } from 'lit';

const bgColorPrimaryVar = css`var(--mouse-tracker-primary-bg, var(--intrnl-primary-bg))`;
const bgColorSecondaryVar = css`var(--mouse-tracker-secondary-bg, var(--intrnl-secondary-bg));`;
const textColorPrimaryVar = css`var(--mouse-tracker-primary-text, var(--intrnl-primary-text))`;
const borderColorVar = css`var(--mouse-tracker-border-color, var(--intrnl-border-color))`;
const shadowColorVar = css`var(--mouse-tracker-shadow-color, var(--intrnl-shadow-color))`;

const pinFillColorVar = css`var(--mouse-tracker-pin-fill, var(--intrnl-pin-fill))`;
const systemShadowColorVar = css`var(--mouse-tracker-theme-system-shadow, var(--intrnl-theme-system-shadow))`;
const lightShadowColorVar = css`var(--mouse-tracker-theme-light-shadow, var(--intrnl-theme-light-shadow))`;
const darkShadowColorVar = css`var(--mouse-tracker-theme-dark-shadow, var(--intrnl-theme-dark-shadow))`;

const scaleVar = css`var(--mouse-tracker-scale, 1)`;

export const styles = css`
    :host {
        --intrnl-primary-bg: #2a2a2a;
        --intrnl-secondary-bg: #2a2a2ae6;
        --intrnl-primary-text: #ffffff;
        --intrnl-border-color: #404040;
        --intrnl-shadow-color: rgba(0, 0, 0, 0.3);

        --intrnl-pin-fill: darkred;

        --intrnl-theme-system-shadow: teal;
        --intrnl-theme-light-shadow: gold;
        --intrnl-theme-dark-shadow: rgb(50 151 204);

        opacity: 0.6;
        position: absolute;

        /* TODO: change into a property */
        right: 0;
        bottom: 0;
        margin: 10px;

        font-size: calc(1rem * ${scaleVar});
    }

    @supports (color: oklch(0.55 0.22 33.58)) {
        :host {
            --intrnl-pin-fill: oklch(0.55 0.22 33.58);
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
        --intrnl-primary-bg: #ffffff;
        --intrnl-primary-text: #333333;
        --intrnl-border-color: #e2e2e2;

        --intrnl-secondary-bg: rgba(255, 255, 255, 0.9);
        --intrnl-shadow-color: rgba(0, 0, 0, 0.1);

        --intrnl-pin-fill: orangered;
        --intrnl-theme-system-shadow: teal;
    }

    button {
        display: flex;
        justify-content: center;
        background-color: ${bgColorPrimaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(4px * ${scaleVar});
        padding: calc(2px * ${scaleVar}) calc(4px * ${scaleVar});
        color: ${textColorPrimaryVar};
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
        background-color: ${bgColorSecondaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(8px * ${scaleVar});
        padding: calc(6px * ${scaleVar});
        box-shadow: 0 2px 4px ${shadowColorVar};
        color: ${textColorPrimaryVar};
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
        fill: ${pinFillColorVar};
    }

    .pin:hover {
        filter: drop-shadow(0 0 0.2em ${pinFillColorVar});
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
        filter: drop-shadow(0 0 0.1em ${systemShadowColorVar});
    }

    .theme.light:hover .light {
        filter: drop-shadow(0 0 0.2em ${lightShadowColorVar});
    }

    .theme.dark:hover .dark {
        filter: drop-shadow(0 0 0.1em ${darkShadowColorVar});
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
