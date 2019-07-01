import { PolymerElement } from '../@polymer/polymer/polymer-element.js'
import '../@polymer/polymer/lib/elements/dom-if.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'

class Stat extends PolymerElement {

  static get template() {
    return html`
    <style>
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
      }
    </style>

    <dom-if if="{{hasDescription}}">
      <template>

        <dom-if if="{{hasValues}}">
          <template>
            <p>
              <span class="stat-name">{{name}}</span>
              <span class="stat-description">{{displayText}}</span>
            </p>
          </template>
        </dom-if>

        <dom-if if="{{!hasValues}}">
          <template>
            <p>
              <span class="stat-name">{{name}}</span>
              <span id="description" class="stat-description"><slot></slot></span>
            </p>
          </template>
        </dom-if>

      </template>
    </dom-if>`
  }

  static get is() { return 'vellum-stat' }

  static get properties() {
    return {
      name: String,
      values: {
        type: Object,
        value: '_not-set'
      },
      hasDescription: {
        type: Boolean,
        computed: '_hasDescription(values)'
      },
      hasValues: {
        type: String,
        computed: '_hasValues(values)'
      },
      displayText: {
        type: String,
        computed: '_displayText(values)'
      }
    }
  }

  _hasDescription(values) {
    const innerHTML = this.innerHTML.trim()
    return (values !== '_not-set' || innerHTML !== '')
  }

  _hasValues(values) {
    return Array.isArray(values) || values !== '_not-set'
  }

  _displayText(values) {
    if (Array.isArray(values)) {
      return values.join(', ')
    } else if (values !== '_not-set') {
      return values
    } else {
      return undefined
    }
  }
}

customElements.define(Stat.is, Stat)
