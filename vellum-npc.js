import '../@polymer/polymer/polymer-element.js'
import { StatBlock } from './vellum-stat-block.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'
import '../@polymer/polymer/lib/elements/dom-if.js'

let memoizedTemplate

class NonPlayerCharacter extends StatBlock {

  static get template() {
    const template = html`
      <style>
        p.description {
          font-style: italics;
          margin-bottom: 0;
        }

        #npc-header p::first-letter {
          text-transform: capitalize;
        }
      </style>

      <div id="npc-stats">

        <dom-if if="{{description}}">
          <template>
            <p id="description">{{description}}</p>

            <vellum-stat-block-divider id="description-divider"></vellum-stat-block-divider>
          </template>
        </dom-if>

        <slot></slot>
      </div>`

    const headerTemplate = html`
      <div id="npc-header">
        <h1>{{name}}</h1>
        <p>
          {{gender}}
          {{race}}
          <strong>{{statblock}}</strong>
          ({{alignment}}<dom-if if="{{attitude}}"><template>, {{attitude}}</template></dom-if>)</p>
      </div>`

    if (!memoizedTemplate) {
      memoizedTemplate = StatBlock.template.cloneNode(true)
      const stats = memoizedTemplate.content.querySelector('#stats')
      const header = memoizedTemplate.content.querySelector('#header')
      stats.innerHTML = template.innerHTML
      header.innerHTML = headerTemplate.innerHTML
    }
    return memoizedTemplate

  }

  static get is() { return 'vellum-npc' }

  static get properties() {
    return {
      race: String,
      statblock: String,
      alignment: String,
      attitude: String,
      gender: String
    }
  }

}

customElements.define(NonPlayerCharacter.is, NonPlayerCharacter)
