import { LitElement, html, css } from 'lit-element'

class LegendaryAction extends LitElement {

  static get is() { return 'vellum-legendary-action' }

  static get styles() {
    return css`
    .action-name {
      font-weight: bold;
    }`
  }

  static get properties() {
    return {
      name: String,
      actions: Number,
      description: String
    }
  }

  render() {
    return html`
    <span class="action-name">${this.name}${this.costsMulipleActions() ? html` (Costs ${this.actions} Actions)` : html``}.</span>
    ${this.description}`
  }

  costsMulipleActions() {
    return (this.actions > 1)
  }

}

customElements.define(LegendaryAction.is, LegendaryAction)
