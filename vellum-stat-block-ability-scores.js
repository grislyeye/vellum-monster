import { LitElement, html, css } from 'lit-element'

class AbilityScores extends LitElement {

  static get styles() {
    return css`
    :host {
      display: block;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      border-spacing: 0;
      margin: 0.2em;
    }

    table th,
    table td {
      text-align: center;
      width: 50px;
      min-width: 50px;
      padding: 0;
      vertical-align: middle;
    }`
  }

  static get is() { return 'vellum-stat-block-ability-scores' }

  static get properties() {
    return {
      str: Number,
      dex: Number,
      con: Number,
      int: Number,
      wis: Number,
      cha: Number
    }
  }

  render() {
    return html`
    <table>
      <thead>
        <tr>
          <th>STR</th>
          <th>DEX</th>
          <th>CON</th>
          <th>INT</th>
          <th>WIS</th>
          <th>CHA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${this.displayAbility(this.str)}</td>
          <td>${this.displayAbility(this.dex)}</td>
          <td>${this.displayAbility(this.con)}</td>
          <td>${this.displayAbility(this.int)}</td>
          <td>${this.displayAbility(this.wis)}</td>
          <td>${this.displayAbility(this.cha)}</td>
        </tr>
      </tbody>
    </table>`
  }

  displayAbility(ability) {
    const bonus = Math.round((ability / 2.1) - 5)

    if (bonus >= 0) return ability + ' (+' + bonus + ')'
    else return ability + ' (' + bonus + ')'
  }

}

customElements.define(AbilityScores.is, AbilityScores)
