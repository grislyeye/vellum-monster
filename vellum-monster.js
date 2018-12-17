import '../@polymer/polymer/polymer-element.js'
import { StatBlock } from './vellum-stat-block.js'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'
import '../@polymer/polymer/lib/elements/dom-repeat.js'
import '../@polymer/polymer/lib/elements/dom-if.js'
import { MicrodataMixin } from '../polymer-microdata/polymer-microdata.js'
import { html } from '../@polymer/polymer/lib/utils/html-tag.js'
import '../@polymer/polymer/lib/elements/dom-module.js'
import { calculateXpFromCr, averageDie } from './lib/monster.js'

let memoizedTemplate

class Monster extends MicrodataMixin(StatBlock) {

  static get template() {

    const template = html`
    <style>
      #legendary-actions ul li {
        margin: 0;
        padding-left: 1em;
        text-indent: -1em;
      }
    </style>

    <div id="monster-stats" class="main-stats">

      <div class="combat-stats">
        <vellum-stat id="ac" name="Armor Class" values\$="{{ac}}"></vellum-stat>

        <dom-if if="{{hitDie}}">
          <template>
            <vellum-stat id="hit-points-and-die" name="Hit Points" values\$="{{displayHp}} ({{hitDie}})"></vellum-stat>
          </template>
        </dom-if>

        <dom-if if="{{!hitDie}}">
          <template>
            <vellum-stat id="hit-points" name="Hit Points" values\$="{{hp}}"></vellum-stat>
          </template>
        </dom-if>

        <vellum-stat id="speed" name="Speed" values\$="{{speeds}}"></vellum-stat>
      </div>

      <dom-if if="{{hasAbilities}}">
        <template>
          <vellum-stat-block-divider></vellum-stat-block-divider>

          <vellum-stat-block-ability-scores id="ability-scores" str="{{str}}" dex="{{dex}}" con="{{con}}" int="{{int}}" wis="{{wis}}" cha="{{cha}}"></vellum-stat-block-ability-scores>

          <vellum-stat-block-divider></vellum-stat-block-divider>
        </template>
      </dom-if>

      <div>

        <vellum-stat id="saving-throws" name="Saving Throws" values="{{savingThrows}}"></vellum-stat>
        <vellum-stat id="skills" name="Skills" values="{{skills}}"></vellum-stat>
        <vellum-stat id="damage-resistances" name="Damage Resistances" values="{{damageResistances}}"></vellum-stat>
        <vellum-stat id="damage-immunities" name="Damage Immunities" values="{{damageImmunities}}"></vellum-stat>
        <vellum-stat id="damage-threshold" name="Damage Threshold" values="{{damageThreshold}}"></vellum-stat>
        <vellum-stat id="condition-immunities" name="Condition Immunities" values="{{conditionImmunities}}"></vellum-stat>
        <vellum-stat id="senses" name="Senses" values="{{senses}}"></vellum-stat>
        <vellum-stat id="languages" name="Languages" values="{{languages}}"></vellum-stat>

        <dom-if if="{{cr}}">
          <template>
            <vellum-stat id="cr" name="Challenge" values="{{cr}} ({{xp}} XP)"></vellum-stat>
          </template>
        </dom-if>

      </div>

    </div>

    <vellum-stat-block-divider></vellum-stat-block-divider>

    <div id="traits-and-actions">
      <dom-repeat items="{{specialTraits}}">
        <template>
          <vellum-stat id\$="special-trait-{{index}}" class="trait" name="{{item.name}}." values="{{item.description}}"></vellum-stat>
        </template>
      </dom-repeat>

      <dom-if if="{{spellcasting}}">
        <template>
          <vellum-stat id="spellcasting" class="trait" name="Spellcasting." values="{{spellcastingDescription}}"></vellum-stat>
          <ul>
            <dom-repeat items="{{spellcasting.levels}}">
              <template>
                <li><vellum-spell-level id\$="spell-level-{{index}}" level="{{item.level}}" slots="{{item.slots}}" spells="{{item.spells}}"></vellum-spell-level></li>
              </template>
            </dom-repeat>
          </ul>
        </template>
      </dom-if>

      <dom-if if="{{actions}}">
        <template>
          <vellum-stat-block-section id="actions" name="Actions">

            <dom-repeat items="{{actions}}">
              <template>

                <dom-if if="{{!item.type}}">
                  <template>
                    <vellum-stat id\$="action-{{index}}" class="action" name="{{item.name}}." values="{{item.description}}"></vellum-stat>
                  </template>
                </dom-if>

                <dom-if if="{{item.type}}">
                  <template>
                    <vellum-attack id\$="action-{{index}}" name="{{item.name}}" type="{{item.type}}" bonus="{{item.bonus}}" reach="{{item.reach}}" range="{{item.range}}" target="{{item.target}}" damage="{{item.damage}}" damage-type="{{item.damageType}}" notes="{{item.notes}}" limited-usage="{{item.limitedUsage}}" effects="{{item.randomEffects}}"></vellum-attack>
                  </template>
                </dom-if>

              </template>
            </dom-repeat>

          </vellum-stat-block-section>
        </template>
      </dom-if>

      <dom-if if="{{reactions}}">
        <template>
          <vellum-stat-block-section id="reactions" name="Reactions">
            <dom-repeat items="{{reactions}}">
              <template>
                <vellum-stat id\$="reaction-{{index}}" class="action" name="{{item.name}}" values="{{item.description}}"></vellum-stat>
              </template>
            </dom-repeat>
          </vellum-stat-block-section>
        </template>
      </dom-if>

      <dom-if if="{{legendaryActions}}">
        <template>
          <vellum-stat-block-section id="legendary-actions" name="Legendary Actions">

            <p>The {{lowerCaseName}} can take {{legendaryActions.number}} legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. Spent legendary actions are regained at the start of each turn.</p>

            <ul>
              <dom-repeat items="{{legendaryActions.actions}}">
                <template>
                  <li><vellum-legendary-action id\$="legendary-action-{{index}}" action="{{item}}"></vellum-legendary-action></li>
                </template>
              </dom-repeat>
            </ul>
          </vellum-stat-block-section>

        </template>
      </dom-if>
    </div>`

    if (!memoizedTemplate) {
      memoizedTemplate = StatBlock.template.cloneNode(true)
      const stats = memoizedTemplate.content.querySelector('#stats')
      stats.innerHTML = template.innerHTML
    }
    return memoizedTemplate

  }

  static get is() { return 'vellum-monster' }

  static get properties() {
    return {
      name: String,
      lowerCaseName: {
        type: String,
        computed: '_computerLowerCaseName(name)'
      },
      size: String,
      type: String,
      alignment: String,
      description: {
        type: String,
        computed: '_description(size, type, alignment)'
      },
      ac: Object,
      hitDie: {
        type: String,
        value: ''
      },
      hp: Number,
      displayHp: {
        type: String,
        computed: '_displayHp(hitDie, hp)'
      },
      speeds: Array,
      str: Number,
      dex: Number,
      con: Number,
      int: Number,
      wis: Number,
      cha: Number,
      hasAbilities: {
        type: Boolean,
        computed: '_hasAbilities(str,dex,con,int,wis,cha)'
      },
      savingThrows: Array,
      skills: Array,
      damageResistances: String,
      damageImmunities: Array,
      damageThreshold: Number,
      conditionImmunities: Array,
      senses: Array,
      languages: Array,
      cr: Number,
      xp: {
        type: Number,
        computed: '_calculateXpFromCr(cr)'
      },
      specialTraits: Array,
      spellcasting: Object,
      spellcastingDescription: {
        type: Object,
        computed: '_spellcastingDescription(lowerCaseName, spellcasting)'
      },
      actions: Array,
      reactions: Array,
      legendaryActions: Object
    }
  }

  _description(size, type, alignment) {
    const basicDescription = size + ' ' + type
    if (alignment) {
      return basicDescription + ', ' + alignment
    } else {
      return basicDescription
    }
  }

  _hasAbilities(str, dex, con, int, wis, cha) {
    return (str !== undefined && dex !== undefined && con !== undefined && int !== undefined && wis !== undefined && cha !== undefined)
  }

  _computerLowerCaseName(name) {
    return name.toLowerCase()
  }

  _spellcastingDescription(lowerCaseName, spellcasting) {
    if (spellcasting) {
      return `
        The ${lowerCaseName} is a ${spellcasting.level}-level spellcaster.
        Its spellcasting ability is ${spellcasting.ability} (spell save DC ${spellcasting.save}, ${spellcasting.attackBonus} to hit with spell attacks), and ${spellcasting.notes}.
        The ${lowerCaseName} has the following ${spellcasting.class} spells prepared:`
    }
  }

  _calculateXpFromCr(cr) {
    return calculateXpFromCr(cr)
  }

  _displayHp(hitDie, hp) {
    if (!hp && hitDie) {
      return averageDie(hitDie)
    } else if (hp) {
      return hp
    } else {
      return ''
    }
  }

}

window.customElements.define(Monster.is, Monster)
