# dnd-stat-block

Web component for displaying 5th Edition *Dunegons & Dragons* monster stat blocks. Based on [Val Markovic's Statblock5e](https://valloric.github.io/statblock5e/) but with the following, additional features:

  * Cross-browser support using Polymer and the Web Components polyfill
  * Simpler (just one import vs 5)
  * Theme-able

To install:

```sh
bower install --save-dev dnd-stat-block
```

Add the following lines to your HTML `head` element:

```html
<script src="../webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="dnd-stat-block.html">
```

A statblock is written as follows:

```html
      <dnd-stat-block id="goblin" str="8" dex="14" con="10" int="10" wis="8" cha="8">
        <header>
          <h1>Goblin</h1>
          <p>Small humanoid (goblinoid), neutral evil</p>
        </header>

        <combat-stats>
          <dl>
            <dt>Armor Class</dt><dd>17 (leather armor, shield)</dd>
            <dt>Hit Points</dt><dd>7 (2d6)</dd>
            <dt>Speed</dt><dd>30 ft.</dd>
          </dl>
        </combat-stats>

        <attributes>
          <dl>
            <dt>STR</dt><dd>8 (-1)</dd>
            <dt>DEC</dt><dd>14 (+2)</dd>
            <dt>CON</dt><dd>10 (+0)</dd>
            <dt>INT</dt><dd>10 (+0)</dd>
            <dt>WIS</dt><dd>8 (-1)</dd>
            <dt>CHA</dt><dd>8 (-1)</dd>
          </dl>
        </attributes>

        <stats>
          <dl>
            <dt>Skills</dt><dd>Stealth +6</dd>
            <dt>Senses</dt><dd>dark vision 60 ft., passive Perception 9</dd>
            <dt>Languages</dt><dd>Common, Goblin</dd>
            <dt>Challenge</dt><dd>&frac14; (50 XP)</dd>
          </dl>
        </stats>

        <special-traits>
          <dl>
            <dt>Nimble Escape</dt>
            <dd>The goblin can take the Disengage or Hide action as a bonus action on each of its turns.</dd>
          </dl>
        </special-traits>

        <actions>
          <h2>Actions</h2>
          <dl>
            <dt>Scimitar.</dt>
            <dd>Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage..</dd>
          </dl>
          <dl>
            <dt>Shortbow.</dt>
            <dd>Ranged Weapon Attack: +4 to hit, reach 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage..</dd>
          </dl>
        </actions>

        <reactions>
          <h2>Reactions</h2>
          <dl>
            <dt>Redirect Attack.</dt>
            <dd>When a creature the goblin can see targets it with an attack the goblin chooses another goblin withit 5 feet of it. The two goblins swap places, and the chosen goblin becomes the target instead.</dd>
          </dl>
        </reactions>
      </dnd-stat-block>
```

This module also includes a theme to give your stat blocks a Monster Manual look. Simply add the following lines to your HTML file `head` element:

```html
<link rel="import" href="themes/monster-manual/monster-manual-theme.html">
<style is="custom-style" include="monster-manual-theme"></style>
```

## Custom Themes

To create a custom theme for your own stat blocks create a file with the following content:

```html
<dom-module id="my-stat-block-theme">

  <template>
    <style>
    </style>
  </template>

  <script>
    HTMLImports.whenReady(function () {
      Polymer({
        is: 'my-stat-block-theme'
      });
    });
  </script>

</dom-module>
```

You can then add custom styles in the `style` element above as described the Polymer documentation for [Styling local DOM](https://www.polymer-project.org/1.0/docs/devguide/styling).

Custom CSS properties for this component include:

| Property                       | Description 
| ------------------------------ | ---
| ` --stat-block-bar-background` | Describes the background property for top and bottom stat block bars, as per the [CSS `background` property](https://developer.mozilla.org/en/docs/Web/CSS/background).
| `--stat-block-border-color`    | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) for the stat block borders on the right and left.
| `--stat-block-header-color`    | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) of the section headings and stat block header text.
| `--stat-block-divider-color`  | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) of the divider between sections of the stat block.

## Hacking

Requirements:

  * [Node.js](http://nodejs.org/)

To set-up your environment execute:

    $ npm install
