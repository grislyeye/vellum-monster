import { PolymerElement } from '../@polymer/polymer/polymer-element.js'
import '../@polymer/polymer/lib/elements/dom-if.js'
import '../@polymer/polymer/lib/elements/dom-repeat.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'

class Attack extends PolymerElement {
  static get template() {
    return html`
    <style>
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
      }
    </style>

    <p class="attack">
      <span class="attack-name">{{name}}<dom-if if="{{limitedUsage}}"><template> ({{limitedUsage}})</template></dom-if>.</span>
      <span class="attack-description">
        <span class="attack-type">{{attackType}}:</span>
        {{bonus}} to hit,
        {{reachOrRange}},
        {{target}}.
        <em>Hit:</em> {{damage}} {{damageType}} damage{{notes}}.
      </span>
    </p>

    <dom-if if="{{effects}}">
      <template>
        <ol class="random-effects">
          <dom-repeat items="{{effects}}" sort="sortRandomEffects">
            <template>
              <li><span class="effect-title">{{item.roll}}. {{item.name}}.</span> {{item.effect}}</li>
            </template>
          </dom-repeat>
        <ol>
      </ol></ol></template>
    </dom-if>`
  }

  static get is() { return 'vellum-attack' }

  static get properties() {
    return {
      name: String,
      type: String,
      attackType: {
        type: String,
        computed: '_attackType(type)'
      },
      bonus: String,
      reach: String,
      range: String,
      target: String,
      damage: String,
      damageType: String,
      notes: String,
      limitedUsage: String,
      effects: Array,
      reachOrRange: {
        type: String,
        computed: '_reachOrRange(type, reach, range)'
      }
    }
  }

  _attackType(attackType) {
    switch (attackType) {
      case 'melee-attack':
        return 'Melee Weapon Attack'
      case 'ranged-attack':
        return 'Ranged Weapon Attack'
      case 'melee-or-ranged-attack':
        return 'Melee or Ranged Weapon Attack'
    }
  }

  _reachOrRange(attackType, reach, range) {
    switch (attackType) {
      case 'melee-attack':
        return 'reach ' + reach
      case 'ranged-attack':
        return 'range ' + range
      case 'melee-or-ranged-attack':
        return 'reach ' + reach + ' or range ' + range
    }
  }

  sortRandomEffects(a, b) {
    if (a.roll < b.roll) return -1
    if (a.roll > b.roll) return 1
    return 0
  }
}

customElements.define(Attack.is, Attack)
