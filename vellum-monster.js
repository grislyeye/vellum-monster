import { html, css } from 'lit-element'
import { StatBlock } from './vellum-stat-block.js'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'
import { MicrodataMixin } from '../polymer-microdata/polymer-microdata.js'
import { calculateXpFromCr, averageDie, calculateCr } from './lib/monster.js'

class Monster extends MicrodataMixin(StatBlock) {

  static get styles() {
    return css`
      ${StatBlock.styles}

      #legendary-actions ul li {
        margin: 0;
        padding-left: 1em;
        text-indent: -1em;
      }`
  }

  static get is() { return 'vellum-monster' }

  static get properties() {
    return {
      name: String,
      size: String,
      type: String,
      alignment: String,
      ac: Number,
      armor: String,
      displayArmor: String,
      hitDie: String,
      hp: Number,
      speeds: Array,
      str: Number,
      dex: Number,
      con: Number,
      int: Number,
      wis: Number,
      cha: Number,
      savingThrows: Array,
      skills: Array,
      damageVulnerabilities: String,
      damageResistances: String,
      damageImmunities: Array,
      damageThreshold: Number,
      conditionImmunities: Array,
      senses: Array,
      languages: Array,
      cr: String,
      xp: Number,
      specialTraits: Array,
      spellcasting: Object,
      actions: Array,
      reactions: Array,
      legendaryActions: Object
    }
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.calculatedCr) {
      console.table({
        name: {
          value: this.name
        },
        hitPoints: {
          value: this.effectiveHp,
          effectiveCr: this.calculatedCr.hpCr
        },
        armourClass: {
          value: this.effectiveAc,
          effectiveCr: this.calculatedCr.acCr
        },
        defensive: { effectiveCr: this.calculatedCr.defensiveCr },
        damage: {
          value: this.effectiveDamage,
          effectiveCr: this.calculatedCr.damageCr
        },
        attackBonus: {
          value: this.effectiveAttackBonus,
          effectiveCr: this.calculatedCr.attackBonusCr
        },
        offensive: { effectiveCr: this.calculatedCr.offensiveCr },
        cr: {
          value: this.cr,
          effectiveCr: this.calculatedCr.effectiveCr
        }
      })
    }
  }

  get description() {
    const basicDescription = this.size + ' ' + this.type
    if (this.alignment) {
      return basicDescription + ', ' + this.alignment
    } else {
      return basicDescription
    }
  }

  renderStats() {
    return html`
      <div id="monster-stats" class="main-stats">

        <div class="combat-stats">
          <vellum-stat id="ac" name="Armor Class" .values=${this.armor ? `${this.ac} (${this.armor})` : this.ac}></vellum-stat>
          <vellum-stat id="hp" name="Hit Points" .values=${this.hitDie ? `${this.displayHp} (${this.hitDie})` : `${this.hp}`}></vellum-stat>
          <vellum-stat id="speed" name="Speed" .values=${this.speeds}></vellum-stat>
        </div>

        ${this.hasAbilities ? this.renderAbilities() : html``}

        <div>

          <vellum-stat id="saving-throws" name="Saving Throws" .values=${this.savingThrows}></vellum-stat>
          <vellum-stat id="skills" name="Skills" .values=${this.skills}></vellum-stat>
          <vellum-stat id="damage-vulnerabilities" name="Damage Vulnerabilities" .values=${this.damageVulnerabilities}></vellum-stat>
          <vellum-stat id="damage-resistances" name="Damage Resistances" .values=${this.damageResistances}></vellum-stat>
          <vellum-stat id="damage-immunities" name="Damage Immunities" .values=${this.damageImmunities}></vellum-stat>
          <vellum-stat id="damage-threshold" name="Damage Threshold" .values=${this.damageThreshold}></vellum-stat>
          <vellum-stat id="condition-immunities" name="Condition Immunities" .values=${this.conditionImmunities}></vellum-stat>
          <vellum-stat id="senses" name="Senses" .values=${this.senses}></vellum-stat>
          <vellum-stat id="languages" name="Languages" .values=${this.languages}></vellum-stat>

          ${this.effectiveCr ? html`<vellum-stat id="cr" name="Challenge" .values="${this.effectiveCr} (${this.displayXp} XP)"></vellum-stat>` : html``}

        </div>
      </div>

      <vellum-stat-block-divider></vellum-stat-block-divider>

      <div id="traits-and-actions">
        ${this.specialTraits ? this.renderSpecialTraits() : html``}

        ${this.spellcasting ? this.renderSpellcasting() : html``}

        ${this.actions ? this.renderActions() : html``}

        ${this.reactions ? this.renderReactions() : html``}

        ${this.legendaryActions ? this.renderLegendaryActions() : html``}
      </div>`
  }

  renderAbilities() {
    return html`
      <vellum-stat-block-divider></vellum-stat-block-divider>

      <vellum-stat-block-ability-scores
        id="ability-scores"
        str="${this.str}"
        dex="${this.dex}"
        con="${this.con}"
        int="${this.int}"
        wis="${this.wis}"
        cha="${this.cha}"
      ></vellum-stat-block-ability-scores>

      <vellum-stat-block-divider></vellum-stat-block-divider>`
  }

  renderSpecialTraits() {
    return html`${this.specialTraits.map((trait, i) => html`<vellum-stat id="special-trait-${i}" class="trait" name="${trait.name}." .values="${trait.description}"></vellum-stat>`)}`
  }

  renderSpellcasting() {
    return html`
      <vellum-stat id="spellcasting" class="trait" name="Spellcasting." values="${this.spellcastingDescription}"></vellum-stat>

      <ul>
        ${this.spellcasting.levels.map((level, i) => html`<li><vellum-spell-level id="spell-level-${i}" level="${level.level}" slots="${level.slots}" .spells="${level.spells}"></vellum-spell-level></li>`)}
      </ul>`
  }

  renderActions() {
    return html`
      <vellum-stat-block-section id="actions" name="Actions">
        ${this.actions.map((action, i) => this.renderAction(action, i))}
      </vellum-stat-block-section>`
  }

  renderAction(action, index) {
    if (this._isNotAttack(action)) {
      return html`<vellum-stat id="action-${index}" class="action" name="${action.name}." values="${action.description}"></vellum-stat>`
    } else if (this._isMultiAttack(action)) {
      return html`<vellum-stat id="multiattack-${index}" class="action" name="Multiattack." values="${action.description}"></vellum-stat>`
    } else if (this._isAttack(action)) {
      return html`<vellum-attack
        id="attack-${index}"
        name="${action.name}"
        type="${action.type}"
        bonus="${action.bonus}"
        reach="${action.reach}"
        range="${action.range}"
        target="${action.target}"
        damage="${action.damage}"
        damage-type="${action.damageType}"
        notes="${action.notes}"
        .limited-usage="${action.limitedUsage}"
        .effects="${action.randomEffects}"
      ></vellum-attack>`
    }
  }

  renderReactions() {
    return html`
      <vellum-stat-block-section id="reactions" name="Reactions">
        ${this.reactions.map((reaction, i) => html`<vellum-stat id="reaction-${i}" class="action" name="${reaction.name}" values="${reaction.description}"></vellum-stat>`)}
      </vellum-stat-block-section>`
  }

  renderLegendaryActions() {
    return html`
      <vellum-stat-block-section id="legendary-actions" name="Legendary Actions">

        <p>The ${this.lowerCaseName} can take ${this.legendaryActions.number} legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. Spent legendary actions are regained at the start of each turn.</p>

        <ul>
          ${this.legendaryActions.actions.map((action, i) => html`<li><vellum-legendary-action id="legendary-action-${i}" name="${action.name}" actions="${action.actions}" description="${action.description}"></vellum-legendary-action></li>`)}
        </ul>
      </vellum-stat-block-section>`
  }

  get hasAbilities() {
    return (this.str !== undefined && this.dex !== undefined && this.con !== undefined && this.int !== undefined && this.wis !== undefined && this.cha !== undefined)
  }

  get lowerCaseName() {
    return this.name.toLowerCase()
  }

  get spellcastingDescription() {
    if (this.spellcasting) {
      return `
        The ${this.lowerCaseName} is a ${this.spellcasting.level}-level spellcaster.
        Its spellcasting ability is ${this.spellcasting.ability} (spell save DC ${this.spellcasting.save}, ${this.spellcasting.attackBonus} to hit with spell attacks), and ${this.spellcasting.notes}.
        The ${this.lowerCaseName} has the following ${this.spellcasting.class} spells prepared:`
    }
  }

  get displayXp() {
    if (this.xp) return this.xp
    else return calculateXpFromCr(this.effectiveCr)
  }

  get displayHp() {
    if (!this.hp && this.hitDie) {
      return averageDie(this.hitDie)
    } else if (this.hp) {
      return this.hp
    } else {
      return ''
    }
  }

  get allTraitsAndActions() {
    return []
      .concat(this.specialTraits || [])
      .concat(this.actions || [])
      .concat(this.legendaryActions ? this.legendaryActions.actions : [])
      .concat(this.reactions || [])
  }

  get effectiveCr() {
    if (this.cr) return this.cr
    else {
      return calculateCr({
        hp: this.effectiveHp,
        ac: this.effectiveAc,
        attackBonus: this.effectiveAttackBonus,
        damagePerRound: this.effectiveDamage
      }).effectiveCr
    }
  }

  get effectiveHp() {
    return this.allTraitsAndActions
      .filter(action => action.hpAdjustment)
      .map(action => action.hpAdjustment)
      .map(adjustment => parseInt(adjustment))
      .reduce((a, b) => a + b, parseInt(this.displayHp))
  }

  get effectiveAc() {
    return this.allTraitsAndActions
      .filter(action => action.acAdjustment)
      .map(action => action.acAdjustment)
      .map(adjustment => parseInt(adjustment))
      .reduce((a, b) => a + b, parseInt(this.ac))
  }

  get effectiveAttackBonus() {
    return this.allTraitsAndActions
      .filter(action => action.attackAdjustment)
      .map(action => action.attackAdjustment)
      .map(adjustment => parseInt(adjustment))
      .reduce((a, b) => a + b, this.maxAttackBonus)
  }

  get effectiveDamage() {
    return this.allTraitsAndActions
      .filter(action => action.damageAdjustment)
      .map(action => action.damageAdjustment)
      .map(adjustment => parseInt(adjustment))
      .reduce((a, b) => a + b, this.maxDamagePerRound)
  }

  get maxAttackBonus() {
    return Math.max(...(this.actions || [])
      .filter(action => action.type)
      .filter(this._calculateMultiattack)
      .map(attack => attack.bonus)
      .map(bonus => parseInt(bonus))
    )
  }

  get maxDamagePerRound() {
    return Math.max(...(this.actions || [])
      .filter(action => action.type)
      .filter(this._calculateMultiattack)
      .map(attack => attack.averageDamage ? attack.averageDamage : averageDie(attack.damage))
    )
  }

  _calculateMultiattack(action) {
    if (action.type && action.type === 'multiattack') {
      action.averageDamage = action.multiAttacks.number * averageDie(action.multiAttacks.damage)
      action.bonus = action.multiAttacks.bonus
      return action
    } else {
      return action
    }
  }

  _isNotAttack(action) {
    return action.type === undefined
  }

  _isAttack(action) {
    return action.type === 'ranged-attack' ||
      action.type === 'melee-attack' ||
      action.type === 'melee-or-ranged-attack'
  }

  _isMultiAttack(action) {
    return action.type === 'multiattack'
  }

}

window.customElements.define(Monster.is, Monster)
