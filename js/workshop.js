/* =====================================================================
   ASHTECH: workshop.js

   WHY JAVASCRIPT?
   The CSS-only labs (flexbox, grid, the 3D box) remember your clicks
   with hidden radio buttons. But these labs need to READ what you type
   and REACT to sliders straight away. That's JavaScript's job.

   Each lab below is its own little block of code. They all follow the
   same three steps:
     1. find the parts of the page we need   (document.querySelector)
     2. listen for something to happen       (addEventListener)
     3. change the page                      (textContent, style, classList)
   ===================================================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ---------------------------------------------------------------------
   PRESENT MODE: a button on every lab that fills the whole screen,
   so a teacher can show it on a projector.
   --------------------------------------------------------------------- */
if (document.fullscreenEnabled) {
  for (const lab of $$('.lab')) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'present';
    button.textContent = 'Present';
    button.setAttribute('aria-label', `Show “${$('h2', lab).textContent.trim()}” full screen`);
    button.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else lab.requestFullscreen();
    });
    $('.section-head', lab).append(button);
  }
  document.addEventListener('fullscreenchange', () => {
    for (const button of $$('.present')) {
      const on = button.closest('.lab') === document.fullscreenElement;
      button.textContent = on ? 'Exit' : 'Present';
    }
  });
}

/* ---------------------------------------------------------------------
   CODE LAB: type HTML and CSS, see the page instantly
   --------------------------------------------------------------------- */
const PRESETS = {
  card: {
    html: `<article class="card">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">
  <h2>Pikachu</h2>
  <p class="type">Electric</p>
  <p>It stores electricity in its red cheeks.</p>
</article>`,
    css: `body {
  font-family: sans-serif;
  background: #eef6ff;
  display: grid;
  place-items: center;
  min-height: 90vh;
}

.card {
  width: 220px;
  padding: 16px;
  text-align: center;
  background: white;
  border: 4px solid #1b2a55;
  border-radius: 20px;
  box-shadow: 6px 6px 0 #1b2a55;
}

.card img {
  width: 100%;
}

.type {
  display: inline-block;
  padding: 2px 14px;
  background: #f7d02c;
  border-radius: 99px;
}`,
  },
  ball: {
    html: `<div class="ball">
  <div class="button"></div>
</div>`,
    css: `body {
  display: grid;
  place-items: center;
  min-height: 90vh;
  background: #9bd770;
}

/* One box + a gradient = a Poké Ball! */
.ball {
  position: relative;
  width: 160px;
  height: 160px;
  border: 8px solid #1b2a55;
  border-radius: 50%;
  background: linear-gradient(
    red 0 45%,
    #1b2a55 45% 55%,
    white 55%
  );
}

.button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  translate: -50% -50%;
  background: white;
  border: 8px solid #1b2a55;
  border-radius: 50%;
}`,
  },
  team: {
    html: `<h1>My team</h1>
<ul class="team">
  <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur"></li>
  <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander"></li>
  <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle"></li>
  <li><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu"></li>
</ul>`,
    css: `body {
  font-family: sans-serif;
  text-align: center;
}

.team {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.team li {
  background: #fff1b0;
  border: 3px solid #1b2a55;
  border-radius: 16px;
}

img {
  image-rendering: pixelated;
}`,
  },
  move: {
    html: `<img class="pika" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu">`,
    css: `body {
  display: grid;
  place-items: center;
  min-height: 90vh;
  background: #cfeaff;
}

.pika {
  width: 160px;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -60px; }
}`,
  },
  blank: {
    html: `<h1>Hello, trainer!</h1>
<p>Write your own page here.</p>`,
    css: `h1 {
  color: #e3350d;
}`,
  },
};

const codeHtml = $('#code-html');
const codeCss = $('#code-css');
const preview = $('#code-preview');

if (codeHtml && codeCss && preview) {
  let timer;

  const render = () => {
    // srcdoc is a whole little web page, made from what's in the two boxes
    preview.srcdoc = `<!DOCTYPE html><html><head><style>${codeCss.value}</style></head><body>${codeHtml.value}</body></html>`;
  };

  // Wait until typing pauses for a moment, so the preview doesn't flicker
  const renderSoon = () => {
    clearTimeout(timer);
    timer = setTimeout(render, 250);
  };

  const loadPreset = (name) => {
    codeHtml.value = PRESETS[name].html;
    codeCss.value = PRESETS[name].css;
    for (const button of $$('[data-preset]')) {
      button.setAttribute('aria-pressed', String(button.dataset.preset === name));
    }
    render();
  };

  // Let the Tab key type two spaces instead of jumping away (Esc then Tab still leaves)
  let escaped = false;
  for (const box of [codeHtml, codeCss]) {
    box.addEventListener('input', renderSoon);
    box.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        escaped = true;
        return;
      }
      if (event.key === 'Tab' && !event.shiftKey && !escaped) {
        event.preventDefault();
        box.setRangeText('  ', box.selectionStart, box.selectionEnd, 'end');
        renderSoon();
      }
      escaped = false;
    });
  }

  for (const button of $$('[data-preset]')) {
    button.addEventListener('click', () => loadPreset(button.dataset.preset));
  }

  loadPreset('card');
}

/* ---------------------------------------------------------------------
   MEASURE THE BOX: sliders change the box, and we do the maths
   --------------------------------------------------------------------- */
const measure = $('.measure');

if (measure) {
  const slider = (name) => $(`#m-${name}`);
  const box = $('#m-box');
  const marginBox = $('#m-margin-box');

  const update = () => {
    const width = Number(slider('width').value);
    const padding = Number(slider('padding').value);
    const border = Number(slider('border').value);
    const margin = Number(slider('margin').value);
    const sizing = $('[name="m-sizing"]:checked').value;

    for (const name of ['width', 'padding', 'border', 'margin']) {
      $(`#m-${name}-out`).value = slider(name).value;
    }

    box.style.width = `${width}px`;
    box.style.padding = `${padding}px`;
    box.style.borderWidth = `${border}px`;
    box.style.boxSizing = sizing;
    marginBox.style.padding = `${margin}px`;

    let sum;
    if (sizing === 'content-box') {
      const total = margin + border + padding + width + padding + border + margin;
      sum = `Whole width = <b>${margin}</b> margin + <b>${border}</b> border + <b>${padding}</b> padding + <b>${width}</b> content + <b>${padding}</b> + <b>${border}</b> + <b>${margin}</b> = <strong>${total}px</strong>`;
    } else {
      const content = Math.max(0, width - 2 * padding - 2 * border);
      const total = margin + width + margin;
      sum = `With border-box, <b>width</b> already includes padding and border. The picture only gets <b>${content}px</b>. Whole width = <b>${margin}</b> + <b>${width}</b> + <b>${margin}</b> = <strong>${total}px</strong>`;
    }
    $('#m-sum').innerHTML = sum; // safe: only numbers we made ourselves go in here

    $('#m-code').textContent = `.box {
  box-sizing: ${sizing};
  width: ${width}px;
  padding: ${padding}px;
  border: ${border}px solid;
  margin: ${margin}px;
}`;
  };

  measure.addEventListener('input', update);
  update();
}

/* ---------------------------------------------------------------------
   SELECTOR DETECTIVE: querySelectorAll finds what your selector picks
   --------------------------------------------------------------------- */
const scene = $('#det-scene');

if (scene) {
  const input = $('#det-input');
  const result = $('#det-result');
  const missions = $$('#missions li');
  let current = 0;

  // Show the scene's own HTML as code, so detectives can read the clues
  const lines = scene.innerHTML.split('\n').filter((line) => line.trim());
  $('#det-code').textContent = lines.join('\n');

  const pick = (selector) => {
    try {
      return new Set(scene.querySelectorAll(selector));
    } catch {
      return null; // not a valid selector (yet!)
    }
  };

  const sameSet = (a, b) => a.size === b.size && [...a].every((el) => b.has(el));

  const setMission = (index) => {
    current = index;
    missions.forEach((li, i) => li.classList.toggle('is-current', i === index));
    check();
  };

  const updateScore = () => {
    const done = missions.filter((li) => li.classList.contains('is-done')).length;
    $('#det-score').textContent = done === missions.length
      ? `All ${done} missions solved! You’re a Master Detective!`
      : `${done} of ${missions.length} missions solved`;
  };

  function check() {
    for (const el of scene.querySelectorAll('.is-picked')) el.classList.remove('is-picked');
    const selector = input.value.trim();

    if (!selector) {
      result.textContent = 'Type a selector to start.';
      result.className = 'detective__result';
      return;
    }

    const found = pick(selector);
    if (!found) {
      result.textContent = 'Hmm, the browser can’t read that selector yet. Check for typos!';
      result.className = 'detective__result is-error';
      return;
    }

    for (const el of found) el.classList.add('is-picked');
    const names = [...found].map((el) => el.textContent.trim().split('\n')[0]);
    result.textContent = found.size
      ? `Picked ${found.size}: ${names.slice(0, 5).join(', ')}${found.size > 5 ? '…' : ''}`
      : 'Nothing picked. Try again!';
    result.className = 'detective__result';

    const mission = missions[current];
    const answer = pick(mission.dataset.answer);
    if (found.size && sameSet(found, answer)) {
      result.textContent = `Solved! ${result.textContent}`;
      result.className = 'detective__result is-solved';
      if (!mission.classList.contains('is-done')) {
        mission.classList.add('is-done');
        updateScore();
        // Move on to the next unsolved mission after a short celebration
        const next = missions.findIndex((li) => !li.classList.contains('is-done'));
        if (next !== -1) {
          setTimeout(() => {
            input.value = '';
            setMission(next);
            input.focus();
          }, 1400);
        }
      }
    }
  }

  missions.forEach((li, i) => $('button', li).addEventListener('click', () => {
    setMission(i);
    input.focus();
  }));
  input.addEventListener('input', check);
  setMission(0);
  updateScore();
}

/* ---------------------------------------------------------------------
   SPECIFICITY SHOWDOWN: count IDs, classes and tags, then compare
   --------------------------------------------------------------------- */

// Returns [ids, classes, tags] for one simple selector (no commas)
function specificity(selector) {
  let s = selector;
  let a = 0;
  let b = 0;
  let c = 0;

  // :where(...) always counts as zero, so we just remove it.
  // :is(...), :not(...) and :has(...) count as their strongest part.
  const bracket = /:(where|is|not|has)\(/i;
  let m;
  while ((m = bracket.exec(s))) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < s.length && depth) {
      if (s[i] === '(') depth++;
      if (s[i] === ')') depth--;
      i++;
    }
    const inside = s.slice(m.index + m[0].length, i - 1);
    if (m[1].toLowerCase() !== 'where') {
      const best = inside.split(',').map((part) => specificity(part.trim()))
        .sort((x, y) => y[0] - x[0] || y[1] - x[1] || y[2] - x[2])[0] || [0, 0, 0];
      a += best[0];
      b += best[1];
      c += best[2];
    }
    s = `${s.slice(0, m.index)} ${s.slice(i)}`;
  }

  s = s.replace(/\[[^\]]*\]/g, () => { b++; return ' '; });            // [attributes]
  s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return ' '; });   // ::pseudo-elements
  s = s.replace(/#[\w-]+/g, () => { a++; return ' '; });                // #ids
  s = s.replace(/\.[\w-]+/g, () => { b++; return ' '; });               // .classes
  s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ' '; });    // :pseudo-classes
  s.replace(/(^|[\s>+~])([a-z][\w-]*)/gi, () => { c++; return ''; });   // tag names
  return [a, b, c];
}

const rule1 = $('#rule-1');
const rule2 = $('#rule-2');
const target = $('#pika');

if (rule1 && rule2 && target) {
  const matches = (selector) => {
    try {
      return target.matches(selector);
    } catch {
      return null;
    }
  };

  const showScore = (box, spec, match) => {
    if (match === null) {
      box.innerHTML = '<p class="score__note">Not a selector the browser understands.</p>';
      return;
    }
    const cols = [['IDs', spec[0]], ['Classes', spec[1]], ['Tags', spec[2]]];
    box.innerHTML = `<div class="score__cols">${cols.map(([label, n]) =>
      `<span><b>${n}</b>${label}</span>`).join('')}</div>` +
      (match ? '' : '<p class="score__note">This doesn’t pick Pikachu, so it can’t paint it!</p>');
  };

  const battle = () => {
    const sel1 = rule1.value.trim();
    const sel2 = rule2.value.trim();
    const m1 = sel1 ? matches(sel1) : null;
    const m2 = sel2 ? matches(sel2) : null;
    const s1 = specificity(sel1);
    const s2 = specificity(sel2);
    showScore($('#score-1'), s1, m1);
    showScore($('#score-2'), s2, m2);

    const compare = s1[0] - s2[0] || s1[1] - s2[1] || s1[2] - s2[2];
    let winner = null;
    let why = '';
    if (m1 && m2) {
      if (compare > 0) { winner = 1; why = 'Rule 1 is more specific.'; }
      else if (compare < 0) { winner = 2; why = 'Rule 2 is more specific.'; }
      else { winner = 2; why = 'It’s a tie, so the rule written LAST wins: Rule 2.'; }
    } else if (m1) { winner = 1; why = 'Only Rule 1 picks Pikachu.'; }
    else if (m2) { winner = 2; why = 'Only Rule 2 picks Pikachu.'; }
    else { why = 'Neither rule picks Pikachu, so it keeps its normal colour.'; }

    target.className = `electric mouse${winner ? ` wins-${winner}` : ''}`;
    $('#spec-verdict').textContent = winner
      ? `${winner === 1 ? 'Red' : 'Blue'} wins! ${why}`
      : why;
  };

  rule1.addEventListener('input', battle);
  rule2.addEventListener('input', battle);
  battle();
}

/* ---------------------------------------------------------------------
   COLOUR MIXER: HSL sliders, three ways to write the colour, and a game
   --------------------------------------------------------------------- */
const mixer = $('.mixer');

if (mixer) {
  const TYPES = {
    Fire: '#ee8130', Water: '#6390f0', Grass: '#7ac74c', Electric: '#f7d02c', Ice: '#96d9d6',
    Fighting: '#c22e28', Poison: '#a33ea1', Ground: '#e2bf65', Flying: '#a98ff3', Psychic: '#f95587',
    Bug: '#a6b91a', Rock: '#b6a136', Ghost: '#735797', Dragon: '#6f35fc', Fairy: '#d685ad',
  };
  let targetName = 'Water';

  // Turn hue/saturation/lightness into red/green/blue (0–255)
  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
  };
  const toHex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
  const fromHex = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

  const update = () => {
    const h = Number($('#mx-h').value);
    const s = Number($('#mx-s').value);
    const l = Number($('#mx-l').value);
    const a = Number($('#mx-a').value);
    for (const id of ['h', 's', 'l', 'a']) $(`#mx-${id}-out`).value = $(`#mx-${id}`).value;

    const rgb = hslToRgb(h, s, l);
    const alpha = a === 100 ? '' : ` / ${a}%`;
    mixer.style.setProperty('--mix', `hsl(${h} ${s}% ${l}%${alpha})`);
    $('#mx-hsl').textContent = `hsl(${h} ${s}% ${l}%${alpha})`;
    $('#mx-rgb').textContent = `rgb(${rgb.join(' ')}${alpha})`;
    $('#mx-hex').textContent = a === 100 ? toHex(rgb) : `${toHex(rgb)}${Math.round(a * 2.55).toString(16).padStart(2, '0')}`;

    // How close is it to the target? (distance between the two colours)
    const goal = fromHex(TYPES[targetName]);
    const distance = Math.hypot(rgb[0] - goal[0], rgb[1] - goal[1], rgb[2] - goal[2]);
    const score = Math.max(0, Math.round(100 - (distance / 441) * 100 * 1.6));
    $('#mx-meter').value = score;
    $('#mx-score').textContent = score >= 95
      ? `${score}%! Perfect match. You’re a colour master!`
      : score >= 80 ? `${score}%. So close!` : `${score}% match. Keep sliding!`;
  };

  const newTarget = () => {
    const names = Object.keys(TYPES).filter((n) => n !== targetName);
    targetName = names[Math.floor(Math.random() * names.length)];
    const tag = $('#mx-target-name');
    tag.textContent = targetName;
    tag.dataset.type = targetName.toLowerCase();
    $('#mx-target').style.setProperty('--goal', TYPES[targetName]);
    update();
  };

  mixer.addEventListener('input', update);
  $('#mx-new').addEventListener('click', newTarget);
  newTarget();
}

/* ---------------------------------------------------------------------
   MOVE STUDIO: transform sliders and an animation player
   --------------------------------------------------------------------- */
const studio = $('.studio');

if (studio) {
  const mon = $('#st-mon');
  const value = (id) => $(`#st-${id}`).value;

  const write = () => {
    for (const id of ['rotate', 'scale', 'move', 'skew', 'duration']) {
      $(`#st-${id}-out`).value = value(id);
    }
    const transform = `rotate(${value('rotate')}deg) scale(${value('scale')}) translateX(${value('move')}px) skewX(${value('skew')}deg)`;
    const animation = `${value('anim')} ${value('duration')}s ${value('timing')} ${value('count')}`;
    mon.style.transform = transform;
    $('#st-code').textContent = `.pikachu {
  transform: ${transform};
}

/* After pressing Play: */
.pikachu {
  animation: ${animation};
}`;
    return animation;
  };

  const play = () => {
    const animation = write();
    mon.style.animation = 'none';
    void mon.offsetWidth; // a tiny trick that makes the browser restart the animation
    mon.style.animation = animation;
  };

  studio.addEventListener('input', write);
  $('#st-play').addEventListener('click', play);
  // After the Reset button puts the sliders back, redraw everything
  $('.studio__controls').addEventListener('reset', () => setTimeout(() => {
    mon.style.animation = 'none';
    write();
  }));
  write();
}
