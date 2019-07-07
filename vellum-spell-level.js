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
        ${this.hasCantrips(this.level) ? html`Cantrips` : html`${this.level} level`}
        ${this.slots > 0 ? this.renderSlots() : html`(at will):`}
      </span>

      <span class="spells">${this.renderSpells()}</span>
    </span>`
  }

  hasCantrips(level) {
    return level.toLowerCase() === 'cantrips'
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
