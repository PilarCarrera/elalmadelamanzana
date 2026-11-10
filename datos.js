/* =========================================================
   DATOS COMPARTIDOS (portada, galeria.html y prensa.html)
   ========================================================= */

/* ---------- FOTOS DE LA GALERÍA ----------
   Para añadir fotos: cópialas en la carpeta images/galeria/
   y añade aquí su nombre. Da igual si son horizontales o verticales.
   Las 6 primeras salen en el carrusel de la portada. */
const FOTOS = [
  "images/galeria/foto-02.jpg",
  "images/galeria/foto-03.jpg",
  "images/galeria/foto-04.jpg",
  "images/galeria/foto-05.jpg",
  "images/galeria/foto-06.jpg",
  "images/galeria/foto-07.jpg",
  "images/galeria/foto-08.jpg",
  "images/galeria/foto-09.jpg",
  "images/galeria/foto-10.jpg",
  "images/galeria/foto-11.jpg",
  "images/galeria/foto-12.jpg",
  "images/galeria/foto-13.jpg",
  "images/galeria/foto-14.jpg",
  "images/galeria/foto-15.jpg",
  "images/galeria/foto-16.jpg",
  "images/galeria/foto-17.jpg",
  "images/galeria/foto-18.jpg",
  "images/galeria/foto-19.jpg",
  "images/galeria/foto-20.jpg",
  "images/galeria/foto-21.jpg",
  "images/galeria/foto-22.jpg",
  "images/galeria/foto-23.jpg",
  "images/galeria/foto-24.jpg",
  "images/galeria/foto-25.jpg",
  "images/galeria/foto-26.jpg",
  "images/galeria/foto-27.jpg",
  "images/galeria/foto-28.jpg",
  "images/galeria/foto-29.jpg",
  "images/galeria/foto-30.jpg",
  "images/galeria/foto-31.jpg",
  "images/galeria/foto-32.jpg",
  "images/galeria/foto-33.jpg",
  "images/galeria/foto-34.jpg",
  "images/galeria/foto-35.jpg",
  "images/galeria/foto-36.jpg",
  "images/galeria/foto-37.jpg",
  "images/galeria/foto-38.jpg",
  "images/galeria/foto-39.jpg",
  "images/galeria/foto-40.jpg",
  "images/galeria/foto-41.jpg",
  "images/galeria/foto-42.jpg",
  "images/galeria/foto-43.jpg",
  "images/galeria/foto-44.jpg",
  "images/galeria/foto-45.jpg",
  "images/galeria/foto-46.jpg",
  "images/galeria/foto-47.jpg",
  "images/galeria/foto-48.jpg",
  "images/galeria/foto-49.jpg",
  "images/galeria/foto-50.jpg",
];

/* ---------- PRENSA ----------
   Artículos reales encontrados en internet sobre El Alma de la Manzana.
   "cita" es lo que aparece en el carrusel de la portada. */
const PRENSA = [
  {
    medio: "Cantabria Press", fecha: "2025-06-07",
    titular: "Éxito de la representación de «El Alma de la Manzana» en el Centro Cultural de Cueto «Juan de Santander»",
    cita: "De éxito se puede calificar la actuación.",
    resumen: "Las actrices amateur del colectivo reivindican el importante papel que la mujer ha tenido en la historia de la humanidad.",
    url: "https://www.cantabriapress.com/cultura/exito-de-la-representacion-de-el-alma-de-la-manzana-en-el-centro-cultural-de-cueto-juan-de-santander",
  },
  {
    medio: "El Faradio", fecha: "2025-06-04",
    titular: "‘El Alma de la Manzana’ llega a Santander: un montaje colectivo para rescatar las historias de mujeres invisibilizadas",
    cita: "Un montaje colectivo para rescatar las historias de mujeres invisibilizadas.",
    resumen: "Estreno en Santander, en el Centro Cívico Juan de Santander (Cueto), con entrada libre hasta completar aforo.",
    url: "https://www.elfaradio.com/2025/06/04/el-alma-de-la-manzana-llega-a-santander-un-montaje-colectivo-para-rescatar-las-historias-de-mujeres-invisibilizadas/",
  },
  {
    medio: "Santander Creativa", fecha: "2025-06-06",
    titular: "«El Alma de la Manzana», una propuesta artística multidisciplinar",
    cita: "Una propuesta artística multidisciplinar que une interpretación, música, escritura, fotografía, costura o danza para narrar historias de mujeres.",
    resumen: "Agenda cultural de Santander: función en el Centro Cívico Juan de Santander (Cueto).",
    url: "https://www.santandercreativa.com/eventos/el-alma-de-la-manzana-una-propuesta-artistica-multidisciplinar",
  },
  {
    medio: "El Faradio", fecha: "2025-01-16", autor: "Oscar Allende",
    titular: "El proyecto teatral feminista ‘El alma de la manzana’ se abre al público este sábado en La Concha de Villaescusa",
    cita: "Es un proyecto teatral que parte del acto de desobediencia de Eva.",
    resumen: "Historias vistas, sentidas, pensadas y representadas por mujeres, generando espacios seguros de encuentro, colaboración, ayuda, aprendizaje y cuidado.",
    url: "https://www.elfaradio.com/2025/01/16/el-proyecto-teatral-feminista-el-alma-de-la-manzana-se-abre-al-publico-este-sabado-en-la-concha-de-villaescusa/",
  },
  {
    medio: "El Diario Montañés", fecha: "2025-01-15", autor: "E. Tresgallo",
    titular: "El alma de la manzana, un proyecto social y escénico hecho por mujeres",
    cita: "El alma de la manzana somos un grupo de mujeres que hemos querido poner en valor nuestros talentos.",
    resumen: "Una propuesta escénica cargada de preguntas sobre personajes históricos con nombre de mujer o estrellas como Marilyn Monroe, cocinada «a fuego lento».",
    imagen: "images/prensa-diario-montanes.jpg",
  },
  {
    medio: "Ayuntamiento de Ramales de la Victoria", fecha: "2025-11-15",
    titular: "VI Jornadas contra la Violencia de Género 2025",
    cita: "Un proyecto escénico que representa a las mujeres de la historia.",
    resumen: "El Alma de la Manzana actúa el sábado 22 de noviembre a las 19:00 h en el salón de actos de la Fundación Orense.",
    url: "https://aytoramales.org/vi-jornadas-contra-la-violencia-de-genero-2025/",
  },
  {
    medio: "El Faradio", fecha: "2024-11-24", autor: "Oscar Allende",
    titular: "25N: Mujeres mayores, el asociacionismo rural o las migrantes ensanchan el movimiento feminista",
    resumen: "El alma de la manzana, proyecto teatral puesto en marcha por un grupo de mujeres, anuncia su estreno el 30 de noviembre en Villanueva de Villaescusa.",
    url: "https://www.elfaradio.com/2024/11/24/25n-mujeres-mayores-el-asociacionismo-rural-o-las-migrantes-ensanchan-el-movimiento-feminista/",
  },
];

/* ---------- utilidades comunes ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fechaLarga = iso => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
};

// Menú móvil + cabecera
(() => {
  const header = $(".site-header"), toggle = $(".menu-toggle"), nav = $("#main-nav");
  if (!header) return;
  addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 20), { passive: true });
  toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();

// Lightbox (visor de fotos)
const Lightbox = (() => {
  const lb = $("#lightbox");
  if (!lb) return { open() {} };
  const img = $("#lb-img"), cap = $("#lb-caption");
  let list = [], i = 0, lastFocus;
  const render = () => {
    const it = list[i];
    img.classList.remove("zoomed");
    img.src = it.src; img.alt = it.caption || ""; cap.textContent = it.caption || "";
    $$(".lb-nav", lb).forEach(b => (b.style.visibility = list.length > 1 ? "visible" : "hidden"));
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus?.focus(); };
  const step = d => { i = (i + d + list.length) % list.length; render(); };
  img.addEventListener("click", () => img.classList.toggle("zoomed"));
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => step(-1));
  $(".lb-next", lb).addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  return {
    open(items, index = 0) {
      list = items.map(x => (typeof x === "string" ? { src: x } : x)); i = index; lastFocus = document.activeElement;
      render(); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb-close", lb).focus();
    },
  };
})();
