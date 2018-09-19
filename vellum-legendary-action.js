import { PolymerElement } from '../@polymer/polymer/polymer-element.js'
import '../@polymer/polymer/lib/elements/dom-if.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'

class LegendaryAction extends PolymerElement {
  static get template() {
    return html`
    <style>
      .action-name {
        font-weight: bold;
      }
    </style>

    <dom-if if="{{action}}">
      <template>
        <span class="action-name">{{action.name}}<dom-if if="{{costsMulipleActions()}}"><template> (Costs {{action.actions}} Actions)</template></dom-if>.</span>
        {{action.description}}
      </template>
    </dom-if>`
  }

  static get is() { return 'vellum-legendary-action' }

  static get properties() {
    return {
      // TODO replace object with attributess
      action: {
        type: Object
      }
    }
  }

  costsMulipleActions() {
    return (this.action.actions > 1)
  }
}

customElements.define(LegendaryAction.is, LegendaryAction)
