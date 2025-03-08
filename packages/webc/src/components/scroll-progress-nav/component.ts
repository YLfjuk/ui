import { LitElement, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { NavTags } from './models';
import type { NavTag } from './models';
import { styles } from './styles';

const tag = 'scroll-progress-nav';

type Heading = {
    id: string;
    level: string;
    text: string | null;
};

@customElement(tag)
export class ScrollProgressNav extends LitElement {
    // #region Styles
    static override styles = styles;
    // #endregion

    // #region Properties
    @property()
    level?: NavTag;
    // #endregion

    // #region State
    @state()
    private headings: Heading[] = [];

    @state()
    private expanded = false;

    @state()
    private progress = 0;
    // #endregion

    // #region Lifecycle
    override connectedCallback() {
        super.connectedCallback();
        window.addEventListener('scroll', this.#onScroll);
        window.addEventListener('mousedown', this.#onClick);
        this.#getHeadings();
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('scroll', this.#onScroll);
        window.removeEventListener('mousedown', this.#onClick);
    }

    override attributeChangedCallback(
        name: string,
        oldVal: string | null,
        newVal: string | null
    ) {
        if (name !== 'level') {
            super.attributeChangedCallback(name, oldVal, newVal);
            return;
        }

        if (newVal && NavTags.some((tag) => tag === newVal)) {
            super.attributeChangedCallback(name, oldVal, newVal);
            this.#getHeadings();
        } else {
            super.attributeChangedCallback(name, oldVal, null);
        }
    }
    // #endregion

    // #region Render
    override render() {
        return html`<div class="scroll-progress">
            ${when(this.expanded, this.#renderHeadings, () => nothing)}
            <div class="content">
                <div class="main">
                    ${this.#renderProgressBar()} ${this.#renderCurrentHeading()}
                    <button @click=${this.#toggleExpanded}>
                        ${this.#renderExpandSvg()}
                    </button>
                </div>
                <div class="percent">${this.progress}%</div>
            </div>
        </div>`;
    }

    #renderProgressBar() {
        return svg`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>
        `;
    }

    #renderCurrentHeading() {
        return html`placeholder`;
    }

    #renderExpandSvg() {
        return svg`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down">
                ${when(
                    this.expanded,
                    () =>
                        svg`<path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/>`,
                    () =>
                        svg`<path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5"/>`
                )}
            </svg>
        `;
    }

    #renderHeadings() {
        return html`placeholder`;
    }
    // #endregion

    // #region Lifecycle-Handlers
    #getHeadings() {
        const minimalHeadingIndex = this.level
            ? NavTags.findIndex((tag) => tag === this.level)
            : NavTags.length;

        const filteredTags = NavTags.filter(
            (_, idx) => idx <= minimalHeadingIndex
        );

        console.log(filteredTags);

        const headingElements = document.querySelectorAll(
            filteredTags.join(' ')
        );

        this.headings = Array.from(headingElements).map((heading, index) => ({
            id: heading.id || `heading-${index}`,
            level: heading.tagName,
            text: heading.textContent,
        }));
    }

    #onScroll = () => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const scrollHeight = doc.scrollHeight;
        const clientHeight = doc.clientHeight;
        const totalScrollable = scrollHeight - clientHeight;

        const progress = Math.min(
            Math.round((scrollTop / totalScrollable) * 100),
            100
        );

        this.progress = progress;
    };

    #onClick = (ev: MouseEvent) => {
        if (ev.target !== this) {
            this.expanded = false;
        }
    };
    // #endregion

    // #region Handlers
    #toggleExpanded() {
        this.expanded = !this.expanded;
    }
    // #endregion
}

declare global {
    interface HTMLElementTagNameMap {
        [tag]: ScrollProgressNav;
    }
}
