import { PolymerElement } from '../@polymer/polymer/polymer-element.js';
import '../@polymer/polymer/lib/elements/dom-if.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';

class SpellLevel extends PolymerElement {
  static get template() {
    return html`
    <style>
      .spells {
        font-style: italic;
      }
    </style>

    <span class="spell-level">
      <span class="level">
        <dom-if if="{{cantrips}}">
          <template>
            Cantrips
          </template>
        </dom-if>

        <dom-if if="{{!cantrips}}">
          <template>
            {{level}} level
          </template>
        </dom-if>

        <dom-if if="{{hasSlots}}">
          <template>
            ({{slots}}

            <dom-if if="{{hasMultipleSlots}}">
              <template>
                slots):
              </template>
            </dom-if>

            <dom-if if="{{!hasMultipleSlots}}">
              <template>
                slot):
              </template>
            </dom-if>

          </template>
        </dom-if>

        <dom-if if="{{!hasSlots}}">
          <template>
            (at will):
          </template>
        </dom-if>
      </span>

      <span class="spells">{{spellsDisplay}}</span>
    </span>`;
  }

  static get is() { return 'vellum-spell-level'; }

  static get properties() {
    return {
      level: String,
      cantrips: {
        type: Boolean,
        computed: '_cantrips(level)'
      },
      slots: {
        type: Number,
        value: 0
      },
      hasSlots: {
        type: Boolean,
        computed: '_hasSlots(slots)'
      },
      hasMultipleSlots: {
        type: Boolean,
        computed: '_hasMultipleSlots(slots)'
      },
      spells: Object,
      spellsDisplay: {
        type: String,
        computed: '_spellsDisplay(spells)'
      }
    };
  }

  _cantrips(level) {
    return level.toLowerCase() == 'cantrips';
  }

  _hasSlots(slots) {
    return slots > 0;
  }

  _hasMultipleSlots(slots) {
    return slots > 1;
  }

  _spellsDisplay(spells) {
    if(Array.isArray(spells)) {
      return spells.join(', ');
    } else {
      return spells;
    }
  }
}

customElements.define(SpellLevel.is, SpellLevel);
