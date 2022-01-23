import { StatBlock } from './vellum-stat-block.js'
import { html, css } from 'lit-element'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'

class NonPlayerCharacter extends StatBlock {

  static get styles() {
    return css`
      ${StatBlock.styles}

      p.description {
        font-style: italics;
        margin-bottom: 0;
      }

      #npc-header p::first-letter {
        text-transform: capitalize;
      }`
  }

  static get is() { return 'vellum-npc' }

  static get properties() {
    return {
      name: String,
      description: String,
      race: String,
      statblock: String,
      alignment: String,
      attitude: String,
      gender: String
    }
  }

  renderHeader() {
    const paranthesis =
      [this.gender, this.pronouns, this.alignment, this.attitude]
        .filter(e => e !== undefined)
        .filter(s => s !== '')

    return html`
      <div id="npc-header">
        <h1>${this.name}</h1>
        <p>
          ${this.gender}
          ${this.race}
          <strong>${this.statblock}</strong>
          (${paranthesis.join(', ')})</p>
      </div>`
  }

  renderStats() {
    const descriptionTemplate = html`
      <p id="description">${this.description}</p>
      <vellum-stat-block-divider id="description-divider"></vellum-stat-block-divider>`

    return html`
      <div id="npc-stats">

        ${this.description ? descriptionTemplate : html``}

        <slot></slot>
      </div>`
  }

}

customElements.define(NonPlayerCharacter.is, NonPlayerCharacter)
