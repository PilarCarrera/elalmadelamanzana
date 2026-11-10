/* =========================================================
   El Alma de la Manzana — portada
   (las fotos y la prensa están en datos.js)
   ========================================================= */

/* ---------- ESCENARIOS ----------
   pin:   dónde va la manzana en el mapa (px sobre la imagen de 1774×887)
   popup: dónde aparece el cartelito (x, y, ancho, alto)
   flecha: inicio de la flecha que va del cartelito a la manzana */
const ESCENARIOS = {
  cueto: {
    nombre: "Centro Cívico Juan de Santander", pueblo: "Santander (Cueto)", corto: "C. Cívico · Cueto",
    direccion: "Cueto, Santander, Cantabria",
    pin: [845, 222], etiqueta: [690, 200], popup: [272, 22, 395, 260], flecha: [655, 118],
  },
  breton: {
    nombre: "Sala Bretón", pueblo: "El Astillero", corto: "Sala Bretón · El Astillero",
    direccion: "Calle de la Industria, 12 · El Astillero, Cantabria",
    pin: [922, 292], etiqueta: [978, 342], popup: [1152, 22, 364, 236], flecha: [1165, 132],
  },
  concha: {
    nombre: "Casa de Cultura La Concha", pueblo: "Concha de Villaescusa", corto: "Casa de Cultura · Villaescusa",
    direccion: "La Concha, Villaescusa, Cantabria",
    pin: [737, 386], etiqueta: [746, 446], popup: [38, 352, 398, 256], flecha: [420, 440],
  },
  ramales: {
    nombre: "Fundación Orense", pueblo: "Ramales de la Victoria", corto: "F. Orense · Ramales",
    direccion: "Ramales de la Victoria, Cantabria",
    pin: [1160, 386], etiqueta: [1157, 446], popup: [1345, 358, 404, 292], flecha: [1358, 478],
  },
  reinosa: {
    nombre: "Teatro Principal", pueblo: "Reinosa", corto: "Teatro Principal · Reinosa",
    direccion: "Reinosa, Cantabria",
    pin: [760, 563], etiqueta: [722, 612], popup: [850, 628, 386, 236], flecha: [898, 652],
  },
};

/* ---------- ACTUACIONES ----------
   La web decide sola cuáles son "próximas" y cuáles "pasadas" según la fecha de hoy.
   fecha: "AAAA-MM-DD" o "AAAA-MM-DDTHH:MM" · fecha: null = actuamos allí pero no sabemos la fecha. */
const ACTUACIONES = [
  // ---- Pasadas (datos reales de la prensa) ----
  { fecha: "2024-11-30", escenario: "concha", titulo: "¡Estreno!",
    texto: "Estreno de «El Alma de la Manzana» en Villanueva de Villaescusa, el lugar que nos vio nacer: un proyecto social y escénico hecho por mujeres y cocinado «a fuego lento» desde 2020. ¡Lleno total!" },
  { fecha: "2025-01-18T19:00", escenario: "concha", titulo: "El Alma de la Manzana",
    texto: "Un proyecto teatral que parte del acto de desobediencia de Eva, con preguntas a personajes como Hipatia, Virginia Woolf o Marilyn Monroe y reflexiones sobre nuestras propias vivencias." },
  { fecha: "2025-01-25T19:00", escenario: "breton", titulo: "El Alma de la Manzana",
    texto: "Tras la cita en La Concha, llevamos el montaje a la Sala Bretón de El Astillero." },
  { fecha: "2025-06-06T19:30", escenario: "cueto", titulo: "El Alma de la Manzana",
    texto: "Un montaje colectivo para rescatar las historias de mujeres invisibilizadas: de Lilith y Eva a Hipatia. ¡Todo un éxito!" },
  { fecha: "2025-11-22T19:00", escenario: "ramales", titulo: "VI Jornadas contra la Violencia de Género",
    texto: "Un proyecto escénico que representa a las mujeres de la historia, como personas y no como personajes." },
  { fecha: null, escenario: "reinosa", titulo: "El Alma de la Manzana",
    texto: "Llevamos nuestras historias en femenino al escenario del Teatro Principal de Reinosa." },

  // ---- Próximas (INVENTADAS de momento: cámbialas por las reales) ----
  { fecha: "2026-11-21T20:00", escenario: "breton", titulo: "El Alma de la Manzana",
    puertas: "19:30", entrada: "Entrada libre hasta completar aforo",
    texto: "Una velada íntima de teatro y emoción, con escenas creadas por El alma de la manzana que celebran la memoria, la fuerza y la voz de las mujeres." },
  { fecha: "2026-11-27T20:00", escenario: "reinosa", titulo: "El Alma de la Manzana",
    puertas: "19:30", entrada: "Entrada libre hasta completar aforo",
    texto: "Teatro, música, danza y escritura para narrar historias de mujeres: desde la desobediencia de Eva hasta nuestras propias vivencias." },
  { fecha: "2026-12-12T19:00", escenario: "concha", titulo: "El Alma de la Manzana",
    puertas: "18:30", entrada: "Entrada libre hasta completar aforo",
    texto: "Volvemos a casa: Lilith, Eva, Hipatia o Virginia Woolf suben al escenario que nos vio nacer para reivindicar el papel de la mujer en la historia." },
  { fecha: "2027-01-23T19:30", escenario: "cueto", titulo: "El Alma de la Manzana",
    puertas: "19:00", entrada: "Entrada libre hasta completar aforo",
    texto: "Regresamos a Santander con nuestro montaje multidisciplinar: interpretación, música, escritura, fotografía, costura y danza." },
];

/* ========================================================= */

const MAP_W = 1774, MAP_H = 887;
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const smooth = () => (reduceMotion ? "auto" : "smooth");
const isPhone = () => innerWidth <= 960;

const EVENTS = ACTUACIONES.map((a, id) => {
  const base = { ...a, id, venue: ESCENARIOS[a.escenario] };
  if (!a.fecha) return { ...base, d: null, hasTime: false };
  const [ymd, hm] = a.fecha.split("T");
  const [y, m, d] = ymd.split("-").map(Number);
  const [h, mi] = hm ? hm.split(":").map(Number) : [0, 0];
  return { ...base, d: new Date(y, m - 1, d, h, mi), hasTime: !!hm };
});
const isFuture = ev => {
  if (!ev.d) return false;
  const end = new Date(ev.d); if (!ev.hasTime) end.setHours(23, 59);
  return end >= new Date();
};
const dated = EVENTS.filter(e => e.d).sort((a, b) => a.d - b.d);
const upcoming = dated.filter(isFuture);
const fullDate = d => d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
const dayText = d => cap(d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" }));

/* ---------- Scroll spy + revelado ---------- */
const navLinks = $$("#main-nav a");
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.hash === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

const revealer = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("visible"); revealer.unobserve(e.target); }
}), { threshold: .1 });
$$(".reveal, .section-title").forEach(el => revealer.observe(el));

/* ---------- Toast ---------- */
const toastEl = Object.assign(document.createElement("div"), { className: "toast" });
toastEl.setAttribute("role", "status");
document.body.appendChild(toastEl);
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg; toastEl.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1900);
}

/* ---------- Gestos de deslizar (móvil) ---------- */
function onSwipe(el, cb) {
  let x0 = null, y0 = null;
  el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) cb(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
}

/* ---------- Hero ---------- */
const poster = $("#poster");
if (!reduceMotion && matchMedia("(hover: hover)").matches) {
  poster.addEventListener("mousemove", e => {
    const r = poster.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    poster.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
  });
  poster.addEventListener("mouseleave", () => (poster.style.transform = ""));
}
poster.addEventListener("click", () => Lightbox.open([{ src: "images/cartel.png", caption: "Montaje teatral «El Alma de la Manzana»" }]));
$("#group-photo").addEventListener("click", () => Lightbox.open([{ src: "images/grupo.jpg", caption: "Las integrantes de El Alma de la Manzana" }]));

const rain = $(".apple-rain"), hero = $(".hero");
let caught = 0, heroVisible = true;
new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(hero);
function dropApple(fast = false) {
  if (reduceMotion || document.hidden) return;
  const a = document.createElement("img");
  a.src = "images/manzana.png"; a.alt = ""; a.className = "falling-apple"; a.title = "¡Atrápame!";
  a.style.left = Math.random() * 96 + "%";
  a.style.width = (isPhone() ? 18 : 22) + Math.random() * 24 + "px";
  a.style.opacity = .6 + Math.random() * .4;
  a.style.setProperty("--rot", (Math.random() < .5 ? -1 : 1) * (120 + Math.random() * 300) + "deg");
  a.style.animationDuration = (fast ? 3 : 8 + Math.random() * 6) + "s";
  a.addEventListener("click", () => {
    caught++; a.classList.add("popped");
    showToast(caught === 1 ? "¡Has atrapado una manzana! 🍎" : `¡${caught} manzanas atrapadas!`);
    setTimeout(() => a.remove(), 350);
  }, { once: true });
  a.addEventListener("animationend", e => { if (e.animationName === "fall") a.remove(); });
  rain.appendChild(a);
}
setInterval(() => { if (heroVisible && rain.children.length < (isPhone() ? 6 : 10)) dropApple(); }, 1600);
const titleApple = $(".title-apple");
titleApple.addEventListener("click", () => {
  titleApple.classList.remove("shake"); void titleApple.offsetWidth; titleApple.classList.add("shake");
  for (let i = 0; i < 12; i++) setTimeout(() => dropApple(true), i * 90);
});

/* ---------- ¿Qué queremos? y cartas de La obra ---------- */
$$(".wish").forEach(w => w.addEventListener("click", () => w.classList.toggle("open")));


/* =========================================================
   LA OBRA: puzle cuadrado de la manzana (cada pieza es una mujer)
   ========================================================= */
const MUJERES = [
  // fila 1 (3 piezas)
  { corto: "Lilith", nombre: "Lilith", tag: "La primera", anos: "", texto: "Según la tradición, la primera mujer de Adán, antes que Eva." },
  { corto: "Eva", nombre: "Eva", tag: "La desobediente", anos: "", texto: "«Hay que seguir mordiendo la manzana una y mil veces». De su acto de desobediencia parte toda la obra… y nuestro nombre." },
  { corto: "Hipatia", nombre: "Hipatia", tag: "La sabia", anos: "355–415", texto: "«La ignorancia es la madre de la cobardía y la esclavitud»" },
  // fila 2 (4 piezas)
  { corto: "Khutulun", nombre: "Khutulun", tag: "La guerrera", anos: "1260–1306", texto: "«Las chicas son guerreras»" },
  { corto: "Lavoisier", nombre: "Marie Lavoisier", tag: "La madre de la química", anos: "1758–1836", texto: "Marie Anne Pierrette Paulze, más conocida como Marie Lavoisier, «la madre de la química»." },
  { corto: "V. Woolf", nombre: "Virginia Woolf", tag: "La escritora", anos: "1882–1941", texto: "«No hay barrera, cerradura ni cerrojo que puedas imponer a la libertad de mi mente»" },
  { corto: "Meitner", nombre: "Lise Meitner", tag: "La física", anos: "1878–1968", texto: "La Marie Curie alemana: «No estudié física para fabricar una bomba»" },
  // fila 3 (4 piezas)
  { corto: "Marilyn", nombre: "Marilyn Monroe", tag: "La estrella", anos: "1926–1962", texto: "«De todo lo bueno que puedo agradecer, lo mejor ha sido ser una mujer»" },
  { corto: "Ginsburg", nombre: "Ruth B. Ginsburg", tag: "La jueza", anos: "1933–2020", texto: "«Tres mujeres valientes, tres luchadoras por recuperar la dignidad y la igualdad…»" },
  { corto: "Malintzin", nombre: "Malintzin", tag: "La intérprete", anos: "1500–1529", texto: "«…tres luchadoras por recuperar la dignidad y la igualdad, en nombre de todas las mujeres…»" },
  { corto: "Rosa Parks", nombre: "Rosa Parks", tag: "La valiente", anos: "1913–2005", texto: "«…que han sufrido y aún sufren discriminación»" },
  // fila 4 (3 piezas)
  { corto: "Wangari", nombre: "Wangari Maathai", tag: "Mamá Árbol", anos: "1940–2011", texto: "«Mi pequeña cosa es plantar árboles». Un gesto pequeño que logró cambiar el paisaje y la vida de muchas mujeres en África." },
  { corto: "Afganas", nombre: "Mujeres afganas", tag: "Un poema para ellas", anos: "", texto: "«Necesito respirar, quiero olvidar… Me limitas la visión a tu realidad…»" },
  { corto: "Nosotras", nombre: "Y nosotras", tag: "Yo no soy conocida", anos: "", texto: "«Porque todas soy yo, porque yo, sois todas»" },
];

(() => {
  const svg = $("#puzzle");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const S = 600;                         // lado del cuadrado
  const ROWS = [
    { y0: 0, y1: 150, n: 3 }, { y0: 150, y1: 300, n: 4 },
    { y0: 300, y1: 450, n: 4 }, { y0: 450, y1: 600, n: 3 },
  ];
  const colX = n => Array.from({ length: n + 1 }, (_, i) => S * i / n);

  // borde con pestaña de puzle
  function edge(u0, u1, v, tab, vertical) {
    const P = (u, w) => (vertical ? `${w.toFixed(1)},${u.toFixed(1)}` : `${u.toFixed(1)},${w.toFixed(1)}`);
    if (!tab) return ` L${P(u1, v)}`;
    const s = Math.sign(u1 - u0), { c, w, h } = tab;
    return ` L${P(c - s * w, v)}` +
      ` C${P(c - s * w * 0.3, v + h * 0.25)} ${P(c - s * w * 1.7, v + h)} ${P(c, v + h * 1.05)}` +
      ` C${P(c + s * w * 1.7, v + h)} ${P(c + s * w * 0.3, v + h * 0.25)} ${P(c + s * w, v)}` +
      ` L${P(u1, v)}`;
  }
  const mkTab = (len, center, dir) => len < 60 ? null : { c: center, w: Math.min(len * 0.12, 14), h: dir * Math.min(len * 0.17, 20) };
  const hBounds = ROWS.slice(0, -1).map((r, i) => {
    const xs = [...new Set([...colX(r.n), ...colX(ROWS[i + 1].n)].map(x => +x.toFixed(2)))].sort((a, b) => a - b);
    return xs.slice(0, -1).map((a, k) => ({ a, b: xs[k + 1], tab: mkTab(xs[k + 1] - a, (a + xs[k + 1]) / 2, (k + i) % 2 ? 1 : -1) }));
  });
  const hEdge = (segs, y, xa, xb) => {
    const fwd = xb > xa, lo = Math.min(xa, xb), hi = Math.max(xa, xb);
    let list = segs.filter(s => s.a >= lo - .01 && s.b <= hi + .01);
    if (!fwd) list = list.reverse();
    return list.map(s => fwd ? edge(s.a, s.b, y, s.tab, false) : edge(s.b, s.a, y, s.tab, false)).join("");
  };

  // la "imagen" del puzle: fondo de papel + la manzana dibujada en el centro
  const defs = el("defs");
  const scene = el("g", { id: "pz-scene" });
  const bgGrad = el("radialGradient", { id: "pz-bg", cx: "50%", cy: "45%", r: "70%" });
  bgGrad.append(el("stop", { offset: "0%", "stop-color": "#fffaf0" }), el("stop", { offset: "100%", "stop-color": "#f6dfe9" }));
  defs.appendChild(bgGrad);
  scene.append(
    el("rect", { width: S, height: S, fill: "url(#pz-bg)" }),
    el("image", { href: "images/manzana.png", x: 82, y: 34, width: 436, height: 502 }),
  );
  defs.appendChild(scene);
  svg.appendChild(defs);

  const pieces = [];
  let idx = 0;
  ROWS.forEach((r, ri) => {
    const xs = colX(r.n);
    for (let ci = 0; ci < r.n; ci++) {
      const x0 = xs[ci], x1 = xs[ci + 1], { y0, y1 } = r;
      const vTab = dir => mkTab(y1 - y0, (y0 + y1) / 2, dir);
      let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`;
      d += ri === 0 ? ` L${x1.toFixed(1)},${y0}` : hEdge(hBounds[ri - 1], y0, x0, x1);
      d += ci === r.n - 1 ? ` L${x1.toFixed(1)},${y1}` : edge(y0, y1, x1, vTab((ci + ri) % 2 ? 1 : -1), true);
      d += ri === ROWS.length - 1 ? ` L${x0.toFixed(1)},${y1}` : hEdge(hBounds[ri], y1, x1, x0);
      d += ci === 0 ? " Z" : edge(y1, y0, x0, vTab((ci - 1 + ri) % 2 ? 1 : -1), true) + " Z";

      const m = MUJERES[idx];
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const clipId = `pz-clip-${idx}`;
      const clip = el("clipPath", { id: clipId });
      clip.appendChild(el("path", { d }));
      defs.appendChild(clip);

      const out = el("g", { class: `pz-out pz-c${idx % 3}`, tabindex: 0, role: "button", "aria-label": `${m.nombre}: dar la vuelta a la pieza` });
      const dist = 160 + Math.random() * 140, th = Math.random() * Math.PI * 2;
      out.style.setProperty("--dx", `${(Math.cos(th) * dist).toFixed(0)}px`);
      out.style.setProperty("--dy", `${(Math.sin(th) * dist).toFixed(0)}px`);
      out.style.setProperty("--rot", `${((Math.random() - .5) * 70).toFixed(0)}deg`);
      out.style.setProperty("--delay", `${idx * 70}ms`);
      const pz = el("g", { class: "pz" });
      const face = el("use", { href: "#pz-scene", "clip-path": `url(#${clipId})`, class: "pz-face" });
      const back = el("path", { d, class: "pz-back" });
      const line = el("path", { d, class: "pz-line" });
      // nombre: completo si cabe, si no el corto
      const w = x1 - x0 - 40;
      let txt = m.nombre, fs = Math.min(18, w / (txt.length * 0.62));
      if (fs < 14) { txt = m.corto; fs = Math.min(18, w / (txt.length * 0.62)); }
      const label = el("text", { x: cx, y: cy, class: "pz-label", "text-anchor": "middle", "dominant-baseline": "middle", style: `font-size:${fs.toFixed(1)}px` });
      label.textContent = txt;
      pz.append(face, back, line, label);
      out.appendChild(pz);
      svg.appendChild(out);
      const i = idx;
      // al pasar por encima, la pieza se dibuja sobre todo lo demás (en SVG manda el orden del DOM)
      out.addEventListener("pointerenter", () => { if (svg.lastChild !== out) svg.appendChild(out); });
      out.addEventListener("click", e => { e.stopPropagation(); reveal(i); });
      out.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(i); } });
      pieces.push({ out, pz, cx, cy, row: ri });
      idx++;
    }
  });
  // el marco morado por encima de todo
  svg.appendChild(el("rect", { x: 1.5, y: 1.5, width: S - 3, height: S - 3, rx: 10, class: "pz-frame" }));

  // bocadillo con la descripción, dentro del propio puzle
  const bubble = $("#pz-bubble");
  const seen = new Set();
  let current = -1;
  const apples = $("#pi-apples");
  MUJERES.forEach(() => apples.appendChild(Object.assign(document.createElement("span"), { className: "pi-apple" })));

  function updateProgress() {
    $$(".pi-apple", apples).forEach((a, k) => a.classList.toggle("on", seen.has(k)));
    $("#pi-count").textContent = seen.size === MUJERES.length
      ? "¡Has completado el alma de la manzana! 🍎"
      : `${seen.size} de ${MUJERES.length} piezas descubiertas`;
    $("#pi-reset").hidden = seen.size === 0;
  }
  function showBubble(i) {
    const m = MUJERES[i], p = pieces[i];
    current = i;
    $("#pb-tag").textContent = m.tag;
    $("#pb-name").textContent = m.nombre;
    $("#pb-years").textContent = m.anos;
    $("#pb-years").hidden = !m.anos;
    $("#pb-text").textContent = m.texto;
    const below = p.row < 2;                       // filas de arriba: bocadillo debajo
    bubble.classList.toggle("below", below);
    bubble.classList.toggle("above", !below);
    const left = Math.min(Math.max(p.cx / S * 100, 30), 70);
    bubble.style.left = left + "%";
    bubble.style.setProperty("--arrow", `${50 + (p.cx / S * 100 - left) / 0.6}%`);
    bubble.style.top = below ? ((p.cy + 52) / S * 100) + "%" : "";
    bubble.style.bottom = below ? "" : ((S - p.cy + 52) / S * 100) + "%";
    bubble.hidden = false;
    bubble.classList.remove("swap"); void bubble.offsetWidth; bubble.classList.add("swap");
    pieces.forEach((q, k) => q.out.classList.toggle("current", k === i));
  }
  function hideBubble() {
    bubble.hidden = true; current = -1;
    pieces.forEach(q => q.out.classList.remove("current"));
  }
  function flipBack(i) {
    const { pz } = pieces[i];
    seen.delete(i);
    svg.classList.remove("complete");
    pz.classList.remove("flip-anim"); void pz.getBoundingClientRect(); pz.classList.add("flip-anim");
    setTimeout(() => pz.classList.remove("flipped"), reduceMotion ? 0 : 260);
    if (current === i) hideBubble();
    updateProgress();
  }
  function reveal(i, fromNav = false) {
    // pulsar de nuevo una pieza ya girada la devuelve a su cara de manzana
    if (!fromNav && seen.has(i)) return flipBack(i);
    const { pz } = pieces[i];
    if (!seen.has(i)) {
      seen.add(i);
      pz.classList.remove("flip-anim"); void pz.getBoundingClientRect(); pz.classList.add("flip-anim");
      setTimeout(() => pz.classList.add("flipped"), reduceMotion ? 0 : 260);
      if (seen.size === MUJERES.length) setTimeout(() => { svg.classList.add("complete"); showToast("¡Has completado el alma de la manzana! 🍎"); }, 700);
    }
    showBubble(i);
    updateProgress();
  }
  $("#pb-close").addEventListener("click", e => { e.stopPropagation(); hideBubble(); });
  $("#pb-prev").addEventListener("click", e => { e.stopPropagation(); reveal((current - 1 + MUJERES.length) % MUJERES.length, true); });
  $("#pb-next").addEventListener("click", e => { e.stopPropagation(); reveal((current + 1) % MUJERES.length, true); });
  bubble.addEventListener("click", e => e.stopPropagation());
  document.addEventListener("click", () => { if (current >= 0) hideBubble(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && current >= 0) hideBubble(); });
  $("#pi-reset").addEventListener("click", e => {
    e.stopPropagation();
    seen.clear(); hideBubble();
    pieces.forEach(p => p.pz.classList.remove("flipped", "flip-anim"));
    svg.classList.remove("complete", "assembled");
    updateProgress();
    setTimeout(() => svg.classList.add("assembled"), 60);
  });
  updateProgress();

  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) { svg.classList.add("assembled"); obs.disconnect(); }
  }, { threshold: .3 }).observe(svg);
})();

/* =========================================================
   PRÓXIMAS ACTUACIONES: calendario interactivo + tarjeta
   ========================================================= */
const calDays = $("#cal-days"), calMonth = $("#cal-month"), calSub = $("#cal-sub"), calJump = $("#cal-jump");
const card = $("#event-card");
const start = upcoming[0] || dated[dated.length - 1];
let viewY = (start?.d || new Date()).getFullYear();
let viewM = (start?.d || new Date()).getMonth();
let selected = null;

function renderCalendar(dir = 0) {
  calMonth.textContent = cap(MESES[viewM]);
  const monthEvents = dated.filter(e => e.d.getFullYear() === viewY && e.d.getMonth() === viewM);
  const nFut = monthEvents.filter(isFuture).length;
  calSub.textContent = `${viewY} · ` + (nFut ? (nFut === 1 ? "1 próxima actuación" : `${nFut} próximas actuaciones`)
    : monthEvents.length ? "Actuaciones pasadas" : "Sin actuaciones este mes");

  calDays.innerHTML = "";
  const offset = (new Date(viewY, viewM, 1).getDay() + 6) % 7; // lunes = 0
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const today = new Date();
  const empty = () => Object.assign(document.createElement("div"), { className: "cal-day empty" });

  for (let i = 0; i < offset; i++) calDays.appendChild(empty());
  for (let day = 1; day <= daysInMonth; day++) {
    const ev = monthEvents.find(e => e.d.getDate() === day);
    let cell;
    if (ev) {
      cell = document.createElement("button");
      cell.className = "cal-day" + (isFuture(ev) ? "" : " past") + (selected?.id === ev.id ? " selected" : "");
      cell.innerHTML = `<span class="num">${day}</span><img class="mini-apple" src="images/manzana.png" alt=""><span class="lbl">${ev.venue.corto}</span>`;
      cell.setAttribute("aria-label", `${dayText(ev.d)}: ${ev.venue.nombre}, ${ev.venue.pueblo}`);
      cell.addEventListener("click", () => {
        selectEvent(ev);
        if (isPhone()) card.scrollIntoView({ behavior: smooth(), block: "start" });
      });
    } else {
      cell = document.createElement("div");
      cell.className = "cal-day";
      cell.innerHTML = `<span class="num">${day}</span>`;
    }
    if (viewY === today.getFullYear() && viewM === today.getMonth() && day === today.getDate()) cell.classList.add("today");
    calDays.appendChild(cell);
  }
  const rest = (7 - ((offset + daysInMonth) % 7)) % 7;
  for (let i = 0; i < rest; i++) calDays.appendChild(empty());

  // botón "ir a la próxima" si este mes no tiene funciones próximas
  const next = upcoming[0];
  calJump.hidden = !next || nFut > 0;

  if (dir) {
    calDays.style.setProperty("--from", dir > 0 ? "24px" : "-24px");
    calDays.classList.remove("slide"); void calDays.offsetWidth; calDays.classList.add("slide");
  }
}

function shiftMonth(n) {
  viewM += n;
  if (viewM < 0) { viewM = 11; viewY--; }
  if (viewM > 11) { viewM = 0; viewY++; }
  renderCalendar(n);
}
$("#cal-prev").addEventListener("click", () => shiftMonth(-1));
$("#cal-next").addEventListener("click", () => shiftMonth(1));
onSwipe($(".cute-card.cal"), shiftMonth);
calJump.addEventListener("click", () => upcoming[0] && selectEvent(upcoming[0]));

function selectEvent(ev) {
  selected = ev;
  const moved = ev.d.getFullYear() !== viewY || ev.d.getMonth() !== viewM;
  viewY = ev.d.getFullYear(); viewM = ev.d.getMonth();
  renderCalendar(moved ? 1 : 0);
  renderCard();
}

function renderCard() {
  const ev = selected;
  if (!ev) return;
  const future = isFuture(ev);
  const isNext = upcoming[0]?.id === ev.id;
  $("#ev-label").textContent = future ? (isNext ? "Próxima actuación" : "Actuación") : "Actuación pasada";
  $("#ev-logo").src = `images/logos/${ev.escenario}.png`;
  $("#ev-logo").alt = ev.venue.nombre;
  $("#ev-date").textContent = dayText(ev.d) + (future ? "" : ` de ${ev.d.getFullYear()}`);
  $("#ev-time").textContent = ev.hasTime ? `${ev.d.getHours()}:${String(ev.d.getMinutes()).padStart(2, "0")} h` : "Hora por confirmar";
  $("#ev-place").textContent = ev.venue.nombre;
  $("#ev-address").textContent = ev.venue.direccion;
  $("#ev-desc").innerHTML = (future ? "" : `<span class="past-stamp">¡Ya actuamos aquí!</span><br>`) + (ev.texto || "");
  $("#ev-doors").textContent = ev.puertas ? `Apertura de puertas: ${ev.puertas} h` : "";
  $("#ev-entry").textContent = ev.entrada || "";
  $("#ev-facts").hidden = !future || (!ev.puertas && !ev.entrada);
  $("#ev-save").hidden = !future;
  $("#ev-map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.venue.nombre + ", " + ev.venue.direccion);
  card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
}

$("#ev-save").addEventListener("click", () => selected && downloadICS(selected));
function downloadICS(ev) {
  const pad = n => String(n).padStart(2, "0");
  const local = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const localT = d => `${local(d)}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//El Alma de la Manzana//ES", "BEGIN:VEVENT",
    `UID:${ev.id}-${local(ev.d)}@elalmadelamanzana`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`];
  if (ev.hasTime) lines.push(`DTSTART;TZID=Europe/Madrid:${localT(ev.d)}`, `DTEND;TZID=Europe/Madrid:${localT(new Date(ev.d.getTime() + 90 * 60000))}`);
  else { const n = new Date(ev.d); n.setDate(n.getDate() + 1); lines.push(`DTSTART;VALUE=DATE:${local(ev.d)}`, `DTEND;VALUE=DATE:${local(n)}`); }
  lines.push(`SUMMARY:${ev.titulo} · El Alma de la Manzana`, `LOCATION:${ev.venue.nombre}, ${ev.venue.direccion}`, "END:VEVENT", "END:VCALENDAR");
  const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
  Object.assign(document.createElement("a"), { href: url, download: "el-alma-de-la-manzana.ics" }).click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Fecha guardada en tu calendario 📅");
}

if (start) selectEvent(start); else renderCalendar();

/* =========================================================
   GALERÍA: carrusel
   ========================================================= */
const track = $("#slider-track"), nextBtn = $("#slider-next"), prevBtn = $("#slider-prev"), seeAll = $("#see-all");
let nextClicks = 0;
FOTOS.slice(0, 6).forEach((src, i) => {
  const b = document.createElement("button");
  b.className = "slide";
  b.innerHTML = `<img src="${src}" alt="Foto ${i + 1} de la galería" loading="lazy">`;
  b.addEventListener("click", () => Lightbox.open(FOTOS, i));
  track.appendChild(b);
});
const allTile = Object.assign(document.createElement("a"), { className: "slide-all", href: "galeria.html" });
allTile.innerHTML = `<img src="images/manzana.png" alt=""><span>Ver toda la galería</span>`;
track.appendChild(allTile);

function slideTo(dir) {
  const items = [...track.children], cur = track.scrollLeft;
  const target = dir > 0 ? items.find(el => el.offsetLeft > cur + 5) : [...items].reverse().find(el => el.offsetLeft < cur - 5);
  track.scrollTo({ left: target ? target.offsetLeft : (dir > 0 ? track.scrollWidth : 0), behavior: smooth() });
}
nextBtn.addEventListener("click", () => {
  nextClicks++;
  slideTo(1);
  if (nextClicks >= 4) { nextBtn.hidden = true; seeAll.hidden = false; }
});
prevBtn.addEventListener("click", () => slideTo(-1));
track.addEventListener("scroll", () => {
  prevBtn.hidden = track.scrollLeft < 10;
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) { nextBtn.hidden = true; seeAll.hidden = false; }
}, { passive: true });

/* =========================================================
   ACTUACIONES PASADAS: mapa con manzanas
   ========================================================= */
const map = $("#map"), arrow = $("#map-arrow");
const pct = (v, total) => (v / total) * 100 + "%";
let openVenue = null;

Object.entries(ESCENARIOS).forEach(([key, v]) => {
  const evs = EVENTS.filter(e => e.escenario === key).sort((a, b) => (a.d || 0) - (b.d || 0));

  const pin = document.createElement("button");
  pin.className = "map-apple";
  pin.dataset.venue = key;
  pin.style.left = pct(v.pin[0], MAP_W); pin.style.top = pct(v.pin[1], MAP_H);
  pin.setAttribute("aria-label", `${v.nombre}, ${v.pueblo}`);
  pin.setAttribute("aria-expanded", "false");
  pin.innerHTML = `<img src="images/manzana.png" alt="">`;
  pin.addEventListener("click", e => { e.stopPropagation(); toggleVenue(key); });

  const label = document.createElement("span");
  label.className = "map-label";
  label.style.left = pct(v.etiqueta[0], MAP_W); label.style.top = pct(v.etiqueta[1], MAP_H);
  label.textContent = v.pueblo;

  const [x, y, w] = v.popup;
  const pop = document.createElement("div");
  pop.className = "map-popup";
  pop.dataset.venue = key;
  Object.assign(pop.style, { left: pct(x, MAP_W), top: pct(y, MAP_H), width: pct(w, MAP_W) });
  const chips = evs.map(e => isFuture(e)
    ? `<li class="soon">Próxima: ${dayText(e.d)}</li>`
    : `<li>${e.d ? fullDate(e.d) : "¡Hemos actuado aquí! 🍎"}</li>`).join("");
  pop.innerHTML = `<button class="map-close" aria-label="Cerrar">×</button><img src="images/popups/${key}.png" alt="${v.nombre} · ${v.pueblo}"><ul class="map-dates">${chips}</ul>`;
  pop.addEventListener("click", e => e.stopPropagation());
  $(".map-close", pop).addEventListener("click", closeVenue);

  map.append(label, pin, pop);
});

function toggleVenue(key) {
  if (openVenue === key) return closeVenue();
  openVenue = key;
  const v = ESCENARIOS[key];
  $$(".map-popup", map).forEach(p => p.classList.toggle("open", p.dataset.venue === key));
  $$(".map-apple", map).forEach(p => {
    const on = p.dataset.venue === key;
    p.classList.toggle("active", on); p.setAttribute("aria-expanded", on);
  });
  // flecha curva del cartelito a la manzana (solo ordenador)
  const [sx, sy] = v.flecha, [ex, ey] = v.pin;
  const mx = (sx + ex) / 2, my = (sy + ey) / 2;
  const nx = -(ey - sy), ny = ex - sx, len = Math.hypot(nx, ny) || 1;
  const bend = .18 * Math.hypot(ex - sx, ey - sy);
  const cx = mx + (nx / len) * bend, cy = my + (ny / len) * bend;
  arrow.setAttribute("d", `M${sx} ${sy} Q${cx} ${cy} ${ex - (ex - cx) * .08} ${ey + 18 - (ey - cy) * .08}`);
  const L = arrow.getTotalLength();
  arrow.style.transition = "none";
  arrow.style.strokeDasharray = L; arrow.style.strokeDashoffset = L;
  arrow.getBoundingClientRect();
  arrow.style.transition = reduceMotion ? "none" : "stroke-dashoffset .6s ease-out";
  arrow.style.strokeDashoffset = 0;
  arrow.style.opacity = 1;
}
function closeVenue() {
  openVenue = null;
  $$(".map-popup", map).forEach(p => p.classList.remove("open"));
  $$(".map-apple", map).forEach(p => { p.classList.remove("active"); p.setAttribute("aria-expanded", "false"); });
  arrow.style.opacity = 0;
}
document.addEventListener("click", e => { if (openVenue && !map.contains(e.target)) closeVenue(); });
map.addEventListener("click", e => { if (e.target === map || e.target.classList.contains("map-img")) closeVenue(); });
addEventListener("keydown", e => { if (e.key === "Escape" && openVenue) closeVenue(); });
// en móvil, cierra el cartelito al salir de la sección
new IntersectionObserver(([e]) => { if (!e.isIntersecting && openVenue) closeVenue(); }).observe($("#pasadas"));

/* =========================================================
   PRENSA: carrusel de citas
   ========================================================= */
const pTrack = $("#press-track"), pDots = $("#press-dots");
const citas = PRENSA.filter(p => p.cita);
let pIndex = 0, pTimer;
citas.forEach((p, i) => {
  const q = document.createElement("figure");
  q.className = "quote" + (i === 0 ? " active" : "");
  q.innerHTML = `<blockquote>${p.cita}</blockquote><cite>— ${p.medio}, ${fechaLarga(p.fecha)}</cite>`;
  pTrack.appendChild(q);
  const d = document.createElement("button");
  d.setAttribute("aria-label", `Cita ${i + 1}`);
  if (i === 0) d.className = "active";
  d.addEventListener("click", () => goPress(i));
  pDots.appendChild(d);
});
function goPress(i) {
  pIndex = (i + citas.length) % citas.length;
  $$(".quote", pTrack).forEach((q, k) => q.classList.toggle("active", k === pIndex));
  $$("button", pDots).forEach((d, k) => d.classList.toggle("active", k === pIndex));
  restartPress();
}
function restartPress() { clearInterval(pTimer); pTimer = setInterval(() => goPress(pIndex + 1), 6000); }
$(".carousel-btn.prev").addEventListener("click", () => goPress(pIndex - 1));
$(".carousel-btn.next").addEventListener("click", () => goPress(pIndex + 1));
$(".press-carousel").addEventListener("mouseenter", () => clearInterval(pTimer));
$(".press-carousel").addEventListener("mouseleave", restartPress);
onSwipe(pTrack, dir => goPress(pIndex + dir));
restartPress();

/* =========================================================
   CONTACTO
   ========================================================= */
const form = $("#contact-form"), msg = form.mensaje;
msg.addEventListener("input", () => ($(".char-count", form).textContent = `${msg.value.length} / 600`));
function validate(field) {
  const err = field.closest("label").querySelector(".error");
  let text = "";
  if (field.required && !field.value.trim()) text = "Este campo es obligatorio.";
  else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) text = "Introduce un correo válido.";
  field.classList.toggle("invalid", !!text);
  if (err) err.textContent = text;
  return !text;
}
$$("[required]", form).forEach(f => f.addEventListener("blur", () => validate(f)));
// los mensajes se envían por Web3Forms (clave pública: solo permite enviar al correo registrado)
const WEB3FORMS_KEY = "cfa1dbb4-9d9a-475a-ac7e-a31836447ebe";
form.addEventListener("submit", async e => {
  e.preventDefault();
  const ok = $(".form-success", form), fail = $(".form-fail", form), btn = $("button[type=submit]", form);
  ok.hidden = fail.hidden = true;
  if (!$$("[required]", form).map(validate).every(Boolean)) { $(".invalid", form)?.focus(); return; }
  btn.disabled = true; btn.textContent = "Enviando…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Web El alma de la manzana: ${form.motivo.value} — ${form.nombre.value}`,
        from_name: "Web El alma de la manzana",
        nombre: form.nombre.value,
        email: form.email.value,
        motivo: form.motivo.value,
        mensaje: form.mensaje.value,
        botcheck: form.botcheck.checked,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || res.status);
    ok.hidden = false;
    form.reset();
    $(".char-count", form).textContent = "0 / 600";
  } catch (err) {
    console.error("Error al enviar el formulario:", err);
    fail.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = "Enviar mensaje";
  }
});
