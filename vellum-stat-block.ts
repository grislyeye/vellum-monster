import { LitElement, TemplateResult, html, css, customElement, property } from 'lit-element'
import './vellum-stat-block-divider.js'

@customElement('vellum-stat-block')
export class StatBlock extends LitElement {

  static styles = css`
    :host {
      display: block;
      overflow: hidden;
      font-family: sans-serif;
      width: var(--stat-block-width, 350px);
      font-size: 10pt;
      margin-bottom: 1em;

      -webkit-column-break-inside: avoid;
                page-break-inside: avoid;
                     break-inside: avoid;
    }

    .bar {
      height: 5px;
      border: var(--stat-block-bar-border, 1px solid #000);
      position: relative;
      z-index: 1;
      background: var(--stat-block-bar-background, white);
    }

    .stat-block {
      margin-left: 0.2em;
      margin-right: 0.2em;
    }

    .content-wrapper {
      background: var(--stat-block-background, white);
      border-left: 1px var(--stat-block-border-color, black) solid;
      border-right: 1px var(--stat-block-border-color, black) solid;
      padding: 0.5em;
      box-shadow: 0.1em 0 0.1em rgba(0, 0, 0, 0.3), -0.1em 0 0.1em rgba(0, 0, 0, 0.3);
    }

    :host(.two-column) {
      width: var(--stat-block-two-column-width, 840px)
    }

    :host(.two-column) .content-wrapper {

       -webkit-columns: var(--stat-block-two-column-column-width, 388px) 2;
          -moz-columns: var(--stat-block-two-column-column-width, 388px) 2;
               columns: var(--stat-block-two-column-column-width, 388px) 2;

       -webkit-column-gap: 40px;
          -moz-column-gap: 40px;
               column-gap: 40px;

    }

    header h1:first-child {
      font-family: var(--stat-block-heading-font-family, serif);
      font-weight: bold;
      margin: 0px;
      font-size: 2em;
      font-variant: small-caps;
      color: var(--stat-block-header-color, black);
    }

    :host p {
      margin-top: 1pt;
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 1pt;
    }

    header *:nth-child(2) {
      font-weight: normal;
      font-style: italic;
      font-size: 1em;
      margin: 0;
    }

    ol, ul {
      margin-top: 1em;
      padding-left: 0;
      margin-bottom: 0;
      line-spacing: 0;
    }

    ul {
      list-style-type: none;
    }

    :host p.description {
      font-style: italics;
      margin-bottom: 0;
    }`

  @property({ type: String }) name!: string;

  @property({ type: String }) description!: string;

  render(): TemplateResult | void {
    return html`
    <div class="bar"></div>

    <div class="stat-block">
      <div class="content-wrapper">

      <header id="header">
        ${this.renderHeader()}
      </header>

        <vellum-stat-block-divider></vellum-stat-block-divider>

        <div id="stats">${this.renderStats()}</div>

      </div>
    </div>

    <div class="bar"></div>`
  }

  renderHeader(): TemplateResult {
    return html`
      <h1>${this.name}</h1>
      <p>${this.description}</p>`
  }

  renderStats(): TemplateResult {
    return html`<slot></slot>`
  }

}
