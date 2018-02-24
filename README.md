# &lt;vellum-stat-block&gt;

Web component for displaying monster stat blocks for the fifth edition of the world's most popular table-top roleplaying game. Based on [Val Markovic's Statblock5e](https://valloric.github.io/statblock5e/) but with the following, additional features:

  * Cross-browser support using Polymer and the Web Components polyfill
  * Simpler (just one import vs 5)
  * Theme-able

To install:

```sh
bower install --save-dev vellum-stat-block
```

Add the following lines to your HTML `head` element:

```html
<script src="../webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="vellum-stat-block.html">
```

A stat block is written as follows:

```html
<vellum-stat-block id="warhorse" itemscope itemtype="http://rgladwell.github.io/vellum-schemas/monster.html">

  <dl>
    <dt>Name</dt><dd itemprop="name">Warhorse</dd>
    <dt>Size</dt><dd itemprop="size">Large</dd>
    <dt>Type</dt><dd itemprop="type">beast</dd>
    <dt>Alignment</dt><dd itemprop="alignment">unaligned</dd>

    <dt>Armor Class</dt><dd itemprop="ac">11</dd>
    <dt>Hit Points</dt><dd><span itemprop="hp">19</span> (<span itemprop="hitDie">3d10 + 3</span>)</dd>
    <dt>Speed</dt><dd itemprop="speeds">60 ft.</dd>

    <dt>Strength</dt><dd itemprop="str">18</dd>
    <dt>Dexterity</dt><dd itemprop="dex">12</dd>
    <dt>Constitution</dt><dd itemprop="con">13</dd>
    <dt>Intelligence</dt><dd itemprop="int">2</dd>
    <dt>Wisdom</dt><dd itemprop="wis">12</dd>
    <dt>Charisma</dt><dd itemprop="cha">7</dd>

    <dt>Senses</dt><dd itemprop="senses">passive Perception 11</dd>
    <dt>Challenge</dt><dd itemprop="challenge">1/2</dd>
  </dl>

  <ol>
    <li itemprop="specialTraits" itemscope>
      <span itemprop="name">Trampling Charge</span>
      <span itemprop="description">If the horse moves at least 20 feet straight toward a creature and then hits it with a hooves attack on
  the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action.</span>
    </li>

      <li itemprop="actions" itemscope>
        <span itemprop="name">Hooves</span>
        <span><data itemprop="type" value="melee-attack">Melee Weapon Attack</data>: <span itemprop="bonus">+4</span> to hit, reach <span itemprop="reach">5 ft.</span>, <span itemprop="target">one target</span>. Hit: <span itemprop="damage">11 (2d6 + 4)</span> <span itemprop="damageType">bludgeoning</span> damage.</span>
      </li>
  </ol>

</vellum-stat-block>
```

This module also includes a theme to give your stat blocks a Monster Manual look. Simply add the following lines to your HTML file `head` element:

```html
<link rel="import" href="themes/monster-manual/monster-manual-theme.html">
<style is="custom-style" include="monster-manual-theme"></style>
```

## Custom Themes

To create a custom theme for your own stat blocks create a file with the following content:

```html
<link rel="import" href="../../../polymer/polymer-element.html">

<dom-module id="my-stat-block-theme">

  <template>
    <style>
      html vellum-stat-block.my-stat-block {
        // CSS styles here
      }
    </style>
  </template>

  <script>
    class MyTheme extends Polymer.Element {
      static get is() { return 'my-stat-block-theme'; }
    }
  </script>

</dom-module>
```

You can then add custom styles in the `style` element above as described the Polymer documentation for [Styling an element's shadow DOM](https://www.polymer-project.org/2.0/docs/devguide/style-shadow-dom#custom-style).

Custom CSS properties for this component include:

| Property                               | Description
| -------------------------------------- | ---
| `--stat-block-bar-border`              | Describes the border property for top and bottom stat block bars, as per the [CSS `border` property](https://developer.mozilla.org/en/docs/Web/CSS/border).
| ` --stat-block-bar-background`         | Describes the background property for top and bottom stat block bars, as per the [CSS `background` property](https://developer.mozilla.org/en/docs/Web/CSS/background).
| `--stat-block-border-color`            | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) for the stat block borders on the right and left.
| `--stat-block-header-color`            | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) of the section headings and stat block header text.
| `--stat-block-divider-color`           | The [colour](https://developer.mozilla.org/en-US/docs/Web/CSS/color) of the divider between sections of the stat block.
| `--stat-block-two-column-width`        | If the `two-column` class is applied to the stat block, this defines the width of the wider stat block.
| `--stat-block-two-column-column-width` | If the `two-column` class is applied to the stat block, this defines the width of the width of the columns within the stat block.

## Hacking

Requirements:

  * [Node.js](http://nodejs.org/)

To set-up your environment execute:

    $ npm install
