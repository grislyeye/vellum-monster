import { LitElement, html, css } from 'lit-element'

class Stat extends LitElement {

  static get styles() {
    return css`
    .stat-name {
      font-weight: bold;
    }

    p {
      margin-top: 1pt;
      margin-bottom: 0;
      margin-left: 0;
      margin-right: 0;
      padding-left: 1em;
      text-indent: -1em;
    }

    :host(.trait) p,
    :host(.action) p {
      margin-top: 0;
      margin-bottom: 1em;
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      text-indent: 0;
    }

    :host(.table-row) p {
      padding-left: 0;
      text-indent: 1em;
    }

    :host(.trait) .stat-name,
    :host(.action) .stat-name {
      font-style: italic;
    }`
  }

  static get properties() {
    return {
      name: String,
      values: {
        type: String,
        hasChanged(newVal, oldVal) {
          return newVal !== oldVal
        }
      }
    }
  }

  render() {
    if (this.hasDescription()) {
      return html`<p>
        <span class="stat-name">${this.name}</span>
        <span class="stat-description">${this.description()}</span>
      </p>`
    }
  }

  hasDescription() {
    const innerDescription = this.innerHTML.trim()
    return (this.values || innerDescription !== '')
  }

  description() {
    if (Array.isArray(this.values)) {
      return this.values.join(', ')
    }

    // TODO replace this try...catch block that could hide important error messages
    try {
      return JSON.parse(this.values).join(', ')
    } catch (error) {
      if (this.values) return this.values
      else return html`<slot></slot>`
    }
  }

}

customElements.define('vellum-stat', Stat)
