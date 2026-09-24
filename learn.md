# AshTech: a beginner's guide to HTML and CSS

AshTech is a Pokémon field guide for young trainers. It has a Pokédex, a type chart, an evolution lab, a tour of the regions, a theater, a sign-up form, and three games.

It is built almost entirely with **two languages: HTML and CSS**. Every game, filter and animation works with no JavaScript at all. A few jobs that HTML and CSS truly can't do (making a PDF of your trainer card, reacting to what you type in the Workshop labs, drawing the handbook's diagrams) use a small amount of **JavaScript**. Each one is explained in [When we DO use JavaScript](#88-when-we-do-use-javascript). There is no framework and no build step. Every file in this folder is something you could write by hand in a plain text editor.

This guide explains how the whole site was made, what every tag is for, and how the CSS tricks work. Read it from top to bottom, or jump to the part you need.

---

## Contents

1. [Opening the site](#1-opening-the-site)
2. [What's in the folder](#2-whats-in-the-folder)
3. [How the site was planned](#3-how-the-site-was-planned)
4. [HTML basics](#4-html-basics)
5. [Every HTML tag used in AshTech](#5-every-html-tag-used-in-ashtech)
6. [CSS basics](#6-css-basics)
7. [CSS, topic by topic](#7-css-topic-by-topic)
8. [Remembering clicks without JavaScript](#8-remembering-clicks-without-javascript)
9. [A tour of every page](#9-a-tour-of-every-page)
10. [Accessibility: a site for everyone](#10-accessibility-a-site-for-everyone)
11. [Try it yourself: challenges](#11-try-it-yourself-challenges)
12. [Glossary](#12-glossary)
13. [Credits](#13-credits)

---

## 1. Opening the site

1. Open the `pokemon` folder.
2. Double-click **`index.html`**. It opens in your web browser.
3. That's it! Click around.

**The YouTube video needs a real web address.** YouTube won't play embedded videos on a page opened by double-clicking (a `file://` address). It plays fine on the live website, or when you open the folder with a local server such as the “Live Server” extension in VS Code.

**You need the internet** for the Pokémon pictures, the Pokémon cries, the fonts and the YouTube video. They are loaded from other websites (see [Credits](#13-credits)). The flower video is stored in this folder, so it works offline.

**Use a modern browser.** The newest Chrome, Edge, Firefox or Safari will show everything. A few very new tricks (page transitions and scroll-linked animations) only appear in some browsers. The site still works without them; you just miss a little sparkle.

**To see the code of any page**, press <kbd>Ctrl</kbd> + <kbd>U</kbd> in the browser. To explore a page live, press <kbd>F12</kbd> to open the Developer Tools. Click the arrow icon, then click anything on the page to see its HTML and CSS.

**To edit the site**, open any file in a code editor such as [Visual Studio Code](https://code.visualstudio.com/). Save the file, then refresh the browser to see your change.

---

## 2. What's in the folder

```
pokemon/
├── index.html          Home: the moving scene, starter picker and route map
├── pokedex.html        63 Pokémon cards with filters, sorting and flip-over stats
├── types.html          The 18 types and the full type chart
├── evolution.html      The evolution lab and Eevee's eight evolutions
├── regions.html        All nine regions, plus Kanto's eight gyms
├── arcade.html         The game menu
├── quiz.html           Game 1: Who's That Pokémon?
├── battle.html         Game 2: Pikachu vs Gyarados
├── catch.html          Game 3: Safari Catch
├── theater.html        Video, audio, iframe, picture and image map
├── academy.html        The Trainer Academy sign-up form
├── trainer-card.html   The printable trainer card (the form sends you here)
├── workshop.html       Behind the scenes, with live labs for learning and teaching
├── teachers.html       Lesson plans for teachers
├── handbook.html       The Kids' Handbook (read online)
├── handbook.pdf        The Kids' Handbook (to download and print)
├── worksheets.html     Eight worksheets and an answer key (view online)
├── worksheets.pdf      The same worksheets, ready to print
├── guide.html          This guide, as a web page
│
├── css/
│   ├── base.css        Shared by EVERY page: colours, fonts, header, footer, buttons
│   ├── badges.css      The 8 gym badges drawn in CSS (regions + trainer card)
│   ├── games.css       Shared by the 3 games: game screen, message box, confetti
│   ├── home.css        Only for index.html
│   ├── pokedex.css     Only for pokedex.html
│   ├── types.css       Only for types.html
│   ├── evolution.css   Only for evolution.html
│   ├── regions.css     Only for regions.html
│   ├── arcade.css      Only for arcade.html
│   ├── quiz.css        Only for quiz.html
│   ├── battle.css      Only for battle.html
│   ├── catch.css       Only for catch.html
│   ├── theater.css     Only for theater.html
│   ├── academy.css     Only for academy.html
│   ├── card.css        Only for trainer-card.html
│   ├── workshop.css    Only for workshop.html
│   ├── teachers.css    Only for teachers.html
│   ├── handbook.css    Only for handbook.html (with print styles for the PDF)
│   ├── worksheets.css  Only for worksheets.html (one A4 sheet per worksheet)
│   └── guide.css       Only for guide.html
│
├── js/                 The only JavaScript, in four small files
│   ├── academy.js      Keeps your trainer photo for the card
│   ├── card.js         Fills in the trainer card and makes the PDF
│   ├── workshop.js     Powers the Workshop labs marked "JS"
│   └── handbook.js     Draws the handbook's diagrams with Mermaid
│
├── media/
│   ├── flower.webm     The flower video (WebM format)
│   ├── flower.mp4      The same video (MP4 format, for other browsers)
│   └── flower.vtt      Captions for the video
│
└── learn.md            This guide
```

### Why so many files?

- **One HTML file per page.** Each page has its own address, so you can bookmark it and use the browser's Back button. Small files are also easier to read.
- **One shared stylesheet plus one per page.** `base.css` holds everything the pages have in common, so the header looks the same everywhere. Each page then adds its own small stylesheet. If you want to change the Pokédex, open `pokedex.css` and you won't break the battle game.
- **Shared pieces get their own file.** The badges appear on two pages, so they live in `badges.css`, and both pages link to it.

Every page links to its stylesheets in its `<head>`:

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/pokedex.css">
```

The order matters: `base.css` comes first, then the page's own file.

### "Why is the header copied into every page?"

HTML has no built-in way to say "put the header file here". Websites usually use a server or JavaScript to join pages together. AshTech uses neither, so each page has its own copy of the header and footer. If you change the menu, change it in every page. (That's one of the reasons real websites use extra tools!)

---

## 3. How the site was planned

A good website starts before the first line of code. Here is how AshTech was planned.

### Step 1: who is it for, and what is it for?

- **Who:** kids who like Pokémon and are learning about the web.
- **What:** a place to explore Pokémon facts and play, where every part also shows off an HTML or CSS feature.
- **The rule:** HTML and CSS only.

### Step 2: pick a look that belongs to Pokémon

Instead of a generic "website look", the design is taken from things in the Pokémon world:

- **The header is a Pokédex.** It's red like the real device, and has the big blue glowing lens and three little lights.
- **The pages are a researcher's notebook.** The pale blue background has a grid drawn on it, like graph paper.
- **Boxes look like stickers or trading cards.** They have thick navy outlines and a solid "hard" shadow.
- **Titles look like the Pokémon logo:** yellow letters with a thick blue outline.
- **The name "AshTech"** is a nod to Ash, the most famous Pokémon trainer of all, plus the tech you learn here.

### Step 3: design tokens

**Tokens** are the few basic decisions everything else is built from. In AshTech they are stored as CSS variables at the top of `base.css`.

**Colours** (from the Pokédex and the Pokémon logo):

| Name | Colour | Used for |
|---|---|---|
| `--red` | `#e3350d` | The Pokédex header, important buttons |
| `--yellow` | `#ffcb05` | Title letters, main buttons, highlights |
| `--logo-blue` | `#3c5aa6` | The outline around title letters |
| `--ink` | `#1b2a55` | Text, outlines and shadows (our "black") |
| `--grass` | `#4fa64a` | Tall grass and success messages |
| `--sky` | `#eef6ff` | The notebook-paper background |

There is also one colour for each of the 18 Pokémon types, like `--t-fire` and `--t-water`.

**Fonts:**

- **Lilita One** for headings. It's chunky and round, like a toy label.
- **Lexend** for reading. It was designed to make reading easier, which is great for young readers.
- **Press Start 2P** appears only inside the game screens, to look like the old Game Boy games.

**Sizes:** text sizes grow step by step. Each step is 1.25 times bigger than the one before (`--step-0`, `--step-1`…). Spacing works the same way (`--space-s`, `--space-m`, `--space-l`…).

### Step 4: build, test, fix

The pages were built one at a time. Each was tested in a browser at desktop size and phone size, and each game was played to check that it really works. Bugs were found and fixed along the way. (One of them taught a useful lesson: see [the counter gotcha](#gotcha-counters-skip-hidden-things).)

---

## 4. HTML basics

**HTML** (HyperText Markup Language) describes what things on a page **are**: a heading, a paragraph, a picture, a link, a button.

### Tags and elements

HTML is made of **tags** written in angle brackets:

```html
<p>Pikachu is an Electric-type Pokémon.</p>
```

- `<p>` is the **opening tag**. `p` means "paragraph".
- `</p>` is the **closing tag**. The `/` means "end".
- Everything from the opening tag to the closing tag is one **element**.

Some elements have no content, so they have no closing tag. They are called **empty** or **void** elements:

```html
<img src="pikachu.png" alt="Pikachu">
<br>
<input type="checkbox">
```

### Attributes

**Attributes** give extra information. They go inside the opening tag, as `name="value"`:

```html
<a href="pokedex.html" class="btn">Open the Pokédex</a>
```

- `href` says where the link goes.
- `class` gives the element a name that CSS can use.

Attributes you'll see everywhere in AshTech:

| Attribute | What it does |
|---|---|
| `id="…"` | A unique name. Only ONE element per page can have each id. |
| `class="…"` | A group name. Many elements can share a class, and one element can have several (`class="btn btn--light"`). |
| `style="…"` | CSS written straight onto one element. AshTech uses it only to set variables, like `style="--c: var(--t-fire);"`. |
| `lang="…"` | The language of the text. `<html lang="en">` means English. |
| `alt="…"` | A text description of a picture, for people who can't see it. |
| `hidden`, `required`, `checked` | "Boolean" attributes: just being there switches them on. |
| `aria-…` | Extra information for screen readers (see [Accessibility](#10-accessibility-a-site-for-everyone)). |
| `data-…` | Your own custom information. The type badges use `data-type="fire"`. |

### Nesting

Elements go inside other elements, like boxes in boxes. Close them in the reverse order you opened them:

```html
<p>I <strong>love</strong> Eevee.</p>        ✔ correct
<p>I <strong>love</p> Eevee.</strong>        ✘ tangled
```

### Comments

Anything between `<!--` and `-->` is a **comment**. The browser ignores it. Comments are notes for humans, and AshTech's pages are full of them:

```html
<!-- The whole game is one form. -->
```

### The skeleton of every page

Every page in AshTech starts like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A short summary for search engines.">
  <meta name="theme-color" content="#e3350d">
  <title>Pokédex | AshTech</title>
  <link rel="icon" type="image/png" href="…poke-ball.png">
  <link rel="stylesheet" href="css/base.css">
</head>
<body>
  <header>…</header>
  <main id="main">…</main>
  <footer>…</footer>
</body>
</html>
```

- `<!DOCTYPE html>` tells the browser "this is modern HTML".
- `<html>` wraps the whole page.
- `<head>` holds information **about** the page. Nothing in it appears on the page itself.
- `<body>` holds everything you can see.

---

## 5. Every HTML tag used in AshTech

The tables below list every tag the site uses, what it means, and where to find it.

### 5.1 Document and head tags

| Tag | What it's for | Where |
|---|---|---|
| `<!DOCTYPE html>` | Says "this is an HTML5 page". Always the very first line. | every page |
| `<html>` | The root that wraps everything. `lang="en"` sets the language. | every page |
| `<head>` | Information about the page. | every page |
| `<meta charset="UTF-8">` | Lets the page use any letter or symbol, like é in Pokémon or ピカチュウ. | every page |
| `<meta name="viewport">` | Makes the page fit phone screens instead of looking tiny. | every page |
| `<meta name="description">` | The summary search engines show. | every page |
| `<meta name="theme-color">` | Tints the browser bar red on some phones. | every page |
| `<title>` | The name in the browser tab and in bookmarks. | every page |
| `<link rel="stylesheet">` | Loads a CSS file. | every page |
| `<link rel="icon">` | The little tab icon (a Poké Ball). | every page |
| `<link rel="preconnect">` | Starts connecting to the font server early, so fonts load faster. | every page |

### 5.2 Page structure (landmarks)

These tags split a page into meaningful areas. Screen readers let people jump between them.

| Tag | What it's for | Where |
|---|---|---|
| `<header>` | The top of the page, or the top of a section. | the red Pokédex bar; each page's title block |
| `<nav>` | A group of navigation links. | the main menu, the footer links, the region timeline |
| `<main>` | The main content. Only one per page. | every page |
| `<section>` | A themed part of a page, usually with a heading. | every page |
| `<article>` | Something that makes sense on its own, like a card or a post. | Pokédex cards, evolution chains, spotlight slides, region cards |
| `<aside>` | Extra content on the side. | the fact ticker, game "How it works" boxes, Academy tips |
| `<footer>` | The bottom of a page or section. | the tall-grass footer; quote credits |
| `<address>` | Contact information. | the footer |
| `<search>` | Marks a search area. | the Bulbapedia search on the Pokédex |
| `<div>` | A plain box with no meaning, used for layout. | everywhere |
| `<span>` | A plain inline box with no meaning, used for styling. | everywhere |

### 5.3 Headings and blocks of text

| Tag | What it's for | Where |
|---|---|---|
| `<h1>`…`<h6>` | Headings. `<h1>` is the page title (one per page), `<h2>` for sections, `<h3>` inside those. Never skip a level. | every page (AshTech uses h1–h3) |
| `<p>` | A paragraph. | everywhere |
| `<blockquote>` | A long quotation. `cite="…"` can hold the web address it came from. | Pokédex entries; Professor Oak's quote on Regions |
| `<pre>` | Preformatted text: spaces and line breaks are kept exactly. | code examples on Arcade and Workshop |
| `<hr>` | A change of topic. Ours is styled as a row of Poké Balls. | Workshop |
| `<br>` | A line break inside text, like in a poem or an address. | footer address, Workshop |

### 5.4 Tags that give words meaning

These go around words inside a paragraph. The Workshop page has a live table of all of them.

| Tag | What it means | Example |
|---|---|---|
| `<strong>` | Very important | Never wake a sleeping **Snorlax**! |
| `<em>` | Say it with emphasis | I *love* Eevee. |
| `<b>` | Stand out, without extra importance | Pokémon names in paragraphs |
| `<i>` | A different voice, like a foreign word | *Pikachū* (with `lang="ja"`) |
| `<u>` | A marked word, like a spelling mistake | Pikachoo |
| `<s>` | No longer true | ~~10 coins~~ Sold out! |
| `<mark>` | Highlighted | Water beats Fire |
| `<small>` | Small print | the footer and credits |
| `<del>` / `<ins>` | Deleted / inserted text | There are ~~17~~ 18 types |
| `<sub>` / `<sup>` | Lower / higher text | H₂O, 2ⁿᵈ |
| `<abbr title="…">` | An abbreviation. Hover to see the full words. | HP, STAB, Sp. Atk |
| `<dfn>` | The term being defined | "That's called *evolution*" |
| `<q>` | A short quote. The browser adds the quote marks. | "Gotta catch 'em all!" |
| `<cite>` | The title of a work | *Pokémon Red and Blue* |
| `<code>` | Computer code | `<p>` |
| `<kbd>` | Keys to press | <kbd>Ctrl</kbd> + <kbd>U</kbd> |
| `<samp>` | What a computer prints | `Saved!` |
| `<var>` | A variable in maths or code | damage = *power* × *bonus* |
| `<time datetime="…">` | A date that computers can read | `<time datetime="1996-02-27">1996</time>` |
| `<data value="…">` | A number or code that computers can read | Pokédex numbers on cards |
| `<ruby>`, `<rt>`, `<rp>` | Small reading help above letters, used in Japanese | ピカチュウ with "Pikachū" above it |
| `<wbr>` | "The line may break here" | a very long word on Workshop |
| `<bdi>` / `<bdo>` | Right-to-left text, like Arabic | Workshop |

### 5.5 Lists

| Tag | What it's for | Where |
|---|---|---|
| `<ul>` + `<li>` | An **unordered** list, where order doesn't matter. | menus, cards, tiles |
| `<ol>` + `<li>` | An **ordered** list, where order matters: steps, rankings, timelines. | the eight gyms (you beat them in order); evolution steps; the region timeline; the "Start with three" rules |
| `<dl>`, `<dt>`, `<dd>` | A **description list**: terms and their descriptions. | Height/Weight on cards; the glossary on Types; the trainer card |

### 5.6 Links

```html
<a href="pokedex.html">Pokédex</a>                  a page in the same folder
<a href="#fact-ears">Ears</a>                       a spot on the same page (the element with id="fact-ears")
<a href="https://pokeapi.co">PokéAPI</a>            another website
<a href="mailto:professor@ashtech.example">…</a>  opens an email program
```

- `aria-current="page"` marks the menu link for the page you're on. CSS uses it to colour that link yellow.
- `target="_blank"` opens a link in a new tab. The Bulbapedia search uses it.

### 5.7 Pictures, video and sound

| Tag | What it's for | Where |
|---|---|---|
| `<img>` | A picture. Always give `alt` text. Give `width` and `height` so the page doesn't jump while loading. `loading="lazy"` waits until you scroll near it. | everywhere |
| `<picture>` + `<source>` | Several versions of one picture. The browser picks the first `<source>` whose `media` condition matches. | Theater: Charizard becomes a pixel sprite on small screens |
| `<figure>` + `<figcaption>` | A picture or media with a caption. | the flower video, the cry lab |
| `<video>` | Plays a video. `controls` shows the buttons, `preload="metadata"` loads only the length at first, and `playsinline` stops phones going full screen. | Theater |
| `<source>` (inside video/audio) | One file choice. We give WebM *and* MP4 so every browser finds one it can play. | Theater, Pokédex |
| `<track>` | Captions or subtitles, stored in a `.vtt` file. | `media/flower.vtt` |
| `<audio>` | Plays sound. | Pokémon cries in the Pokédex and the cry lab |
| `<iframe>` | A window showing another web page inside ours. | the YouTube video inside the CSS TV |
| `<map>` + `<area>` | An **image map**: clickable areas on one picture. `shape` can be `rect`, `circle` or `poly`, and `coords` are pixel positions. | Theater: "Pikachu up close" |

Text inside `<video>` or `<audio>` (like "Your browser can't play this sound") only shows if the browser can't play the media. It's a **fallback**.

### 5.8 Tables

Tables are for data with rows and columns, never for page layout.

```html
<table>
  <caption>What the table is about</caption>
  <colgroup> <col> <col span="18"> </colgroup>
  <thead>  <tr> <th scope="col">Column heading</th> … </tr> </thead>
  <tbody>  <tr> <th scope="row">Row heading</th> <td>Cell</td> … </tr> </tbody>
  <tfoot>  <tr> <td colspan="19">A footer across all 19 columns</td> </tr> </tfoot>
</table>
```

| Tag or attribute | What it's for | Where |
|---|---|---|
| `<table>` | The table itself. | type chart, Pokédex stats, ways to evolve, Workshop |
| `<caption>` | The table's title. | all tables |
| `<thead>`, `<tbody>`, `<tfoot>` | The head, body and foot rows. | type chart |
| `<tr>` | A table row. | all tables |
| `<th>` | A heading cell. `scope="col"` or `scope="row"` says which cells it heads. | all tables |
| `<td>` | A data cell. | all tables |
| `<colgroup>`, `<col>` | Groups of columns. | type chart |
| `colspan` / `rowspan` | Make one cell stretch across several columns or rows. | type chart footer (`colspan`), "Ways to evolve" (`rowspan="2"`) |

### 5.9 Forms

Forms collect answers. The Academy page uses almost every kind of form control.

```html
<form action="trainer-card.html" method="get">
  <label for="name">Trainer name</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Get my trainer card</button>
</form>
```

- `action` is the page that opens when you submit.
- `method="get"` puts the answers in the address bar, like `trainer-card.html?name=Ash`. Look for them after you submit!
- `name` is the label each answer gets when it's sent.
- **Every input needs a `<label>`.** The label's `for` must match the input's `id`. Clicking a label clicks its input, and screen readers read the label aloud.

| Tag | What it's for | Where |
|---|---|---|
| `<form>` | Wraps the controls. | Academy, the games, the Pokédex filters |
| `<fieldset>` + `<legend>` | Groups related controls, with a title. | Academy steps, filter groups, game menus |
| `<label>` | The name of a control. It's also the secret of every game (see [section 8](#8-remembering-clicks-without-javascript)). | everywhere |
| `<input>` | A single control. Its `type` decides what kind (see below). | everywhere |
| `<select>` + `<option>` | A drop-down list. | Hometown |
| `<optgroup>` | A labelled group inside a drop-down. | Hometown, grouped by region |
| `<datalist>` | Suggestions for an input, linked with `list="…"`. | Favourite Pokémon (type "Pi"…) and the bravery slider |
| `<textarea>` | Multi-line text. | "Tell us about your dream team" |
| `<button>` | A button. `type="submit"` sends the form, `type="reset"` clears it, `type="button"` does nothing by itself. | Academy, the games |
| `<meter>` | A measurement in a known range. `low`, `high` and `optimum` change its colour. | base stats on Pokédex cards |
| `<progress>` | How far along something is. | "Pokédex seen" on the trainer card |

**Input types used in AshTech:** `text`, `number`, `date`, `email`, `url`, `color`, `range`, `time`, `month`, `file`, `search`, `checkbox`, `radio` and `hidden`.

**Rules the browser checks for you:**

| Attribute | Rule | Example |
|---|---|---|
| `required` | Must be filled in | Trainer name |
| `minlength` / `maxlength` | Shortest / longest text | name: 2 to 20 letters |
| `min` / `max` | Smallest / largest number or date | age: 5 to 16 |
| `pattern` | Must match a pattern | trainer ID: `[0-9]{5}` means exactly five digits |
| `type="email"` / `type="url"` | Must look like an email / web address | grown-up's email |
| `accept` | Which files can be chosen | `accept="image/*"` means pictures only |

Other helpful attributes: `placeholder` (grey hint text), `autocomplete`, `inputmode="numeric"` (a number keypad on phones), `step`, and `value` (the starting value).

### 5.10 Interactive tags

| Tag or attribute | What it's for | Where |
|---|---|---|
| `<details>` + `<summary>` | A box that opens and closes by itself. `name="faq"` makes a group where only one is open at a time. | "Questions trainers ask" on Types |
| `popover` + `popovertarget` | A pop-up that opens when you click a button. No JavaScript needed! | "Read entry" on every Pokédex card |

### 5.11 Tags we didn't use (and why)

- `<dialog>`: a pop-up box. Opening it as a proper modal needs JavaScript, so we used `popover` instead.
- `<svg>`: vector drawings. SVG is its own language, so every shape on the site is drawn with CSS instead. (The handbook's diagrams do become SVG, but the Mermaid library makes them, not us.)
- `<template>`, `<slot>`: only useful for bigger JavaScript projects.
- `<object>`, `<embed>`: old ways to embed things. `<iframe>`, `<video>` and `<audio>` do it better.

And a few that only appear on the pages with JavaScript:

- `<script src="…" defer>`: loads a JavaScript file. `defer` means “wait until the page is ready”. It's in the `<head>` of the four pages that use JavaScript.
- `<noscript>`: shown only when JavaScript is switched off. The Code Lab uses it to explain why it's empty.
- `<output>`: shows a result that changes. The Workshop's sliders show their numbers in `<output>` tags.
- `<canvas>`: a drawing board made of pixels. `card.js` creates one (with JavaScript, not in the HTML) to paint the trainer card before turning it into a PDF.
- `input type="password"` and `type="tel"`: we don't ask kids for passwords or phone numbers!

---

## 6. CSS basics

**CSS** (Cascading Style Sheets) describes how things **look** and **move**: colours, sizes, layout and animation.

### A CSS rule

```css
.btn {
  background: yellow;
  border-radius: 999px;
}
```

- `.btn` is the **selector**: which elements to style.
- `background` is a **property**: what to change.
- `yellow` is the **value**: what to change it to.
- `property: value;` together is a **declaration**. The `{ }` hold the declarations.

### Three places CSS can live

1. **A separate file**, linked with `<link rel="stylesheet">`. This is the best choice, and AshTech does it for everything.
2. **A `<style>` tag** in the `<head>`. Not used here.
3. **A `style` attribute** on one element. AshTech only uses this to pass a variable, like `style="--c: var(--t-fire);"`.

### Comments

```css
/* This is a CSS comment. The browser ignores it. */
```

### Selectors

| Selector | Picks | Example in AshTech |
|---|---|---|
| `p` | every `<p>` (**type selector**) | text width in `base.css` |
| `.sticker` | everything with that **class** | the sticker boxes |
| `#main` | the one element with that **id** | the skip link target |
| `*` | everything (**universal**) | the reset in `base.css` |
| `[data-type="fire"]` | an **attribute** with an exact value | type badge colours |
| `[data-types~="fire"]` | an attribute that **contains the word** | Pokédex type filter |
| `a[href^="http"]` | an attribute that **starts with** | printing web addresses |
| `nav a` | `<a>` anywhere inside `<nav>` (**descendant**) | the menu |
| `.step > legend` | only direct children (**child**) | the Academy step titles |
| `input + label` | the element **right after** (**adjacent sibling**) | every game |
| `input ~ .grid` | **any later** sibling (**general sibling**) | the Pokédex |
| `h2, h3` | both (**selector list**) | |
| `:is(a, b) c` | a shorter way to write a list | Academy inputs |
| `:not(.right)` | everything **except** | wrong quiz answers |
| `:has(input:checked)` | a **parent that contains** something | the starter picker, quiz, battle |

**Pseudo-classes** pick elements in a certain **state**. They start with one colon:

`:hover` (pointed at), `:active` (being pressed), `:focus` / `:focus-visible` (reached with the keyboard), `:checked` (ticked), `:valid` / `:user-invalid` / `:user-valid` (form checks), `:placeholder-shown` (the box is empty), `:target` (named in the address after `#`), `:empty` (has nothing inside), `:popover-open`, `:playing` (audio playing), `:first-child`, `:last-child`, `:nth-child(odd)`, `:nth-child(-n + 2)`, `:nth-of-type(2)`, `:first-of-type` and `:last-of-type`.

**Pseudo-elements** style a **part** of an element, or add extra boxes. They start with two colons:

`::before` and `::after` (extra boxes; they need `content`), `::marker` (list bullets and numbers), `::placeholder`, `::selection` (highlighted text), `::first-letter`, `::first-line`, `::backdrop` (behind a popover), `::file-selector-button`, `::cue` (video captions), `::details-content`, `::-webkit-slider-thumb` (the range slider knob), `::-webkit-meter-optimum-value` and `::-webkit-progress-value`.

### The cascade: who wins?

When two rules disagree, the browser decides using these steps, in order:

1. **Importance.** `!important` wins. Use it very rarely. AshTech uses it for the reduced-motion rules and for `.visually-hidden`.
2. **Layers.** Rules in a later `@layer` beat rules in an earlier one (see below).
3. **Specificity.** More specific selectors win. An id beats a class, and a class beats a tag. Roughly: count the ids, then the classes/attributes/pseudo-classes, then the tags.
4. **Order.** If everything else is equal, the rule written last wins.

**Inheritance:** some properties, like `color` and `font-family`, pass from parents to children. That's why setting the font on `<body>` changes the whole page.

### Cascade layers: how AshTech stays tidy

The first line of `base.css` is:

```css
@layer reset, tokens, base, layout, components, pages, utilities;
```

This makes seven "drawers" and puts them in order. Every rule goes in a drawer:

```css
@layer components {
  .btn { … }
}
```

A rule in `pages` always beats a rule in `components`, however complicated the `components` selector is. So each page can safely change shared pieces without a specificity fight.

---

## 7. CSS, topic by topic

### 7.1 Custom properties (CSS variables)

```css
:root {
  --red: #e3350d;          /* make a variable */
}
.btn--red {
  background: var(--red);  /* use it */
}
```

- Change `--red` once, and it changes everywhere.
- Variables **inherit**, so a card can say `--c: var(--t-fire)` and everything inside it uses fire colours.
- `var(--x, orange)` uses `orange` if `--x` isn't set.
- Variables can hold numbers, and `calc()` can do maths with them. The battle game is built on this ([section 8.6](#86-doing-maths-in-css-the-battle-game)).
- **`@property`** registers a variable with a type, like `<angle>`. Then it can be **animated smoothly**. The rainbow ring around Eevee turns this way (`evolution.css`).

### 7.2 Units

| Unit | Means | Used for |
|---|---|---|
| `px` | screen pixels | borders, shadows |
| `rem` | the root font size (usually 16px) | text and spacing |
| `em` | this element's font size | the logo outline (`0.2em`) grows with the text |
| `%` | a percentage of the parent | widths, positions |
| `vw` / `vh` | 1% of the window width / height | the fluid title size |
| `dvh` | like `vh`, but correct on phones | page minimum height |
| `ch` | the width of the "0" character | text line length (`68ch`) |
| `fr` | a share of the free space in a grid | grid columns |
| `deg` / `turn` | angles | rotations |
| `s` / `ms` | seconds / milliseconds | animations |

### 7.3 Colours

AshTech writes colours in all these ways (see the Workshop's colour lab):

```css
#ffcb05                                  /* hex */
rgb(227 53 13)                           /* red, green, blue */
rgb(27 42 85 / 0.5)                      /* …with 50% see-through */
hsl(210 64% 45%)                         /* hue, saturation, lightness */
oklch(72% 0.17 135)                      /* a newer, smoother colour space */
color-mix(in srgb, var(--c) 45%, white)  /* mix two colours */
rebeccapurple                            /* a named colour */
transparent
```

**The HP bar trick:** `hsl(calc(var(--hp) * 1.2) 75% 45%)`. When HP is 100 the hue is 120 (green), and as HP drops the hue slides towards 0 (red).

### 7.4 The box model

Every element is a box made of four layers (the Workshop shows them in 3D):

```
┌──────────── margin (space outside) ────────────┐
│  ┌──────────── border ─────────────────────┐   │
│  │  ┌──────── padding (space inside) ───┐  │   │
│  │  │            content                │  │   │
│  │  └───────────────────────────────────┘  │   │
│  └─────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

`box-sizing: border-box` (set on everything in the reset) makes `width` include the padding and border. That makes sizes much easier to predict.

Related properties: `width`, `height`, `min-height`, `max-width`, `aspect-ratio` (Pokédex cards are `5 / 7`, like a trading card), `overflow` (`hidden`, `auto`, `clip`), and the logical properties `margin-inline`, `padding-block` and `inset`.

### 7.5 Display

- `display: block` takes the full width and starts a new line.
- `display: inline` flows inside text.
- `display: inline-block` flows like text, but can have a size.
- `display: none` removes the element completely.
- `display: flex` and `display: grid` are layout systems (next sections).

`visibility: hidden` hides an element but **keeps its space**. The quiz relies on this difference (see [the counter gotcha](#gotcha-counters-skip-hidden-things)).

### 7.6 Flexbox: lining things up

```css
.row {
  display: flex;
  justify-content: space-between;  /* along the row */
  align-items: center;             /* across the row */
  gap: 1rem;                       /* space between items */
  flex-wrap: wrap;                 /* allow new lines */
}
```

Try it live in the **Workshop's flexbox playground**. AshTech uses flexbox for the header, buttons, chips and the Safari scoreboard. `order` changes the visual order without changing the HTML (the Pokédex count and Safari scoreboard use this trick).

### 7.7 Grid: rows and columns

```css
.dex__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 2rem 1.25rem;
}
```

This one line of columns means: "fit as many columns as you can, each at least 210px wide, and share out the extra space." It's how the Pokédex fills any screen size without a single media query.

More grid tools used in AshTech:

- **Named areas.** The battle arena is laid out like a map:
  ```css
  grid-template-areas:
    "foeinfo foe"
    "me      meinfo";
  ```
  and then `grid-area: foe;` puts the enemy in its spot.
- **Stacking.** `grid-area: 1 / 1` on several children makes them sit on top of each other. The card faces, quiz rounds and evolution Pokémon all work this way.
- **Spanning.** `grid-row: span 2` stretches an item over two rows. That makes the zig-zag route on the home page.
- **Placement:** `justify-items`, `align-items`, `place-items: center` and `justify-self`.

Try it in the **Workshop's grid playground**.

### 7.8 Positioning

| Value | Behaviour | Example |
|---|---|---|
| `static` | normal (the default) | |
| `relative` | normal, but becomes the anchor for absolute children | the diorama |
| `absolute` | placed exactly, relative to the nearest positioned parent | clouds, Pikachu, sparkles |
| `fixed` | stuck to the window | the reading progress bar |
| `sticky` | scrolls normally, then sticks | the red header bar, the Academy submit bar |

Use `top`, `right`, `bottom`, `left` or `inset` to place things. `z-index` decides who's on top.

### 7.9 Typography

`font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`, `text-transform: capitalize` (type badges), `text-decoration` (wavy underlines on hover!), `text-underline-offset`, `white-space: nowrap`, and `text-wrap: balance`, which evens out heading lines.

**The logo lettering:**

```css
.logo-type {
  color: var(--yellow);
  -webkit-text-stroke: 0.2em var(--logo-blue);  /* an outline around each letter */
  paint-order: stroke fill;                     /* draw the outline BEHIND the fill */
  text-shadow: 0.05em 0.07em 0 var(--ink);      /* a solid shadow */
}
```

**Storybook drop cap** (Regions page):

```css
p:first-of-type::first-letter { float: left; font-size: 4.4em; }
p:first-of-type::first-line   { font-weight: 700; }
```

**Multi-column text:** `columns: 2 22rem;` makes two newspaper-style columns (Kanto section and footer links). `break-inside: avoid` stops a quote splitting between columns.

**Text around a circle:** `float: right` plus `shape-outside: circle(48%)` makes the Kanto text wrap around round Pikachu.

### 7.10 Backgrounds and gradients

You can stack many backgrounds, separated by commas. The first one is on top.

| Gradient | Example in AshTech |
|---|---|
| `linear-gradient(…)` | the sky in the diorama |
| `radial-gradient(…)` | the Pokédex lens, hills, spotlights |
| `conic-gradient(…)` | the sun's rays, the type wheel, the Thunder badge |
| `repeating-linear-gradient(…)` | the notebook grid, TV wood grain, scan lines |
| `repeating-conic-gradient(…)` | "Who's That Pokémon?" light rays |
| `repeating-radial-gradient(…)` | the Marsh badge rings |

The notebook paper is just two gradients, one horizontal and one vertical, repeated every 28px:

```css
background-image:
  linear-gradient(var(--grid) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid) 1px, transparent 1px);
background-size: 28px 28px;
```

**The CSS Poké Ball** is one element with hard colour stops (no fading):

```css
background: linear-gradient(to bottom, red 0 45%, navy 45% 55%, white 55% 100%);
border-radius: 50%;
```

Its white button is an `::after` circle in the middle.

### 7.11 Borders, corners and shadows

- `border: 3px solid var(--ink)`, plus `dashed` and `dotted` styles.
- `border-radius`: `50%` makes a circle, `999px` makes a pill, and `0 50% 50% 50%` makes a raindrop (the Cascade badge).
- `box-shadow: 6px 6px 0 var(--ink)` is the sticker's hard shadow. `inset` shadows go inside. Several shadows can be stacked with commas, and the confetti and sparkles are ONE tiny element copied many times with `box-shadow`!
- `outline` is like a border that doesn't take up space. It's used for focus rings.
- `filter: drop-shadow(…)` follows the shape of a transparent picture instead of its square box.

### 7.12 Shapes: clip-path and mask

`clip-path` cuts an element into a shape. Everything outside the shape disappears:

```css
clip-path: polygon(50% 0, 61% 26%, 85% 15%, …);   /* the Thunder badge star */
clip-path: ellipse(70% 60% at 30% 100%);          /* hills on the Regions page */
clip-path: circle(0% at 44px 38px);               /* the lens page transition */
clip-path: path("M32 58 L7 33 A13.5 …");          /* the Soul badge heart */
clip-path: inset(0 100% 0 0);                     /* the typing effect in games */
```

`mask` uses an image or gradient to hide parts of an element. The diorama sun fades out at its edges with a radial mask.

### 7.13 Transforms

`transform` (and the newer single properties `translate`, `rotate` and `scale`) move, turn and resize things **without** disturbing the layout:

```css
translate: 0 -12px;      /* move */
rotate: -4deg;           /* turn (the tilted logo) */
scale: 1.12;             /* resize */
transform: rotateY(180deg);        /* 3D: flip a Pokédex card */
```

**3D needs three helpers:**

- `perspective: 1000px` on the parent adds depth.
- `transform-style: preserve-3d` keeps children in 3D.
- `backface-visibility: hidden` hides a card's face when it's turned away.

**Placing things in a circle.** The type wheel spins each Pokémon to its angle, pushes it outwards, then spins it back upright:

```css
transform: rotate(calc(var(--i) * 120deg)) translateY(-120px) rotate(calc(var(--i) * -120deg));
```

The Eevee wheel does the same thing with **CSS trigonometry**:

```css
left: calc(50% + cos(var(--angle)) * var(--r));
top:  calc(50% + sin(var(--angle)) * var(--r));
```

### 7.14 Transitions: smooth changes

A **transition** animates between two states, like normal and hover:

```css
.btn {
  transition: transform 0.15s var(--ease-bounce), box-shadow 0.15s;
}
.btn:hover {
  transform: translateY(-3px);
}
```

`--ease-bounce` is `cubic-bezier(0.34, 1.56, 0.64, 1)`, a timing curve that overshoots a little, so buttons feel springy.

`transition-delay` waits before starting. The battle game's HP bars wait until the attack animation has played. `transition-behavior: allow-discrete` plus `@starting-style` let even pop-ups animate as they appear and disappear (the Pokédex entry popover).

### 7.15 Animations with @keyframes

A **keyframe animation** runs by itself, as many times as you like:

```css
@keyframes float {
  0%, 100% { translate: 0 0; }
  50%      { translate: 0 -12px; }
}
.page-head__art {
  animation: float 4s ease-in-out infinite;
}
```

| Property | What it controls | Example |
|---|---|---|
| `animation-name` | which `@keyframes` to use | `float` |
| `animation-duration` | how long one loop takes | `4s` |
| `animation-timing-function` | the speed curve | `ease-in-out`, `linear`, `steps(18)` |
| `animation-delay` | wait before starting | slideshow slides start 6s apart |
| `animation-iteration-count` | how many times | `infinite`, `3` (the Poké Ball wobbles 3 times) |
| `animation-direction` | forwards, backwards, or back and forth | `alternate` (swaying grass), `reverse` (type wheel) |
| `animation-fill-mode` | keep the first/last frame | `both`, `forwards` (Time's up!) |
| `animation-play-state` | pause or play | Safari waits for Start, the ticker pauses on hover |

**Some of the many animations in AshTech:** the glowing lens, blinking lights, drifting clouds, spinning sun, hopping Pikachu, Butterfree flying along a curved path (`offset-path`), swaying grass, peeking Pokémon, the logo drop, the fact ticker, the slideshow, card flips, the evolution flash, the spinning type wheel, cartridges lifting, lightning bolts, Poké Ball throws and wobbles, falling confetti, the badge shine and the shimmering trainer card.

**Motion paths:** `offset-path: path("M -60 140 C 80 20, …")` draws an invisible curve, and animating `offset-distance` from `0%` to `100%` makes Butterfree fly along it.

**Steps:** `steps(18)` jumps in 18 steps instead of moving smoothly. That makes the retro "typing" of the game text.

**Several animations at once:** separate them with commas:

```css
animation: throw 0.45s ease-out both, wobble 0.6s 0.5s ease-in-out 3;
```

### 7.16 Scroll effects

- `scroll-behavior: smooth` makes `#links` glide instead of jumping.
- `scroll-padding-top` stops the sticky header covering the target.
- **Scroll snap** makes the Regions track "click" each card into place:
  ```css
  .flight { scroll-snap-type: x mandatory; }
  .region { scroll-snap-align: center; }
  ```
- **Scroll-driven animations** link an animation to scrolling instead of time:
  ```css
  animation-timeline: scroll(root);     /* the reading bar at the top of long pages */
  animation-timeline: view(inline);     /* region cards grow as they slide in */
  ```
- `overscroll-behavior: contain` stops scrolling inside a box from scrolling the whole page.

### 7.17 Responsive design: every screen size

- **`@media` queries** change styles at different screen widths:
  ```css
  @media (max-width: 760px) {
    .hero { grid-template-columns: 1fr; }   /* stack on phones */
  }
  ```
- **`@container` queries** look at the width of a **box**, not the whole screen. Each Pokédex card is a container (`container-type: inline-size`), so a card shrinks its own text when IT is small, wherever it sits.
- **Fluid sizes** with `clamp(min, preferred, max)`: `font-size: clamp(2.6rem, 6.5vw, 4.8rem)` grows with the window but never gets too small or too big. `min()` and `max()` work in a similar way.
- The phone menu is a CSS-only "burger" button (see [section 8](#8-remembering-clicks-without-javascript)).

### 7.18 Other at-rules

| At-rule | What it does | Where |
|---|---|---|
| `@layer` | cascade layers | every CSS file |
| `@keyframes` | animations | everywhere |
| `@media` | screen size, `print`, `prefers-reduced-motion` | everywhere |
| `@container` | size of a parent box | `pokedex.css` |
| `@supports` | "only use this if the browser understands it" | reading bar in `base.css`; the checks at the bottom of the Workshop |
| `@property` | a typed, animatable variable | `evolution.css` |
| `@starting-style` | the "before" look for appearing elements | `pokedex.css` popover |
| `@view-transition` | animate between pages | `base.css` |
| `@page` | paper size and margins for printing | `card.css` |

(`@import` and `@font-face` also exist. We load fonts with a `<link>` to Google Fonts instead, which writes the `@font-face` rules for us.)

### 7.19 Page transitions

These two lines in `base.css` make the browser animate between pages:

```css
@view-transition { navigation: auto; }

::view-transition-new(root) {
  animation: lens-open 0.55s;   /* the new page grows out of the Pokédex lens */
}
```

The header has `view-transition-name: dex-top`, so it stays still while the page underneath changes. Browsers that don't support this yet just switch pages normally.

### 7.20 Styling form controls

- `accent-color: var(--red)` tints checkboxes, radios and sliders in one line.
- `appearance: none` removes the browser's own look, so you can draw your own (the Academy type checkboxes and the Poké Ball slider knob).
- `caret-color` colours the blinking text cursor.
- `resize: vertical` lets people drag a textarea taller but not wider.
- `::placeholder`, `::file-selector-button`, `::-webkit-slider-thumb`, `::-moz-range-thumb`, the `meter` and `progress` pseudo-elements.
- `:user-invalid` turns a box red only **after** someone has typed and left it.
- The floating label uses `input:not(:placeholder-shown) + label`: if the placeholder isn't showing, there's text in the box, so the label floats up.

### 7.21 Printing

`@media print` changes how the page looks on paper. `base.css` hides the header and footer and prints web addresses after links:

```css
a[href^="http"]::after { content: " (" attr(href) ")"; }
```

The trainer card page prints only the card, on a landscape page, with its colours kept (`print-color-adjust: exact`).

---

## 8. Remembering clicks without JavaScript

Normally a web page needs JavaScript to remember what you clicked. AshTech's games, filters and buttons use a few clever CSS tricks instead. This is the most important part of the guide!

### 8.1 The label trick

A `<label>` with `for="x"` clicks the input with `id="x"`, **even if that input is hidden**:

```html
<input type="checkbox" id="light" class="visually-hidden">
<label for="light">Switch</label>
<div class="bulb"></div>
```

Now the label is the button, and the checkbox quietly remembers whether it's on or off.

### 8.2 `:checked` plus siblings

```css
#light:checked ~ .bulb { background: yellow; }
```

"When the checkbox is ticked, find a `.bulb` that comes after it, and light it up." This is the demo on the Arcade page.

- `+` means "the very next sibling".
- `~` means "any later sibling".

**The catch:** these only look forwards and sideways, never up or back. That's why the hidden inputs are always written **first** in the HTML.

**Checkbox or radio?**

- A **checkbox** remembers on/off: menus, card flips, "caught!", "Show in 3D".
- **Radios** with the same `name` remember **one choice out of many**: filters, quiz answers, battle moves, evolution stages.

Where you'll find this trick:

- The phone menu (`#nav-toggle:checked ~ .site-nav`).
- The Pokédex card flip (`.flip:checked + .card__inner`).
- The Pokédex filters: `#f-fire:checked ~ .dex__grid .card:not([data-types~="fire"]) { display: none; }`.
- The Pokédex sorting: `#s-weight:checked ~ .dex__grid .card { order: var(--w); }`. Each card carries its own weight as a variable!

### 8.3 `:has()`: the parent selector

`:has()` lets a parent react to what's inside it, so the input can be anywhere:

```css
.partner:has(#p-charmander:checked) { --partner: var(--t-fire); }
```

"If the partner section **has** a checked Charmander radio, turn the table fire-coloured." It's used on the home page, quiz, battle, catch game, evolution lab and Workshop labs.

`:has()` can count, too. "There is no round without a right answer" means a perfect score:

```css
.quiz:not(:has(.round:not(:has(.right:checked)))) .results__perfect { display: block; }
```

### 8.4 Counters: CSS can count

```css
.quiz         { counter-reset: score; }          /* start at 0 */
.right:checked { counter-increment: score; }     /* +1 for each right answer */
.results__num::before { content: counter(score); } /* show the number */
```

Used for the quiz score, the number of Pokémon shown in the Pokédex, the Pokémon caught in Safari, the Academy progress, the gym numbers and the evolution step numbers.

**The counter must be shown AFTER the things it counts** in the HTML. When the scoreboard needs to be at the top, it's written at the bottom and moved up with the `order` property (Safari and the Pokédex).

<a id="gotcha-counters-skip-hidden-things"></a>
#### Gotcha! Counters skip hidden things

At first the quiz always said "0 out of 8". Why? The finished rounds were hidden with `display: none`, and **counters skip elements that aren't displayed**. The fix was to hide finished rounds with `visibility: hidden` instead. They're still invisible, but they still count. (The Pokédex count uses this on purpose: hidden cards *shouldn't* be counted.)

### 8.5 Restarting an animation

An animation plays again when an element **appears** (goes from `display: none` to shown), or when its `animation-name` **changes**.

- **Evolution:** each new Pokémon image starts hidden, so it plays the "evolve" flash as it appears.
- **Battle:** Gyarados flinches with `flinch-a` on odd turns and `flinch-b` on even turns. Two identical animations with different names, so it replays every turn.

### 8.6 Doing maths in CSS: the battle game

The battle game stores its whole "brain" in CSS variables (`battle.css`):

```css
.battle:has(#t1-tb:checked) { --d1: 60; }   /* Thunderbolt on turn 1 does 60 damage */

.battle {
  --s4: calc(var(--d1) + var(--d2) + var(--d3) + var(--d4));  /* total damage */
  --foe-hp: max(0, 100 - var(--s4));                          /* Gyarados' HP */
  --gone: calc(1 - clamp(0, 100 - var(--s4), 1));             /* 1 = fainted */
}

.hp__bar::before { width: calc(var(--hp) * 1%); }             /* the HP bar */
.foe__mon { opacity: calc(1 - var(--gone)); }                 /* fade away when fainted */
.ending--win { scale: var(--gone); }                          /* show the win screen */
```

`clamp(0, x, 1)` squashes any number into 0 or 1, so the numbers work like yes/no switches. The HP number is even written by CSS: `counter-reset: hp var(--me-hp)`, then `content: counter(hp)`.

### 8.7 Other no-JavaScript helpers

- **`:target`** styles the element named after `#` in the address. The Pikachu image map links to `#fact-ears`, and that fact lights up.
- **`popover`** opens a pop-up from a button with `popovertarget="…"`. The browser handles closing it (click outside or press <kbd>Esc</kbd>).
- **`<details>`** opens and closes by itself.
- **`<button type="reset">`** puts every input in a form back to the start. That's "Play again" in the quiz and battle.
- **A link to the same page** (`href="catch.html"`) reloads it, which restarts every animation. That's "Play again" in Safari Catch.
- **`animation-play-state: paused`** freezes the Safari game until Start is ticked.

### What CSS still can't do

CSS can't read what you **type**, can't make a new **file**, can't remember anything after you leave the page, and can't pick **random** numbers. That's why Pokémon in Safari pop up in a set pattern. For the few jobs AshTech really needed, we used JavaScript.

### 8.8 When we DO use JavaScript

JavaScript is the third language of the web. If HTML is the skeleton and CSS is the clothes, JavaScript is the muscles. AshTech uses it in exactly four places, and every page that does has a yellow **“Why JavaScript here?”** box explaining it.

| File | Page | What it does | Why HTML and CSS couldn't |
|---|---|---|---|
| `js/academy.js` | Academy | Shrinks your trainer photo and keeps it in the browser's `sessionStorage` | A photo is too big to travel in the address bar |
| `js/card.js` | Trainer Card | Reads your answers from the address bar, writes them on the card, paints the card on a `<canvas>` and builds a real PDF file | CSS can't read the address bar or make files |
| `js/workshop.js` | Workshop | Powers the Code Lab, Measure the box, Selector Detective, Specificity Showdown, Colour Mixer, Move Studio and the Present buttons | These react to typing and sliders instantly |
| `js/handbook.js` | Kids' Handbook | Loads Mermaid, which turns text like `A --> B` into diagrams | Drawing arrows between boxes needs calculations |

Every script follows the same three steps. Look for them when you read the code:

```js
const button = document.querySelector('#download-card');   // 1. find a part of the page
button.addEventListener('click', () => {                     // 2. wait for something to happen
  status.textContent = 'Drawing your card…';                 // 3. change the page
});
```

A few safety habits you'll spot in the code:

- **`textContent`, not `innerHTML`**, for anything a person typed. Then a name like `<b>Ash</b>` stays as plain letters and can't turn into HTML.
- **Checking values** before using them. The team colour must look like `#e3350d`, or it isn't used.
- **The Code Lab preview is a `sandbox`ed `<iframe>`**, so nothing typed into it can run scripts.
- **Nothing leaves your computer.** There are no trackers, and nothing is uploaded anywhere.

**How the PDF is made, without any library:** a PDF file is text plus bytes, arranged as numbered “objects” (a catalogue, a page list, one page, a picture, and drawing instructions), then an index called `xref` that says where each object starts. `card.js` writes those pieces by hand, puts the card picture inside as a JPEG, and hands you the file. Open `js/card.js` and find `makePdf` to see all of it in about 50 lines!

---

## 9. A tour of every page

### Home (`index.html`, `home.css`)

- **The diorama:** a whole scene built from positioned `<div>`s and gradients. The sun spins, clouds drift (`::before`/`::after` make their puffs), Pikachu hops with squash-and-stretch, Butterfree follows an `offset-path`, Bulbasaur peeks from the grass, and a CSS Poké Ball wobbles. `role="img"` and `aria-label` describe the scene for screen readers.
- **Choose your partner:** three radios hidden behind Poké Ball labels. When one is checked, its lid rotates open (`transform-origin` sets the hinge), the Pokémon pops out, the table changes colour through `:has()`, and a message fades in.
- **The fact ticker:** a list written twice, slid left by exactly 50% forever, so it loops without a gap.
- **Places along the route:** a zig-zag grid (`grid-row: n / span 2`) along a dashed dirt path. On phones it becomes one column.
- **Spotlight:** five slides stacked on top of each other, each with the same animation but a different `animation-delay`.

### Pokédex (`pokedex.html`, `pokedex.css`)

- 63 cards, each an `<article>` inside a `<li>`, with the Pokédex number in `<data>`.
- Type filters and sorting (hidden radios, `~`, attribute selectors, `order`).
- 3D card flips (a checkbox, `rotateY`, `backface-visibility`).
- Base stats in a `<table>` with coloured `<meter>` bars.
- "Read entry" opens a `popover` with the Japanese name in `<ruby>`, a `<blockquote>`, and the Pokémon's cry in `<audio>`.
- A live count made with a CSS counter.
- A real, working `<search>` form that sends you to Bulbapedia.

### Types (`types.html`, `types.css`)

- A turning wheel of the three starter types (conic gradient, rotations, `reverse` animations).
- 18 type tiles with pixel sprites (`image-rendering: pixelated` keeps them crisp).
- The full 18×18 type chart: `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tfoot>`, `colspan`, sticky headers, and a hover highlight for both the row AND the column (`:has()` with `:nth-child()`).
- A `<dl>` glossary with `<dfn>`.
- An FAQ of `<details>` that open smoothly (`interpolate-size` and `::details-content`).

### Evolution (`evolution.html`, `evolution.css`)

- Seven evolution chains. Hidden radios remember the stage, and each new stage plays the white flashing "evolve" animation, sparkles and the "What? … is evolving!" message.
- The steps are an `<ol>` numbered with a CSS counter, lit up with `:nth-child(-n + 2)`.
- Eevee's eight evolutions placed around a circle with `cos()` and `sin()`, and a rainbow halo turned by an `@property` variable.
- A table with `rowspan` and zebra stripes (`:nth-child(even)`).

### Regions (`regions.html`, `badges.css`, `regions.css`)

- A timeline `<nav>` of `#links` using `<time>`.
- A sideways scroll-snap track of nine region cards, each with its own landscape colours passed in as variables, scroll-driven entry animations, and a `:target` highlight.
- A magazine layout: `columns`, a drop cap, `::first-line`, a floated circle with `shape-outside`, and a `<blockquote>` with `<cite>`.
- The eight Kanto gym badges, each drawn with a different CSS shape technique, with a shine on hover.

### Arcade and the three games

- **Arcade** (`arcade.html`, `arcade.css`): cartridges shaped with `clip-path` that lift on hover, plus a live light-switch demo of the checkbox trick.
- **Who's That Pokémon?** (`quiz.html`, `quiz.css`): `filter: brightness(0)` turns a picture into a black silhouette. Rounds appear one after another with `:has()` and `+`. The score is a CSS counter, and `<button type="reset">` restarts the game.
- **Battle!** (`battle.html`, `battle.css`): 16 hidden radios, CSS maths for HP, effects for each move, a Game Boy-style text box, and win/lose screens that appear through `scale`.
- **Safari Catch** (`catch.html`, `catch.css`): Pokémon pop up with their own speed and delay (`--dur` and `--delay` variables). `overflow: hidden` means a hiding Pokémon can't be clicked. A 40-second timer bar, and a "Time's up" panel with a 40-second `animation-delay`.

### Theater (`theater.html`, `theater.css`)

- A YouTube `<iframe>` inside a TV drawn in CSS: antennas made from pseudo-elements, wood grain, knobs that turn on hover, and scan lines with `pointer-events: none`.
- A `<video>` with two `<source>`s, a `<track>` of captions styled with `::cue`, inside a `<figure>`.
- The cry lab: eight `<audio>` players. The card bounces while its cry `:playing`.
- A `<picture>` that swaps to a 1996 pixel sprite on narrow screens.
- A Pikachu image map (`<map>`, `<area>`) that lights up facts with `:target`.

### Academy and Trainer Card (`academy.html`, `academy.css`, `trainer-card.html`, `card.css`)

- A three-step form using nearly every input type, with the browser's own checks.
- A floating label, red and green `:user-invalid`/`:user-valid` borders, custom checkboxes, a Poké Ball slider, and a styled file button.
- A sticky progress bar that fills as the must-do boxes are finished (`:valid`, counters and variables).
- The trainer card: your answers written onto `<dl>` lines, your photo or partner Pokémon, your team colour as a CSS variable, a `<progress>` and a `<meter>`, grey badges that light up on hover (`zoom` and `filter`), and a holographic shimmer.
- **Download my card (PDF)** paints the whole card on a canvas and saves it as a real PDF (see [section 8.8](#88-when-we-do-use-javascript)).

### Workshop (`workshop.html`, `workshop.css`, `workshop.js`)

A behind-the-scenes page made for learning AND teaching, with 13 labs:

- **CSS-only labs:** the anatomy of a tag, a 3D box model, flexbox and grid playgrounds that rewrite their own code with `::after { content: … }`, a table of selectors, a table of text tags, six ways to write a colour, and live `@supports` checks.
- **JavaScript labs** (marked JS): the **Code Lab** (edit HTML and CSS and see the result instantly), **Measure the box** (sliders and box maths), **Selector Detective** (eight missions), **Specificity Showdown**, the **Colour Mixer** with its “Match the type!” game, and the **Move Studio** for transforms and animations.
- Every lab has a green **For teachers** panel (a `<details>`), and a **Present** button that uses the Fullscreen API for projectors.

### Teachers, Handbook and Worksheets

- **Teachers** (`teachers.html`, `teachers.css`): eight 40-minute lesson plans, each with goals, pages to use, steps and an exit question, plus a curriculum table.
- **Kids' Handbook** (`handbook.html`, `handbook.css`, `handbook.js`): 16 short chapters, each built around a Mermaid diagram, with a quiz and a certificate. Its print styles (`@page`, `break-before: page`, page numbers in `@bottom-center`) turn the same page into `handbook.pdf`.
- **Worksheets** (`worksheets.html`, `worksheets.css`): one A4 sheet per lesson, sized in millimetres (`mm`), with writing lines made from a repeating gradient. The same page prints as `worksheets.pdf`.
- **Guide** (`guide.html`): this very file, `learn.md`, turned into a web page so it's easy to read in a browser.

---

## 10. Accessibility: a site for everyone

Some visitors can't see well, can't use a mouse, or get dizzy from motion. AshTech is built for them too.

- **Real tags for real things.** Buttons are `<button>` or `<label>`, lists are lists, and headings go in order. Screen readers understand the page because of this.
- **`alt` text on every picture.** Pictures that are only decoration get `alt=""`, so screen readers skip them.
- **Labels for every form control.**
- **A skip link.** Press <kbd>Tab</kbd> on any page and "Skip to content" appears first.
- **Visible focus.** Everything you can reach with <kbd>Tab</kbd> gets a thick yellow-and-navy ring (`:focus-visible`). Hidden radios pass their focus ring to their label, for example `input:focus-visible + label`.
- **`.visually-hidden`** hides things from eyes but not from screen readers. It's used for the hidden game inputs and extra labels.
- **ARIA:**
  - `aria-label` names something that has no visible text.
  - `aria-labelledby` points to the heading that names a section.
  - `aria-describedby` links a hint to its input.
  - `aria-hidden="true"` hides decorations from screen readers.
  - `aria-current="page"` marks the current page in the menu.
  - `aria-live="polite"` announces messages that change.
  - `role="img"` treats the CSS diorama as one picture.
  - `role="region"` with `tabindex="0"` lets keyboard users scroll the wide type chart.
- **Less motion.** People can switch on "reduce motion" on their computer or phone. Then this rule in `base.css` nearly switches off every animation:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
  Safari Catch has its own version: the Pokémon simply stand still in the grass, so the game can still be played.
- **Good contrast.** Dark navy text on light backgrounds is easy to read.
- **Short lines.** Paragraphs stop at about 68 characters (`max-width: 68ch`), so your eyes don't get lost.

---

## 11. Try it yourself: challenges

Start easy and work your way down. Save the file and refresh the browser after each change.

**Easy**

1. Change `--red` in `base.css` to `#7a3cff`. What changes across the site?
2. Add a new fact to the home page ticker. (Hint: it's in `index.html`, and remember there are **two** copies of the list.)
3. Change the Pokédex card shape from `5 / 7` to `1 / 1` in `pokedex.css`.
4. Make the diorama clouds drift faster by changing their `animation-duration`.
5. Add your favourite Pokémon to the Academy's `<datalist>`.

**Medium**

6. Add a ninth round to the quiz. Copy a whole `<section class="round">`, change the ids (`r9-0`…, `next-9`), and update "of 8".
7. Add a new Pokémon card to the Pokédex. Its picture address is `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/NUMBER.png`.
8. Add a `<details>` question of your own to the Types FAQ.
9. Give Pikachu a fifth move in the battle game. You'll need four new radios (one per turn), four new labels and the CSS for its damage.
10. Make the type chart's "super effective" cells bounce when you hover them.

**Tricky**

11. Add a ninth patch of grass to Safari Catch. Don't forget the belt slot, the counter total and the "all caught" rule!
12. Make a new page, `berries.html`. Copy the skeleton of another page, add it to the menu on **every** page, and give it its own stylesheet.
13. Draw a new gym badge in `badges.css` using `clip-path: polygon(…)`.
14. Build a dark mode with `@media (prefers-color-scheme: dark)` that swaps the colour variables.

---

## 12. Glossary

| Word | Meaning |
|---|---|
| **Attribute** | Extra information inside an opening tag, like `href="…"`. |
| **Browser** | The program that shows web pages: Chrome, Edge, Firefox, Safari. |
| **Cascade** | The rules CSS uses to decide which style wins. |
| **Class** | A reusable name for elements, used by CSS. |
| **Container query** | A rule based on the size of a parent box. |
| **Custom property** | A CSS variable, like `--red`. |
| **Declaration** | One `property: value;` pair. |
| **Element** | A tag plus everything inside it. |
| **Fallback** | What's shown when something doesn't work, like the text inside `<video>`. |
| **Keyframes** | The steps of an animation. |
| **Layer** | A drawer of CSS rules that stacks in a set order (`@layer`). |
| **Media query** | A rule based on the screen, printer or user settings. |
| **Property** | What CSS changes, like `color`. |
| **Pseudo-class** | A state, like `:hover` or `:checked`. |
| **Pseudo-element** | A part of an element, or an extra box, like `::before`. |
| **Responsive** | Works well on any screen size. |
| **Screen reader** | A program that reads web pages aloud for people who can't see them. |
| **Selector** | The part of a CSS rule that picks elements. |
| **Semantic HTML** | Using the tag that describes what something IS. |
| **Specificity** | How "strong" a selector is. |
| **Tag** | A name in angle brackets, like `<p>`. |
| **Viewport** | The visible part of the page in the browser window. |

---

## 13. Credits

- **Pokémon pictures, sprites and cries:** the open [PokéAPI](https://pokeapi.co/) project, loaded from its [sprites](https://github.com/PokeAPI/sprites) and [cries](https://github.com/PokeAPI/cries) collections.
- **Pokémon facts** (types, sizes, stats and Pokédex entries): PokéAPI. Some entries were rewritten in gentler, simpler words for young readers.
- **"Pi-Pi-Pi-Pi☆Pikachu!" video:** the official [Pokémon Kids TV](https://www.youtube.com/@pokemonkidstv) YouTube channel, shown in an `<iframe>`.
- **Flower video:** public domain (CC0), from the [MDN Web Docs](https://developer.mozilla.org/) examples.
- **Fonts:** [Lilita One](https://fonts.google.com/specimen/Lilita+One), [Lexend](https://fonts.google.com/specimen/Lexend) and [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P), from Google Fonts.
- **Diagrams:** drawn by [Mermaid](https://mermaid.js.org/), an open-source library.
- **Pokémon** and all Pokémon character names belong to Nintendo, Creatures Inc., GAME FREAK and The Pokémon Company. AshTech is a free, non-commercial fan project made for learning, and is not connected to them.

**Made by** Muhammad Ali Ashraf, software engineer and proud alumnus of Sir Syed School & College Campus-V, for the students learning HTML and CSS there, and for curious trainers everywhere.

**Where to learn more:**

- [MDN Web Docs](https://developer.mozilla.org/): the best reference for every HTML tag and CSS property.
- [web.dev Learn CSS](https://web.dev/learn/css) and [Learn HTML](https://web.dev/learn/html): free courses.
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and [to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/).

Now go and build something! Every trainer's journey starts with one small step.
