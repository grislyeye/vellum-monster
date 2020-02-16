import { LitElement, html, css } from 'lit-element'

class SpellLevel extends LitElement {

  static get styles() {
    return css`
    .spells {
      font-style: italic;
    }`
  }

  static get is() { return 'vellum-spell-level' }

  static get properties() {
    return {
      level: String,
      spells: Array,
      slots: Number
    }
  }

  render() {
    return html`
    <span class="spell-level">
      <span class="level">
        ${this.displayTitle() ? this.displayTitle() : html`${this.level} level`}
        ${this.slots > 0 ? this.renderSlots() : ''}
      </span>

      <span class="spells">${this.renderSpells()}</span>
    </span>`
  }

  displayTitle() {
    switch (this.level.toLowerCase()) {
      case 'cantrips':
        return 'Cantrips (at will):'
      case 'at-will':
        return 'At will:'
      case '1/day':
        return '1/day each:'
      default:
        return false
    }
  }

  renderSlots() {
    return html`
    (${this.slots} ${this.slots > 1 ? html`slots):` : html`slot):`}`
  }

  renderSpells() {
    if (Array.isArray(this.spells)) {
      return this.spells.join(', ')
    } else {
      try {
        return JSON.parse(this.spells).join(', ')
      } catch (error) {
        return this.spells
      }
    }
  }
}

customElements.define(SpellLevel.is, SpellLevel)
