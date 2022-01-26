import { LitElement, html, css } from 'lit-element'

class StatBlockDivider extends LitElement {

  static get styles() {
    return css`
    svg {
      fill: var(--stat-block-divider-color, lightgrey);
      /* Stroke is necessary for good antialiasing in Chrome. */
      stroke: var(--stat-block-divider-color, lightgrey);
      margin-top: 0.6em;
      margin-bottom: 0.35em;
    }`
  }

  render() {
    return html`
    <svg width="100%" height="100%" viewBox="0 0 400 5" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;" preserveAspectRatio="none"><path d="M0,0l400,2.5l-400,2.5"></path></svg>`
  }

  static get is() { return 'vellum-stat-block-divider' }

}

customElements.define(StatBlockDivider.is, StatBlockDivider)
