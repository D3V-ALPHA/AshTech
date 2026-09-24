# AshTech

**A free, fan-made Pokémon field guide that teaches kids HTML and CSS.**

AshTech lets young trainers (ages 8 to 14) explore Pokémon, play games and build their own web pages, and every part of it doubles as a lesson in how the web works. It was made for the students of **Sir Syed School & College Campus-V** who are learning HTML and CSS, and for curious trainers everywhere.

There are no ads, no sign-ups and no trackers. Nothing a child types ever leaves their computer.

---

## What's inside

| Page | What kids do there | What it teaches |
|---|---|---|
| **Home** | Watch a living CSS scene, open a Poké Ball to pick a starter | Positioning, gradients, keyframe animation, `:has()` |
| **Pokédex** | Browse 63 Pokémon, filter by type, flip cards, hear cries | Grid, attribute selectors, 3D transforms, `<meter>`, `popover` |
| **Types** | Learn the 18 types and read the full type chart | Tables, sticky headers, `<details>` |
| **Evolution** | Press *Evolve* and watch Pokémon change | Radio-button state, restarting animations, CSS trig |
| **Regions** | Fly across nine regions, collect CSS-drawn gym badges | Scroll snap, scroll-driven animation, `clip-path` |
| **Arcade** | Three games: *Who's That Pokémon?*, *Battle!*, *Safari Catch* | Checkbox hacks, CSS counters, CSS maths (no JavaScript!) |
| **Theater** | Watch a video, hear Pokémon cries, explore Pikachu up close | `<video>`, `<audio>`, `<track>`, `<iframe>`, `<picture>`, image maps |
| **Academy** | Fill in a trainer form, download a personal Trainer Card PDF | Every form control, validation styling, canvas + PDF |
| **Workshop** | 13 hands-on labs, including a live Code Lab | Box model, flexbox, grid, selectors, specificity, colour, transforms |
| **Teachers** | Eight lesson plans, worksheets and a picture handbook | Ready-to-teach classroom material |

### For teachers

- **8 lesson plans** of about 40 minutes each, with goals, steps and an exit question.
- **Kids' Handbook** (`handbook.pdf`): a 23-page picture guide with a diagram in every chapter, a quiz and a certificate.
- **Worksheet pack** (`worksheets.pdf`): one printable A4 sheet per lesson, plus an answer key.
- A **For teachers** panel under every Workshop lab, and a **Present** button for classroom projectors.
- The full technical guide, [`learn.md`](learn.md), also available on the site as `guide.html`.

---

## How it's built

- **HTML and CSS** do almost everything, including all three games.
- **A little JavaScript** (four small, heavily commented files in `js/`) handles the jobs HTML and CSS can't: making the Trainer Card PDF, powering the interactive Workshop labs, and drawing the Handbook's diagrams with [Mermaid](https://mermaid.js.org/). Every page that uses JavaScript explains why in a "Why JavaScript here?" box.
- **No framework and no build step.** Every file is plain, readable code, written for learners to open with <kbd>Ctrl</kbd> + <kbd>U</kbd>.

Modern CSS features on show include cascade layers, custom properties, `:has()`, container queries, `@property`, `@starting-style`, scroll-driven animations, cross-page view transitions, `clip-path`, trigonometric functions and print stylesheets.

```
ashtech/
├── *.html          one file per page (index.html is the home page, 404.html for missing pages)
├── css/            base.css is shared by every page, plus one stylesheet per page
├── js/             the four small JavaScript files
├── media/          the flower video (WebM + MP4) and its captions
├── handbook.pdf    Kids' Handbook
├── worksheets.pdf  worksheet pack
├── learn.md        the full beginner's guide to how everything works
└── vercel.json     hosting settings
```

---

## Run it on your computer

Open the folder with any local web server. For example:

- **VS Code:** install the *Live Server* extension, right-click `index.html`, then choose **Open with Live Server**.
- **Node.js:** `npx serve .`
- **Python:** `python -m http.server`

You *can* double-click `index.html`, and nearly everything works, but YouTube refuses to play embedded videos on `file://` pages. Pokémon pictures, sounds and fonts load from the internet, so stay online.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), choose **Add New → Project** and import the repository.
3. Leave **Framework Preset** as **Other**. There's no build command and no output directory to set.
4. Click **Deploy**.
5. To use your own domain, open **Settings → Domains**, add it, and follow the DNS instructions Vercel shows.

`vercel.json` adds a few safe security headers and sensible caching. `404.html` is shown automatically for any address that doesn't exist.

---

## Credits

- Made by **Engr. Muhammad Ali Ashraf**, software engineer and proud alumnus of Sir Syed School & College Campus-V.
- Pokémon pictures, sprites, cries and facts come from the open [PokéAPI](https://pokeapi.co/) project.
- The video on the Theater page is from the official [Pokémon Kids TV](https://www.youtube.com/@pokemonkidstv) channel. The flower video is public domain (CC0), from the MDN Web Docs examples.
- Fonts: [Lilita One](https://fonts.google.com/specimen/Lilita+One), [Lexend](https://fonts.google.com/specimen/Lexend) and [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P).

> AshTech is a free, non-commercial fan project made for learning. It is not affiliated with or endorsed by Nintendo, Creatures Inc., GAME FREAK or The Pokémon Company. Pokémon and all Pokémon character names are trademarks of their respective owners.
