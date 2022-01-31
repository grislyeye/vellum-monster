import { StatBlock } from './vellum-stat-block.js'
import { html, css } from 'lit-element'
import { capitalise } from './lib/capitalise'
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
      }

      a {
        color: var(--stat-block-header-color, black);
        text-decoration: none;
      }
    `
  }

  static get is() { return 'vellum-npc' }

  static get properties() {
    return {
      name: String,
      description: String,
      race: String,
      statblock: String,
      statblockref: String,
      dndbeyond: Boolean,
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

    const ref = this.dndbeyond ? `https://www.dndbeyond.com/monsters/${this.statblock}` : this.statblockref

    return html`
      <div id="npc-header">
        <h1>${this.name}</h1>
        <p>
          ${capitalise(this.gender)}
          ${!this.gender ? capitalise(this.race) : this.race}
          <strong id="statblock">${this.renderStatblock(!this.gender && !this.race ? capitalise(this.statblock) : this.statblock, ref)}</strong>
          (${paranthesis.join(', ')})</p>
      </div>`
  }

  renderStatblock(statblock, link) {
    return link ? html`<a href="${link}" alt="${statblock}">${statblock}</a>` : ''
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
