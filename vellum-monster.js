import { html, css } from 'lit-element'
import { StatBlock } from './vellum-stat-block.js'
import './vellum-stat-block-divider.js'
import './vellum-stat.js'
import './vellum-stat-block-ability-scores.js'
import './vellum-spell-level.js'
import './vellum-stat-block-section.js'
import './vellum-attack.js'
import './vellum-legendary-action.js'
import { calculateXpFromCr, averageDie, calculateCr } from './lib/monster.js'

class Monster extends StatBlock {

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
      name: { type: String },
      named: { type: Boolean },
      size: { type: String },
      type: { type: String },
      alignment: { type: String },
      ac: { type: Number },
      armor: { type: String },
      displayArmor: { type: String },
      'hit-die': { type: String },
      hp: { type: Number },
      speeds: { type: Array },
      str: { type: Number },
      dex: { type: Number },
      con: { type: Number },
      int: { type: Number },
      wis: { type: Number },
      cha: { type: Number },
      'saving-throws': { type: Array },
      skills: { type: Array },
      vulnerabilities: { type: String },
      resistances: { type: String },
      immunities: { type: Array },
      threshold: { type: Number },
      'condition-immunities': { type: Array },
      senses: { type: Array },
      languages: { type: Array },
      cr: { type: String },
      xp: { type: Number },
      traits: { type: Array },
      spellcasting: { type: Object },
      actions: { type: Array },
      reactions: { type: Array },
      'legendary-actions': { type: Array }
    }
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.calculatedCrs) {
      const displayAdjustment = (number) => number > 0 ? `+${number}` : number

      console.table({
        name: {
          value: this.name
        },
        hitPoints: {
          value: this.effectiveHp,
          effectiveCr: this.calculatedCrs.hpCr
        },
        armourClass: {
          value: this.effectiveAc,
          effectiveCr: displayAdjustment(this.calculatedCrs.acAdjustment)
        },
        defensive: { effectiveCr: this.calculatedCrs.defensiveCr },
        damage: {
          value: this.effectiveDamage,
          effectiveCr: this.calculatedCrs.damageCr
        },
        attackBonus: {
          value: this.effectiveAttackBonus,
          effectiveCr: displayAdjustment(this.calculatedCrs.attackBonusAdjustment)
        },
        offensive: { effectiveCr: this.calculatedCrs.offensiveCr },
        cr: {
          value: this.cr,
          effectiveCr: this.calculatedCrs.effectiveCr
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
          <vellum-stat id="hp" name="Hit Points" .values=${this['hit-die'] ? `${this.displayHp} (${this['hit-die']})` : this.hp}></vellum-stat>
          <vellum-stat id="speed" name="Speed" .values=${this.speeds}></vellum-stat>
        </div>

        ${this.hasAbilities ? this.renderAbilities() : html``}

        <div>

          <vellum-stat id="saving-throws" name="Saving Throws" .values=${this['saving-throws']}></vellum-stat>
          <vellum-stat id="skills" name="Skills" .values=${this.skills}></vellum-stat>
          <vellum-stat id="damage-vulnerabilities" name="Damage Vulnerabilities" .values=${this.vulnerabilities}></vellum-stat>
          <vellum-stat id="damage-resistances" name="Damage Resistances" .values=${this.resistances}></vellum-stat>
          <vellum-stat id="damage-immunities" name="Damage Immunities" .values=${this.immunities}></vellum-stat>
          <vellum-stat id="damage-threshold" name="Damage Threshold" .values=${this.threshold}></vellum-stat>
          <vellum-stat id="condition-immunities" name="Condition Immunities" .values=${this['condition-immunities']}></vellum-stat>
          <vellum-stat id="senses" name="Senses" .values=${this.senses}></vellum-stat>
          <vellum-stat id="languages" name="Languages" .values=${this.languages}></vellum-stat>

          ${(this.calculatedCrs.effectiveCr || this.cr) && this.type !== 'object'
            ? html`<vellum-stat id="cr" name="Challenge" .values="${this.cr ? this.cr : this.calculatedCrs.effectiveCr} (${this.displayXp} XP)"></vellum-stat>`
            : html``}

        </div>
      </div>

      <vellum-stat-block-divider></vellum-stat-block-divider>

      <div id="traits-and-actions">
        ${this.traits ? this.renderSpecialTraits() : html``}

        ${this.spellcasting && this.spellcasting.levels ? this.renderSpellcasting() : html``}

        ${this.actions ? this.renderActions() : html``}

        ${this.reactions ? this.renderReactions() : html``}

        ${this['legendary-actions'] && this['legendary-actions'].actions ? this.renderLegendaryActions() : html``}
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
    return html`${
      this.traits.map((trait, i) =>
        html`
          <vellum-stat
            id="special-trait-${i}"
            class="trait"
            name="${trait.name}."
            .values="${trait.description}"
          ></vellum-stat>`
      )
    }`
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
        .name="${action.name}"
        .type="${action.type}"
        .bonus="${action.bonus}"
        .reach="${action.reach}"
        .range="${action.range}"
        .target="${action.target}"
        .damage="${action.damage}"
        damage-type="${action.damageType}"
        .notes="${action.notes}"
        .limited-usage="${action.limitedUsage}"
        .effects="${action.randomEffects}"
      ></vellum-attack>`
    }
  }

  renderReactions() {
    return html`
      <vellum-stat-block-section id="reactions" name="Reactions">
        ${this.reactions.map((reaction, i) => html`<vellum-stat id="reaction-${i}" class="action" name="${reaction.name}." values="${reaction.description}"></vellum-stat>`)}
      </vellum-stat-block-section>`
  }

  renderLegendaryActions() {
    return html`
      <vellum-stat-block-section id="legendary-actions" name="Legendary Actions">

        <p>${this.subjectLabel} can take ${this['legendary-actions'].number} legendary actions, choosing from the options below. Only one legendary action can be used at a time, and only at the end of another creature's turn. Spent legendary actions are regained at the start of each turn.</p>

        <ul>
          ${this['legendary-actions'].actions.map((action, i) => html`<li><vellum-legendary-action id="legendary-action-${i}" name="${action.name}" actions="${action.actions}" description="${action.description}"></vellum-legendary-action></li>`)}
        </ul>

      </vellum-stat-block-section>`
  }

  get hasAbilities() {
    return (this.str !== undefined && this.dex !== undefined && this.con !== undefined && this.int !== undefined && this.wis !== undefined && this.cha !== undefined)
  }

  get subjectLabel() {
    if (this.named) {
      return this.name
    } else {
      return `The ${this.name.toLowerCase()}`
    }
  }

  get spellcastingDescription() {
    if (this.spellcasting) {
      return `
        ${this.spellcasting.innate ? '' : `${this.subjectLabel} is a ${this.spellcasting.level}-level spellcaster.`}
        ${this.spellcasting.innate ? `${this.subjectLabel}'s innate` : 'Its'}
        spellcasting ability is ${this.spellcasting.ability} (spell save DC
        ${this.spellcasting.save}${this.spellcasting.attackBonus ? ',' : ')'}${this.spellcasting.attackBonus ? `${this.spellcasting.attackBonus} to hit with spell attacks)` : ''}${this.spellcasting.notes}
        ${this.spellcasting.innate ? '' : `${this.subjectLabel} has the following ${this.spellcasting.class} spells prepared:`}`
    }
  }

  get displayXp() {
    if (this.xp) return this.xp
    else return this.cr ? calculateXpFromCr(this.cr) : calculateXpFromCr(this.calculatedCrs.effectiveCr)
  }

  get displayHp() {
    const hitDie = this['hit-die']
    if (!this.hp && hitDie) {
      return averageDie(hitDie)
    } else if (this.hp) {
      return this.hp
    } else {
      return ''
    }
  }

  get allTraitsAndActions() {
    return []
      .concat(this.traits || [])
      .concat(this.actions || [])
      .concat(this['legendary-actions'] ? this['legendary-actions'].actions : [])
      .concat(this.reactions || [])
  }

  get calculatedCrs() {
    return calculateCr({
      hp: this.effectiveHp,
      ac: this.effectiveAc,
      attackBonus: this.effectiveAttackBonus,
      damagePerRound: this.effectiveDamage
    })
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
    const attackBonuses = (this.actions || [])
      .filter(action => action.type)
      .map(this._calculateMultiattack(this.actions))
      .map(attack => attack.bonus)
      .map(bonus => parseInt(bonus))

    if (attackBonuses.length < 1) {
      return 0
    } else {
      return Math.max(...attackBonuses)
    }
  }

  get maxDamagePerRound() {
    const damages = (this.actions || [])
      .filter(action => action.type)
      .map(this._calculateMultiattack(this.actions))
      .map(attack => attack.averageDamage ? attack.averageDamage : averageDie(attack.damage))

    if (damages.length < 1) {
      return 0
    } else {
      return Math.max(...damages)
    }
  }

  _calculateMultiattack(actions) {
    return (action) => {
      if (action.type && action.type === 'multiattack') {
        const attack = actions.filter((a) => a.id === action.multiAttacks.id)[0]
        action.averageDamage = action.multiAttacks.number * averageDie(attack.damage)
        action.bonus = attack.bonus
        return action
      } else {
        return action
      }
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
