import { StatBlock } from './vellum-stat-block.js'
import { html, css, customElement, property } from 'lit-element'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'

@customElement('vellum-npc')
export class NonPlayerCharacter extends StatBlock {

  @property({ type: String }) name = '';

  @property({ type: String }) description = '';

  @property({ type: String }) race = '';

  @property({ type: String }) statblock = '';

  @property({ type: String }) alignment = '';

  @property({ type: String }) attitude = '';

  @property({ type: String }) gender = '';

  @property({ type: String }) pronouns = '';

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

  protected renderHeader() {
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

  protected renderStats() {
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
