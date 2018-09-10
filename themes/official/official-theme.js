import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="official-theme">

  <template>
    <style>
      html vellum-monster.official, html vellum-stat-block.official {
        font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial, sans-serif;
        font-size: 9pt;
        --stat-block-background: #FDF1DC;
        --stat-block-bar-background: #E69A28;
        --stat-block-border-color: #DDD;
        --stat-block-header-color: #472016;
        --stat-block-divider-color: #922610;
        --stat-block-heading-font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
      }
    </style>
  </template>

  

</dom-module>`;

document.head.appendChild($_documentContainer.content);
class OfficialTheme extends PolymerElement {
  static get is() { return 'official-theme'; }
}
