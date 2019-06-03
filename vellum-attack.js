import { LitElement, html, css } from 'lit-element'
import { averageDie } from './lib/monster.js'

class Attack extends LitElement {

  static get styles() {
    return css`
    .attack-name {
      font-weight: bold;
      font-style: italic;
    }

    .attack-type {
      font-style: italic;
    }

    ol.random-effects {
      list-style: none;
      padding: 0;
      margin-bottom: 0;
    }

    .random-effects li {
      text-indent: 1em;
      margin-bottom: 0;
    }

    .effect-title {
      font-style: italic;
    }`
  }

  static get is() { return 'vellum-attack' }

  static get properties() {
    return {
      name: String,
      type: String,
      bonus: String,
      reach: String,
      range: String,
      target: String,
      damage: String,
      damageType: String,
      notes: String,
      limitedUsage: String,
      effects: Array
    }
  }

  static _attributeNameForProperty(name, options) {
    const camel2Dash = name => name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
    return super._attributeNameForProperty(camel2Dash(name), options)
  }

  render() {
    return html`
    <p class="attack">
      <span class="attack-name">${this.name}${this.limitedUsage ? html` (${this.limitedUsage})` : html``}.</span>
      <span class="attack-description">
        <span class="attack-type">${this.attackTypeDescription()}:</span>
        ${this.bonus} to hit,
        ${this.reachOrRange()},
        ${this.target}.
        <em>Hit:</em> ${this.averageDamage()} (${this.damage}) ${this.damageType} damage${this.notes}.
      </span>
    </p>

    ${this.renderEffects()}`
  }

  renderEffects() {
    let array = this.effects

    if (array && !Array.isArray(array)) {
      array = JSON.parse(this.effects)
    }

    return this.effects
      ? html`
      <ol class="random-effects">
        ${array.sort(this.sortRandomEffects).map(effect => this.renderEffect(effect))}</li>
      </ol>`
      : html``
  }

  renderEffect(effect) {
    return html`
    <li>
      <span class="effect-title">${effect.roll}. ${effect.name}.</span>
      ${effect.effect}
    </li>`
  }

  attackTypeDescription() {
    switch (this.type) {
      case 'melee-attack':
        return 'Melee Weapon Attack'
      case 'ranged-attack':
        return 'Ranged Weapon Attack'
      case 'melee-or-ranged-attack':
        return 'Melee or Ranged Weapon Attack'
    }
  }

  reachOrRange() {
    switch (this.type) {
      case 'melee-attack':
        return 'reach ' + this.reach
      case 'ranged-attack':
        return 'range ' + this.range
      case 'melee-or-ranged-attack':
        return 'reach ' + this.reach + ' or range ' + this.range
    }
  }

  sortRandomEffects(a, b) {
    if (a.roll < b.roll) return -1
    if (a.roll > b.roll) return 1
    return 0
  }

  averageDamage() {
    return averageDie(this.damage)
  }
}

customElements.define(Attack.is, Attack)
