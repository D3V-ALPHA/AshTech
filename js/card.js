/* =====================================================================
   ASHTECH: card.js

   WHY JAVASCRIPT?
   HTML and CSS can SHOW things, but they can't READ what you typed on
   another page, and they can't MAKE a new file. JavaScript can do both:

   1. It reads your answers from the address bar (?name=Ash&age=9…)
      and writes them onto the card.
   2. When you press "Download", it paints the card onto a <canvas>
      (a drawing board made of pixels), then wraps that picture inside
      a real PDF file and hands it to you.

   Nothing you typed ever leaves your computer.
   ===================================================================== */

/* ---------- 1. Read the answers from the address bar ---------- */

const params = new URLSearchParams(window.location.search);
const hasAnswers = params.has('name');

const TYPE_LIST = ['fire', 'water', 'grass', 'electric', 'psychic', 'ghost', 'dragon', 'fairy', 'rock', 'ice'];
const TYPE_COLOURS = {
  fire: '#ee8130', water: '#6390f0', grass: '#7ac74c', electric: '#f7d02c', psychic: '#f95587',
  ghost: '#735797', dragon: '#6f35fc', fairy: '#d685ad', rock: '#b6a136', ice: '#96d9d6',
};
const WHITE_TEXT_TYPES = ['ghost', 'dragon'];

// Pokédex numbers, so we can find each Pokémon's picture
const POKEMON = {"Bulbasaur":1,"Ivysaur":2,"Venusaur":3,"Charmander":4,"Charmeleon":5,"Charizard":6,"Squirtle":7,"Wartortle":8,"Blastoise":9,"Pikachu":25,"Raichu":26,"Jigglypuff":39,"Meowth":52,"Psyduck":54,"Growlithe":58,"Abra":63,"Geodude":74,"Gastly":92,"Haunter":93,"Gengar":94,"Onix":95,"Magikarp":129,"Gyarados":130,"Lapras":131,"Ditto":132,"Eevee":133,"Vaporeon":134,"Jolteon":135,"Flareon":136,"Snorlax":143,"Dratini":147,"Dragonair":148,"Dragonite":149,"Mewtwo":150,"Mew":151,"Chikorita":152,"Cyndaquil":155,"Totodile":158,"Pichu":172,"Togepi":175,"Treecko":252,"Torchic":255,"Mudkip":258,"Turtwig":387,"Chimchar":390,"Piplup":393,"Lucario":448,"Snivy":495,"Tepig":498,"Oshawott":501,"Chespin":650,"Fennekin":653,"Froakie":656,"Sylveon":700,"Rowlet":722,"Litten":725,"Popplio":728,"Grookey":810,"Scorbunny":813,"Sobble":816,"Sprigatito":906,"Fuecoco":909,"Quaxly":912};

const artUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Find a Pokémon's number even if the name was typed in lower case
function pokemonId(name) {
  const key = Object.keys(POKEMON).find((n) => n.toLowerCase() === name.trim().toLowerCase());
  return key ? POKEMON[key] : null;
}

function monthName(value) {
  if (!/^\d{4}-\d{2}$/.test(value)) return '';
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

const answer = (key, max = 40) => (params.get(key) || '').trim().slice(0, max);
const colour = answer('colour');

const trainer = {
  name: answer('name', 20),
  id: answer('id', 5),
  age: answer('age', 2),
  hometown: answer('hometown'),
  starter: answer('starter'),
  favourite: answer('favourite', 20),
  about: answer('about', 200),
  start: monthName(answer('start')),
  bravery: Math.max(0, Math.min(10, Number(params.get('bravery') ?? 5) || 0)),
  types: params.getAll('types').filter((t) => TYPE_LIST.includes(t)),
  // Only accept a proper colour like #e3350d, never anything else
  team: /^#[0-9a-f]{6}$/i.test(colour) ? colour : '#e3350d',
  photo: hasAnswers ? sessionStorage.getItem('trainerPhoto') : null,
};

const partnerId = pokemonId(trainer.starter) || 25;
const favouriteId = trainer.favourite ? pokemonId(trainer.favourite) : null;

/* ---------- 2. Write the answers onto the HTML card ---------- */

const card = document.querySelector('#tcard');
card.style.setProperty('--team', trainer.team);

for (const slot of card.querySelectorAll('[data-field]')) {
  // textContent (not innerHTML) keeps typed text as plain words: safe!
  slot.textContent = trainer[slot.dataset.field] || '';
}

const photo = card.querySelector('#card-photo');
if (trainer.photo) {
  photo.src = trainer.photo;
  photo.alt = `Photo of ${trainer.name}`;
  card.classList.add('has-photo');
} else if (hasAnswers) {
  photo.src = artUrl(partnerId);
  photo.alt = `${trainer.starter || 'Pikachu'}, your partner`;
  card.classList.add('has-partner');
}

card.querySelector('#card-bravery').value = trainer.bravery;

const typeList = card.querySelector('#card-types');
for (const type of trainer.types) {
  const li = document.createElement('li');
  li.className = 'type';
  li.dataset.type = type;
  li.textContent = type;
  typeList.append(li);
}

document.querySelector('#card-empty-note').hidden = hasAnswers;
document.querySelector('#card-ready-note').hidden = !hasAnswers;

/* ---------- 3. Paint the card onto a canvas ---------- */

const INK = '#1b2a55';
const INK_SOFT = '#46547f';
const RED = '#e3350d';
const YELLOW = '#ffcb05';

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous'; // lets us put pictures from other websites into our PDF
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // no internet? the card just skips that picture
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// Shrink the font until the text fits in maxWidth
function fitText(ctx, text, maxWidth, size, font) {
  let s = size;
  do {
    ctx.font = font.replace('SIZE', s);
    s -= 2;
  } while (ctx.measureText(text).width > maxWidth && s > 12);
}

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '…');
  }
  return lines;
}

function drawImageCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

// The eight Kanto badges as grey shapes (they're earned later, of course!)
function drawBadge(ctx, kind, cx, cy, s) {
  const pts = (list) => {
    ctx.beginPath();
    list.forEach(([px, py], i) => {
      const X = cx - s / 2 + (px / 100) * s;
      const Y = cy - s / 2 + (py / 100) * s;
      i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
    });
    ctx.closePath();
  };
  ctx.save();
  ctx.fillStyle = '#7d8397';
  ctx.strokeStyle = '#a9aec0';
  ctx.lineWidth = 3;
  switch (kind) {
    case 'boulder': pts([[30, 0], [70, 0], [100, 30], [100, 70], [70, 100], [30, 100], [0, 70], [0, 30]]); break;
    case 'cascade':
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.5);
      ctx.bezierCurveTo(cx + s * 0.45, cy, cx + s * 0.4, cy + s * 0.45, cx, cy + s * 0.45);
      ctx.bezierCurveTo(cx - s * 0.4, cy + s * 0.45, cx - s * 0.45, cy, cx, cy - s * 0.5);
      break;
    case 'thunder': pts([[50, 0], [61, 26], [85, 15], [74, 39], [100, 50], [74, 61], [85, 85], [61, 74], [50, 100], [39, 74], [15, 85], [26, 61], [0, 50], [26, 39], [15, 15], [39, 26]]); break;
    case 'rainbow':
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.moveTo(cx + Math.cos(a) * s * 0.28 + s * 0.2, cy + Math.sin(a) * s * 0.28);
        ctx.arc(cx + Math.cos(a) * s * 0.28, cy + Math.sin(a) * s * 0.28, s * 0.2, 0, Math.PI * 2);
      }
      break;
    case 'soul': {
      const k = s / 64;
      ctx.beginPath();
      ctx.moveTo(cx, cy + 26 * k);
      ctx.lineTo(cx - 25 * k, cy + 1 * k);
      ctx.arc(cx - 12.5 * k, cy - 11 * k, 13.5 * k, Math.PI * 0.8, Math.PI * 1.95);
      ctx.arc(cx + 12.5 * k, cy - 11 * k, 13.5 * k, Math.PI * 1.05, Math.PI * 0.2);
      ctx.closePath();
      break;
    }
    case 'marsh':
      ctx.beginPath();
      ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#a9aec0';
      for (let r = s * 0.12; r < s / 2; r += s * 0.12) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
      return;
    case 'volcano': pts([[50, 0], [65, 25], [85, 20], [80, 50], [95, 70], [75, 100], [25, 100], [5, 70], [20, 50], [15, 20], [35, 25]]); break;
    case 'earth':
      ctx.beginPath();
      ctx.moveTo(cx - s / 2, cy + s / 2);
      ctx.quadraticCurveTo(cx - s / 2, cy - s / 2, cx + s / 2, cy - s / 2);
      ctx.quadraticCurveTo(cx + s / 2, cy + s / 2, cx - s / 2, cy + s / 2);
      break;
  }
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

async function paintCard() {
  // Wait for our fonts, or the canvas would use a plain default font
  await Promise.all([
    document.fonts.load('90px "Lilita One"'),
    document.fonts.load('700 40px "Lexend"'),
    document.fonts.load('400 30px "Lexend"'),
  ]);

  const [photoImg, partnerImg, favouriteImg] = await Promise.all([
    loadImage(trainer.photo),
    loadImage(artUrl(partnerId)),
    loadImage(favouriteId ? artUrl(favouriteId) : null),
  ]);

  const W = 1800;
  const H = 1140;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.lineJoin = 'round';
  ctx.textBaseline = 'alphabetic';

  // Page and card
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  const x = 30;
  const y = 30;
  const w = W - 80;
  const h = H - 80;

  roundRect(ctx, x + 22, y + 22, w, h, 56); // the hard "sticker" shadow
  ctx.fillStyle = INK;
  ctx.fill();

  roundRect(ctx, x, y, w, h, 56);
  const body = ctx.createLinearGradient(x, y, x + w, y + h);
  body.addColorStop(0, '#fffbe8');
  body.addColorStop(1, '#eaf5ff');
  ctx.fillStyle = body;
  ctx.fill();

  ctx.save();
  roundRect(ctx, x, y, w, h, 56);
  ctx.clip();

  // Striped red top band
  ctx.fillStyle = RED;
  ctx.fillRect(x, y, w, 170);
  ctx.fillStyle = '#ef4b24';
  for (let s = -200; s < w + 200; s += 88) {
    ctx.beginPath();
    ctx.moveTo(x + s, y);
    ctx.lineTo(x + s + 44, y);
    ctx.lineTo(x + s + 44 - 170, y + 170);
    ctx.lineTo(x + s - 170, y + 170);
    ctx.fill();
  }
  ctx.fillStyle = trainer.team; // the trainer's own team colour
  ctx.fillRect(x, y + 170, w, 20);
  ctx.fillStyle = INK;
  ctx.fillRect(x, y + 166, w, 8);
  ctx.fillRect(x, y + 190, w, 8);
  ctx.restore();

  // Title
  ctx.font = '96px "Lilita One"';
  ctx.lineWidth = 18;
  ctx.strokeStyle = INK;
  ctx.strokeText('Trainer Card', x + 60, y + 118);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Trainer Card', x + 60, y + 118);

  ctx.textAlign = 'right';
  ctx.font = '700 38px "Lexend"';
  ctx.fillText('AshTech Academy', x + w - 60, y + 108);
  ctx.textAlign = 'left';

  // Photo box
  const px = x + 60;
  const py = y + 250;
  const pw = 430;
  const ph = 520;
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.fillStyle = '#eef6ff';
  ctx.fill();
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.clip();
  if (photoImg && trainer.photo) {
    drawImageCover(ctx, photoImg, px, py, pw, ph);
  } else {
    // No photo: draw a faint Poké Ball and leave room to stick a real photo on the printout
    const bx = px + pw / 2;
    const by = py + ph / 2 - 30;
    const r = 130;
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(bx, by, r, Math.PI, 0);
    ctx.fill();
    ctx.lineWidth = 16;
    ctx.strokeStyle = INK;
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.moveTo(bx - r, by);
    ctx.lineTo(bx + r, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx, by, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = INK_SOFT;
    ctx.font = '400 30px "Lexend"';
    ctx.textAlign = 'center';
    ctx.fillText('Stick your photo here', bx, py + ph - 50);
    ctx.textAlign = 'left';
  }
  ctx.restore();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.lineWidth = 8;
  ctx.strokeStyle = INK;
  ctx.stroke();

  // Info rows: label on the left, answer (or a line to write on) on the right
  const ix = x + 540;
  const iw = 640;
  const rows = [
    ['Name', trainer.name],
    ['ID No.', trainer.id ? `${trainer.id}${trainer.age ? `      Age ${trainer.age}` : ''}` : ''],
    ['Hometown', trainer.hometown],
    ['Partner', trainer.starter],
    ['Favourite', trainer.favourite],
  ];
  rows.forEach(([label, value], i) => {
    const ry = y + 300 + i * 92;
    ctx.fillStyle = INK;
    ctx.font = '46px "Lilita One"';
    ctx.fillText(label, ix, ry);
    ctx.save();
    ctx.setLineDash([4, 12]);
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(ix + 230, ry + 14);
    ctx.lineTo(ix + iw, ry + 14);
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.restore();
    if (value) {
      fitText(ctx, value, iw - 240, 46, '700 SIZEpx "Lexend"');
      ctx.fillStyle = INK;
      ctx.fillText(value, ix + 236, ry);
    }
  });

  if (favouriteImg) {
    ctx.drawImage(favouriteImg, ix + iw - 96, y + 300 + 4 * 92 - 86, 96, 96);
  }

  // Dream team, in the trainer's own words
  if (trainer.about) {
    ctx.font = 'italic 400 28px "Lexend"';
    ctx.fillStyle = INK_SOFT;
    const lines = wrapLines(ctx, `“${trainer.about}”`, iw, 2);
    lines.forEach((line, i) => ctx.fillText(line, ix, y + 745 + i * 38));
  }

  // Partner Pokémon on a team-coloured circle
  const cx = x + w - 290;
  const cy = y + 470;
  ctx.beginPath();
  ctx.arc(cx, cy, 215, 0, Math.PI * 2);
  ctx.fillStyle = trainer.team;
  ctx.globalAlpha = 0.28;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 8;
  ctx.strokeStyle = INK;
  ctx.stroke();
  if (partnerImg) ctx.drawImage(partnerImg, cx - 200, cy - 210, 400, 400);

  // Types the trainer likes, as coloured pills under the partner
  let tx = cx - 215;
  let ty = cy + 260;
  ctx.font = '700 26px "Lexend"';
  for (const type of trainer.types) {
    const label = type[0].toUpperCase() + type.slice(1);
    const tw = ctx.measureText(label).width + 40;
    if (tx + tw > x + w - 40) {
      tx = cx - 215;
      ty += 54;
    }
    if (ty > y + 900) break;
    roundRect(ctx, tx, ty - 34, tw, 46, 23);
    ctx.fillStyle = TYPE_COLOURS[type];
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.fillStyle = WHITE_TEXT_TYPES.includes(type) ? '#ffffff' : INK;
    ctx.fillText(label, tx + 20, ty - 2);
    tx += tw + 12;
  }

  // Bars: Pokédex seen and Bravery
  const bars = [
    ['Pokédex seen', 63 / 1025, '63 / 1025'],
    ['Bravery', trainer.bravery / 10, `${trainer.bravery} / 10`],
  ];
  bars.forEach(([label, amount, text], i) => {
    const by = y + 850 + i * 90;
    ctx.fillStyle = INK;
    ctx.font = '38px "Lilita One"';
    ctx.fillText(label, px, by);
    roundRect(ctx, px + 250, by - 30, 400, 34, 17);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.save();
    roundRect(ctx, px + 250, by - 30, 400, 34, 17);
    ctx.clip();
    const fill = ctx.createLinearGradient(px + 250, 0, px + 650, 0);
    fill.addColorStop(0, RED);
    fill.addColorStop(1, YELLOW);
    ctx.fillStyle = fill;
    ctx.fillRect(px + 250, by - 30, 400 * amount, 34);
    ctx.restore();
    roundRect(ctx, px + 250, by - 30, 400, 34, 17);
    ctx.lineWidth = 5;
    ctx.strokeStyle = INK;
    ctx.stroke();
    ctx.font = '700 26px "Lexend"';
    ctx.fillStyle = INK_SOFT;
    ctx.fillText(text, px + 670, by - 4);
  });

  // Badge case
  const bx = x + 860;
  const by = y + 810;
  ctx.fillStyle = INK;
  ctx.font = '38px "Lilita One"';
  ctx.fillText('Badges', bx, by);
  roundRect(ctx, bx, by + 20, 560, 110, 24);
  ctx.fillStyle = '#2a2f45';
  ctx.fill();
  ['boulder', 'cascade', 'thunder', 'rainbow', 'soul', 'marsh', 'volcano', 'earth']
    .forEach((kind, i) => drawBadge(ctx, kind, bx + 40 + i * 68, by + 75, 50));

  // Footer line
  ctx.font = '400 24px "Lexend"';
  ctx.fillStyle = INK_SOFT;
  const issued = trainer.start
    ? `Journey starts ${trainer.start}`
    : `Issued ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
  ctx.fillText(issued, px, y + h - 36);
  ctx.textAlign = 'right';
  ctx.fillText('AshTech, a fan-made learning project', x + w - 60, y + h - 36);
  ctx.textAlign = 'left';

  // Border on top of everything
  roundRect(ctx, x, y, w, h, 56);
  ctx.lineWidth = 12;
  ctx.strokeStyle = INK;
  ctx.stroke();

  return canvas;
}

/* ---------- 4. Wrap the picture in a PDF file ---------- */
// A PDF is a text-and-bytes file with numbered "objects": a catalogue,
// a list of pages, one page, our picture, and the drawing instructions.
// The xref table at the end tells PDF readers where each object starts.

function makePdf(canvas, title) {
  const bytes = (text) => Uint8Array.from(text, (ch) => ch.charCodeAt(0) & 255);
  const jpeg = atob(canvas.toDataURL('image/jpeg', 0.95).split(',')[1]);
  const image = bytes(jpeg);

  // Page size in points (72 points = 1 inch): 10 inches wide
  const pageW = 720;
  const pageH = Math.round((720 * canvas.height) / canvas.width);

  // Titles are written as UTF-16 hex, so any name in any language works
  const hexTitle = 'FEFF' + [...title].map((ch) => {
    const code = ch.codePointAt(0);
    if (code > 0xffff) return 'FFFD';
    return code.toString(16).padStart(4, '0').toUpperCase();
  }).join('');

  const content = `q ${pageW} 0 0 ${pageH} 0 0 cm /Card Do Q`;
  const parts = [];
  const offsets = [];
  let length = 0;
  const add = (part) => {
    const chunk = typeof part === 'string' ? bytes(part) : part;
    parts.push(chunk);
    length += chunk.length;
  };
  const object = (n, ...pieces) => {
    offsets[n] = length;
    add(`${n} 0 obj\n`);
    pieces.forEach(add);
    add('\nendobj\n');
  };

  add('%PDF-1.4\n%âãÏÓ\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Card 4 0 R >> >> /Contents 5 0 R >>`);
  object(4, `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`, image, '\nendstream');
  object(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  object(6, `<< /Title <${hexTitle}> /Creator (AshTech) /Producer (AshTech card.js) >>`);

  const xrefStart = length;
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let n = 1; n <= 6; n++) xref += `${String(offsets[n]).padStart(10, '0')} 00000 n \n`;
  add(xref);
  add(`trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  return new Blob(parts, { type: 'application/pdf' });
}

/* ---------- 5. The download button ---------- */

const button = document.querySelector('#download-card');
const status = document.querySelector('#download-status');

button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Drawing your card…';
  try {
    const canvas = await paintCard();
    const title = trainer.name ? `${trainer.name}'s Trainer Card` : 'AshTech Trainer Card';
    const pdf = makePdf(canvas, title);
    const slug = trainer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdf);
    link.download = `trainer-card${slug ? `-${slug}` : ''}.pdf`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 10000);
    status.textContent = 'Done! Look in your Downloads folder.';
  } catch (error) {
    status.textContent = 'Oops, the card couldn’t be drawn. Check your internet connection and try again.';
  } finally {
    button.disabled = false;
  }
});
