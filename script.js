/* ====== EDIT ME ====== */
const HER = "Grace", HIM = "Cyrus";
const WHATSAPP = "254792629643";   // your number, country code first, no + or spaces
const LETTER = `My love,

I made this little corner of the internet just for you, because a text felt too small for how I feel.

You make ordinary days softer, funnier and brighter. Being around you feels like home, and I catch myself smiling at nothing, which is always you.

So here it is, with a very happy heart: I'd love to be yours, and for you to be mine.

Thank you for being you, Grace.`;
const US_NOTE = "Every story I want to tell from now on has you in it. 💞";
const STICKIES = ["I think about you every day 🌷", "My heart rose when I saw you 🌹", "I will never let you go 💗", "You are my favourite person ✨"];
const DATES = ["🏠 Come over to my place", "🍝 Dinner outside", "🧺 Picnic", "☕ Coffee date", "🎬 Movie date", "🫂 Cuddling", "🌅 Sunset walk", "🍦 Ice cream run", "🎮 Games night", "🌌 Stargazing", "👩‍🍳 Cook together"];
const NO_LINES = ["Are you sure? 🥺", "Think again, Grace...", "That button looks nervous 😅", "Pretty please? 🥹", "You're breaking my heart 💔", "Okay the No button is shy now 🙈"];
/* ===================== */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);

// floating hearts & petals
const ICONS = ["💗", "💖", "🌸", "🌷", "💕", "🌹", "✨"];
setInterval(() => {
  const e = document.createElement("span");
  e.className = "fl"; e.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
  e.style.cssText = `left:${rnd(0, 97)}%;font-size:${rnd(16, 34)}px;animation-duration:${rnd(6, 12)}s`;
  $("#hearts").append(e); setTimeout(() => e.remove(), 12500);
}, 450);

// flowers growing along the bottom
$("#ground").innerHTML = Array.from({ length: 12 }, (_, i) => `<span style="animation-delay:${i * .25}s">${["🌷", "🌸", "🌼", "🌹", "🌺"][i % 5]}</span>`).join("");

function show(id) {
  $$(".scene").forEach(s => s.classList.toggle("active", s.id === id));
  if (id === "note") typeLetter();
  if (id === "flowers") buildBouquet();
  $$(".sticky").forEach(s => s.remove());
  if (id === "flowers") placeStickies();
}
$$("[data-go]").forEach(b => b.onclick = () => show(b.dataset.go));

// ---- the playful NO ----
let tries = 0;
const no = $("#no"), yes = $("#yes");
function dodge(e) {
  e.preventDefault();
  tries++;
  const s = Math.max(.35, 1 - tries * .1);
  no.style.position = "fixed";
  no.style.transform = `scale(${s})`;
  no.style.left = rnd(10, innerWidth - 110) + "px";
  no.style.top = rnd(80, innerHeight - 120) + "px";
  yes.style.transform = `scale(${Math.min(1.7, 1 + tries * .09)})`;
  setMood($("#m1"), "cry"); setTimeout(() => setMood($("#m1"), "normal"), 1400);
  $("#hint").textContent = NO_LINES[Math.min(tries - 1, NO_LINES.length - 1)];
  if (tries >= 9) no.style.display = "none";
}
["mouseenter", "touchstart", "click"].forEach(ev => no.addEventListener(ev, dodge, { passive: false }));

// ---- YES! ----
yes.onclick = () => {
  setMood($("#m1"), "happy");
  document.body.classList.add("yes");
  show("hub");
  for (let i = 0; i < 70; i++) setTimeout(() => confetti(), i * 25);
};
function confetti() {
  const e = document.createElement("span");
  e.className = "fl"; e.textContent = ["💖", "🌸", "🎉", "🌹", "💗", "🌷"][Math.floor(Math.random() * 6)];
  e.style.cssText = `left:${rnd(0, 95)}%;bottom:-20px;font-size:${rnd(22, 44)}px;animation-duration:${rnd(2.5, 5)}s;z-index:5`;
  $("#hearts").append(e); setTimeout(() => e.remove(), 5200);
}

// ---- love letter typewriter ----
let typing;
function typeLetter() {
  clearInterval(typing);
  const el = $("#letter"); el.textContent = ""; $("#sig").textContent = "";
  let i = 0;
  typing = setInterval(() => {
    el.textContent += LETTER[i++];
    el.parentElement.scrollTop = 1e5;
    if (i >= LETTER.length) { clearInterval(typing); $("#sig").textContent = "Yours, " + HIM + " 💗"; }
  }, 32);
}
$("#usnote").textContent = US_NOTE;

// ---- bouquet ----
function buildBouquet() {
  const f = ["🌸", "🌷", "🌹", "🌺", "🌼", "💐", "🌸", "🌷", "🌹"];
  $("#bouquet").innerHTML = f.map((x, i) => {
    const a = (i - 4) * 14, y = 20 + Math.abs(i - 4) * 14 + (i % 2) * 14;
    return `<span class="f" style="left:${88 + (i - 4) * 18}px;top:${y}px;rotate:${a}deg;animation-delay:${i * .2}s">${x}</span>`;
  }).join("") + `<div class="wrap"></div><div class="bow">🎀</div>`;
}
function placeStickies() {
  const pos = [[4, 22], [62, 18], [4, 62], [60, 60]];
  STICKIES.forEach((t, i) => {
    const d = document.createElement("div");
    d.className = "sticky"; d.textContent = t;
    d.style.cssText = `left:${pos[i][0]}%;top:${pos[i][1]}%;animation-delay:${i * .5}s;rotate:${i % 2 ? 3 : -3}deg`;
    document.body.append(d);
  });
}

// ---- date picker ----
let picks = new Set();
$("#chips").innerHTML = DATES.map(d => `<button class="chip">${d}</button>`).join("");
$$(".chip").forEach(c => c.onclick = () => { c.classList.toggle("on"); picks.has(c.textContent) ? picks.delete(c.textContent) : picks.add(c.textContent); });
$("#send").onclick = () => {
  const when = $("#when").value;
  if (!picks.size || !when) { $("#done").textContent = "Pick at least one plan and a day first 💕"; return; }
  const msg = `Yes! 💖 ${HER} here. Let's do: ${[...picks].join(', ')} on ${when}`;
  $("#done").textContent = "Perfect! Opening WhatsApp... just hit send 💌";
  setTimeout(() => { location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`; }, 700);
};

// ---- doodle mascot (original SVG, 3 moods) ----
function mascot(m) {
  const k = "#5a2a3a", eyes = { normal: `<circle cx="48" cy="70" r="3.4" fill="${k}"/><circle cx="72" cy="70" r="3.4" fill="${k}"/>`,
    happy: `<path d="M43 71q5-8 10 0M67 71q5-8 10 0" fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`,
    cry: `<path d="M43 66l9 4-9 4M77 66l-9 4 9 4" fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` }[m];
  const mouth = { normal: `<path d="M53 83q7 7 14 0" fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`,
    happy: `<path d="M50 80q10 16 20 0z" fill="#ff5c8a" stroke="${k}" stroke-width="3" stroke-linejoin="round"/>`,
    cry: `<ellipse cx="60" cy="90" rx="7" ry="9" fill="#ff5c8a" stroke="${k}" stroke-width="3"/><path d="M40 78q-3 12 0 18M80 78q3 12 0 18" stroke="#6ec6ff" stroke-width="4" stroke-linecap="round" fill="none"/>` }[m];
  const arms = m === "normal" ? `M31 98q-15 6-17 22M89 98q15 6 17 22` : m === "happy" ? `M31 92q-17-8-18-30M89 92q17-8 18-30` : `M33 80q-10-10-4-20M87 80q10-10 4-20`;
  return `<svg viewBox="0 0 120 150" class="doodle ${m}"><g fill="none" stroke="${k}" stroke-width="3" stroke-linecap="round"><path d="${arms}"/><path d="M47 118v20m26-20v20M40 140h14m12 0h14"/></g>
  <path d="M30 120C18 80 28 30 60 30s42 50 30 90z" fill="#fffaf5" stroke="${k}" stroke-width="3" stroke-linejoin="round"/>
  <g transform="translate(60 26)"><g fill="#ff7aa8" stroke="${k}" stroke-width="2"><circle cy="-9" r="6"/><circle cx="9" cy="-3" r="6"/><circle cx="6" cy="8" r="6"/><circle cx="-6" cy="8" r="6"/><circle cx="-9" cy="-3" r="6"/></g><circle r="5" fill="#ffd36b" stroke="${k}" stroke-width="2"/></g>
  ${eyes}${mouth}<ellipse cx="38" cy="82" rx="6" ry="4" fill="#ff9ab8" opacity=".7"/><ellipse cx="82" cy="82" rx="6" ry="4" fill="#ff9ab8" opacity=".7"/></svg>`;
}
function setMood(el, m) { el.dataset.mood = m; el.innerHTML = mascot(m); }
$$(".mascot").forEach(el => setMood(el, el.dataset.mood));
