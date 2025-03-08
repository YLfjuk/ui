import { css } from 'lit';

const bgPrimaryVar = css`var(--mouse-tracker-primary-bg, var(--__primary-bg))`;
const bgSecondaryVar = css`var(--mouse-tracker-secondary-bg, var(--__secondary-bg));`;
const textPrimaryVar = css`var(--mouse-tracker-primary-text, var(--__primary-text))`;
const badgeColorVar = css`var(--mouse-tracker-badge-color, var(--__badge-color))`;
const borderColorVar = css`var(--mouse-tracker-border-color, var(--__border-color))`;
const shadowColorVar = css`var(--mouse-tracker-shadow-color, var(--__shadow-color))`;

const scaleVar = css`var(--mouse-tracker-scale, 0.75)`;

export const styles = css`
    :host {
        --__primary-bg: #2a2a2a;
        --__secondary-bg: #000000;
        --__primary-text: #ffffff;
        --__badge-color: #3b3939;
        --__border-color: #404040;
        --__shadow-color: rgba(0, 0, 0, 0.3);

        font-size: calc(1rem * ${scaleVar});
    }

    :host([theme='light']) {
        --__primary-bg: #ffffff;
        --__primary-text: #333333;
        --__border-color: #e2e2e2;

        --__secondary-bg: rgba(255, 255, 255, 0.9);
        --__shadow-color: rgba(0, 0, 0, 0.1);
    }

    .scroll-progress {
        display: flex;
        flex-direction: column;
        gap: calc(20px * ${scaleVar});
        background-color: ${bgSecondaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(8px * ${scaleVar});
        padding: calc(6px * ${scaleVar});
        box-shadow: 0 2px 4px ${shadowColorVar};
        color: ${textPrimaryVar};
        transition: all 0.3s ease;
    }

    .content {
        display: flex;
        align-items: center;
        gap: calc(15px * ${scaleVar});
    }

    .main {
        display: flex;
        align-items: center;
        text-align: center;
        gap: calc(4px * ${scaleVar});
    }

    .percent {
        text-align: center;
        padding-inline: calc(4px * ${scaleVar});
        background-color: ${badgeColorVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(6px * ${scaleVar});
        color: ${textPrimaryVar};
    }

    button {
        display: flex;
        justify-content: center;
        background-color: ${bgPrimaryVar};
        border: 1px solid ${borderColorVar};
        border-radius: calc(6px * ${scaleVar});
        padding: calc(2px * ${scaleVar}) calc(4px * ${scaleVar});
        color: ${textPrimaryVar};
        cursor: pointer;
        opacity: 0.8;
    }

    button:hover {
        opacity: 1;
    }
`;
