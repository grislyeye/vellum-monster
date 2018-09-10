import { PolymerElement } from '../@polymer/polymer/polymer-element.js';
import '../@polymer/polymer/lib/elements/dom-if.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';

class AbilityScores extends PolymerElement {
  static get template() {
    return html`
    <style>
      table  {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        border-spacing: 0;
        margin: 0.2em;
      }

      table th, table td {
        text-align: center;
        width: 50px;
        min-width: 50px;
        padding: 0;
        vertical-align: middle;
      }
    </style>

    <table>
      <tbody><tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
      </tr>
      <tr>
        <td>{{displayStrength}}</td>
        <td>{{displayDexterity}}</td>
        <td>{{displayConstitution}}</td>
        <td>{{displayIntelligence}}</td>
        <td>{{displayWisdom}}</td>
        <td>{{displayCharisma}}</td>
      </tr>
    </tbody></table>`;
  }

  static get is() { return 'vellum-stat-block-ability-scores'; }

  static get properties() {
    return {
      str: Number,
      dex: Number,
      con: Number,
      int: Number,
      wis: Number,
      cha: Number,
      displayStrength: {
        type: String,
        computed: '_displayAbility(str)'
      },
      displayDexterity: {
        type: String,
        computed: '_displayAbility(dex)'
      },
      displayConstitution: {
        type: String,
        computed: '_displayAbility(con)'
      },
      displayIntelligence: {
        type: String,
        computed: '_displayAbility(int)'
      },
      displayWisdom: {
        type: String,
        computed: '_displayAbility(wis)'
      },
      displayCharisma: {
        type: String,
        computed: '_displayAbility(cha)'
      }
    }
  }

  _displayAbility(ability) {
    const bonus = Math.round((ability / 2.1) - 5);

    if(bonus >= 0) return ability + ' (+' + bonus + ')';
    else return ability + ' (' + bonus + ')';
  }
}

customElements.define(AbilityScores.is, AbilityScores);
