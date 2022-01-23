import { html } from 'lit/static-html.js'

export const detailedStatblock =
  html`
    <vellum-monster
      id="gynosphinx"
      name="Gynosphinx"
      size="large"
      type="monstrosity"
      alignment="lawful neutral"
      ac="17"
      armor="natural armor"
      hit-die="16d10 + 48"
      speeds='["40 ft.", "fly 60 ft."]'

      str="18"
      dex="17"
      con="16"
      int="14"
      wis="11"
      cha="8"

      skills='["Arcana +14", "History +14", "Perception +9", "Religion +9"]'
      vulnerabilities='["fire"]'
      resistances="bludgeoning, piercing, and slashing from nonmagical items"
      immunities='["psychic"]'
      condition-immunities='["charmed", "frightened"]'
      senses='["truesight 120 ft.", "passive Perception 18"]'
      languages='["Common", "Sphinx"]'
      saving-throws='["Strength +14"]'
      traits='[
        {
          "name": "Inscrutable",
          "description": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any Divination spell that it refuses. Wisdom (Insight) checks made to ascertain the sphinx&apos;s intentions or sincerity have disadvantage."
        },
        {
          "name": "Magic Weapons",
          "description": "The sphinx&apos;s weapon attacks are magical.",
          "hpAdjustment": "+68"
        }
      ]'
      spellcasting='{
        "level": "9th",
        "ability": "Intelligence",
        "save": 17,
        "attackBonus": "+9",
        "notes": " and it requires no material components to cast its spells.",
        "class": "wizard",
        "levels": [
          {
            "level": "Cantrips",
            "spells": ["mage hand", "minor illusion", "prestidigitation"]
          },
          {
            "level": "1st",
            "slots": 4,
            "spells": ["detect magic", "identify", "shield"]
          },
          {
            "level": "2nd",
            "slots": 3,
            "spells": ["darkness", "locate object", "suggestion"]
          },
          {
            "level": "3rd",
            "slots": 3,
            "spells": ["dispel magic", "remove curse", "tongues"]
          },
          {
            "level": "4th",
            "slots": 2,
            "spells": ["banishment", "greater invisibility"]
          },
          {
            "level": "5th",
            "slots": 1,
            "spells": ["legend lore"]
          }
        ]
      }'
      actions='[
        {
          "name": "Multiattack",
          "type": "multiattack",
          "description": "The sphinx makes two claw attacks.",
          "multiAttacks": {
            "id": "claw",
            "number": 2
          }
        },
        {
          "id": "claw",
          "name": "Claw",
          "type": "melee-or-ranged-attack",
          "bonus": "+9",
          "reach": "5 ft.",
          "range": "10ft./20ft.",
          "target": "one target",
          "damage": "2d8 + 4",
          "damageType": "slashing",
          "notes": ". This is a magic weapon attack",
          "limitedUsage": "3/Day",
          "randomEffects": [
            {
              "roll": "1",
              "name": "Rabid",
              "effect": "The target becomes rabid and uses any actions it has this turn to make melee attacks against its nearest ally."
            },
            {
              "roll": "2",
              "name": "Paralysed",
              "effect": "The target becomes paralysed."
            },
            {
              "roll": "3-5",
              "name": "Poisoned",
              "effect": "The target becomes poisoned and takes 1d4 poison damage."
            },
            {
              "roll": "6",
              "name": "Blinded",
              "effect": "The target becomes blinded."
            }
          ]
        },
        {
          "name": "Limited Simple Action",
          "limitedUsage": "1/Day",
          "description": "The sphinx makes one claw attack."
        }
      ]'
      reactions='[
        {
          "name": "Parry",
          "description": "The gynosphinx adds 3 to its AC against one melee attack that would hit it.",
          "acAdjustment": "+1",
          "attackAdjustment": "+1"
        }
      ]'
      legendary-actions='{
        "number": 3,
        "actions": [
          {
            "name": "Claw Attack",
            "description": "The sphinx makes one claw attack.",
            "damageAdjustment": "+39"
          },
          {
            "name": "Teleport",
            "actions": 2,
            "description": "The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."
          },
          {
            "name": "Cast a Spell",
            "actions": 3,
            "description": "The sphinx casts a spell from its list of prepared Spells, using a spell slot as normal."
          }
        ]
      }'
    >
    </vellum-monster>
  `

export const simpleStatblock =
  html`
    <vellum-monster
      id="warhorse"
      class="official"
      name="Warhorse"
      size="Large"
      type="beast"
      alignment="unaligned"
      ac="11"
      armor="natural armor"
      hp="11"
      hit-die="16d10 + 48"
      speeds='["60 ft."]'
      cr="½"

      str="18"
      dex="12"
      con="13"
      int="2"
      wis="12"
      cha="7"

      senses='["passive Perception 11"]'
      traits='[
        {
          "name": "Trampling Charge",
          "description": "If the horse moves at least 20 feet straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action."
        }
      ]'
      actions='[
        {
          "name": "Hooves",
          "type": "melee-attack",
          "bonus": "+4",
          "reach": "5ft.",
          "target": "one target",
          "damage": "2d6 + 4",
          "damageType": "bludgeoning"
        }
      ]'
    >
    </vellum-monster>
   `

export const objectStatblock =
  html`
    <vellum-monster
      id="trench"
      name="Trench"
      size="Huge"
      type="object"
      ac="11"
      hp="40"
      immunities='["poison", "psychic"]'
      threshold="10"

      reactions='[
        {
          "name": "Mire",
          "description": "The trench can grapple anyone attempting to cross it."
        }
      ]'
    >
    </vellum-monster>
  `

export const emptyStatblock =
  html`
   <vellum-monster id="empty" itemscope itemtype="https://grislyeye.com//vellum-schemas/monster.html">
   </vellum-monster>
  `

export const innateSpellcasterStatblock =
  html`
    <vellum-monster
      id="pixie"
      name="Pixie"
      size="Tiny"
      type="fey"
      alignment="neutral good"
      ac="15"
      hp="1"
      hit-die="1d4 - 1"
      speeds='["10 ft.","fly 30 ft."]'

      str="2"
      dex="20"
      con="8"
      int="10"
      wis="14"
      cha="15"

      skills='["Perception +4","Stealth +7"]'
      senses='["passive Perception 11"]'
      traits='[
        {
          "name": "Magic Resistance",
          "description": " The pixie has advantage on saving throws against spells and other magical effects."
        }
      ]'
      spellcasting='{
        "ability": "Charisma",
        "save": 12,
        "innate": true,
        "notes": ". It can innately cast the following spells, requiring only its pixie dust as a component:",
        "levels": [
          {
            "level": "at-will",
            "spells": ["druidcraft"]
          },
          {
            "level": "1/day",
            "spells": ["confusion", "dancing lights", "detect evil and good"]
          }
        ]
      }'
      actions='[
        {
          "name": "Superior Invisibility",
          "description": "The pixie magically turns invisible until its concentration ends (as if concentrating on a spell). Any equipment the pixie wears or carries is invisible with it."
        }
      ]'
    >
    </vellum-monster>
  `

export const namedStatblock =
  html`
    <vellum-monster
      id="pixie"
      name="Florence the Pixie"
      named="true"
      size="Tiny"
      type="fey"
      alignment="neutral good"
      ac="15"
      hp="1"
      hit-die="1d4 - 1"
      speeds='["10 ft.","fly 30 ft."]'

      str="2"
      dex="20"
      con="8"
      int="10"
      wis="14"
      cha="15"

      skills='["Perception +4","Stealth +7"]'
      senses='["passive Perception 11"]'

      spellcasting='{
        "ability": "Charisma",
        "save": 12,
        "innate": true,
        "notes": ". It can innately cast the following spells, requiring only its pixie dust as a component:",
        "levels": [
          {
            "level": "at-will",
            "spells": ["druidcraft"]
          },
          {
            "level": "1/day",
            "spells": ["confusion", "dancing lights", "detect evil and good"]
          }
        ]
      }'
      legendary-actions='{
        "number": 3,
        "actions": [
          {
            "name": "Claw Attack",
            "description": "The sphinx makes one claw attack.",
            "damageAdjustment": "+39"
          }
        ]
      }'
    >
    </vellum-monster>
  `
