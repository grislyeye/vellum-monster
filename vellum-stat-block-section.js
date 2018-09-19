import { PolymerElement } from '../@polymer/polymer/polymer-element.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'

class StatBlockSection extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }

      h2 {
        font-family: var(--stat-block-heading-font-family, serif);
        border-bottom: 1px solid;
        font-variant: small-caps;
        color: var(--stat-block-header-color, black);
        break-inside: avoid-column;
        break-after: avoid-column;
        font-size: 1.5em;
        margin-top: 0.6em;
        margin-bottom: 0.4em;
      }
    </style>

    <section>
      <h2>{{name}}</h2>

      <slot></slot>
    </section>`
  }

  static get is() { return 'vellum-stat-block-section' }

  static get properties() {
    return {
      name: String
    }
  }
}

customElements.define(StatBlockSection.is, StatBlockSection)
