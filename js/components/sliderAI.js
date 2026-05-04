/*
  ============================================================
  sliderAI.js — Billedslider med auto-afspilning
  ============================================================

  SÅDAN VIRKER DET:
  Scriptet bygger en slider direkte i DOM'en. Der vises ét
  hovedbillede ad gangen med forrige og næste billede delvist
  synlige bagved. Billederne skifter automatisk hvert 3.
  sekund. Man kan også skifte manuelt med pilene eller klikke
  på sidevisningerne. Hovedbilledet er et klikbart link.
  En knap lader brugeren stoppe og starte auto-afspilning.

  OPSÆTNING:
  Tilføj dette i din HTML der hvor du vil have slideren:
    <div id="sliderAI-container"></div>

  Inkluder i din HTML før </body>:
    <script src="sliderAI.js"></script>
  ============================================================

  TILPASNING — hvad du kan ændre:
  ─────────────────────────────────────────────────────────
  sliderAIData   → selve indholdet — tilføj, fjern eller
                   rediger billeder her. Hvert objekt har:
                   - src:        sti til billedfilen
                   - alt:        alternativ tekst (tilgængelighed)
                   - heading:    overskrift under hovedbilledet
                   - bodyText:   beskrivelsestekst under overskriften
                   - buttonLink: URL som hovedbilledet linker til

  3000           → antal millisekunder mellem hvert billedskift
                   Find det i: setInterval(() => go(1), 3000)
                   Eks: 5000 = 5 sekunder, 1000 = 1 sekund

  "⏸ Stop"       → teksten på stop-knappen når den kører
  "▶ Afspil"     → teksten på knappen når den er stoppet
  "‹" / "›"      → symbolerne på pile-knapperne

  "sliderAI-container" → id'et på din HTML-container.
                         Skift det nederst i filen hvis du
                         bruger et andet id.

  Størrelser og farver → styres i sliderAI.css
  ─────────────────────────────────────────────────────────
*/

(() => {

  // ─── DATA ───────────────────────────────────────────────
  // Hvert objekt = ét billede i slideren
  // Tilføj eller fjern objekter for flere/færre billeder
  const sliderAIData = [
    { src: "assets/images/coffee1.jpg", alt: "Coffee image", heading: "Nærværd",         bodyText: "Beskrivelse der siger noget om billedet", buttonLink: "https://www.dr.dk"   },
    { src: "assets/images/coffee2.jpg", alt: "Coffee image", heading: "Selvtid",          bodyText: "text, text og text...",                  buttonLink: "https://www.tv2.dk"  },
    { src: "assets/images/coffee3.jpg", alt: "Coffee image", heading: "Samværd og hygge", bodyText: "Måske noget med kaffe",                  buttonLink: "https://www.saxo.dk" },
  ];

  function createSliderAI(id) {
    const container = document.getElementById(id);
    if (!container) return console.error(`SliderAI: ingen element med id "${id}"`);

    // ─── HJÆLPEFUNKTION ─────────────────────────────────
    // mk() opretter et HTML element med klasse og egenskaber i ét kald
    const mk = (tag, cls, p = {}) => Object.assign(document.createElement(tag), { className: cls ?? "", ...p });

    const total = sliderAIData.length;

    // cur = indeks på det aktuelle billede
    // playing = om auto-afspilning er aktiv
    // timer = reference til setInterval så vi kan stoppe den
    let cur = 0, playing = true, timer;

    // ─── ELEMENTER ──────────────────────────────────────
    // De tre billeder — main vises forrest, prev/next bagved
    const mainImg   = mk("img",    "sliderAI-main-img");
    const prevImg   = mk("img",    "sliderAI-side sliderAI-side-prev");
    const nextImg   = mk("img",    "sliderAI-side sliderAI-side-next");

    // Tekst under hovedbilledet
    const capH      = mk("h3");
    const capP      = mk("p");

    // Pile-knapper og stop/start knap
    // ← skift "‹" og "›" for andre pile-symboler
    const btnPrev   = mk("button", "sliderAI-arrow",  { textContent: "‹" });
    const btnNext   = mk("button", "sliderAI-arrow",  { textContent: "›" });
    const btnToggle = mk("button", "sliderAI-toggle", { textContent: "⏸ Stop" });

    // ─── LOGIK ──────────────────────────────────────────
    // idx() sikrer at indekset altid wrapper rundt (uendelig loop)
    const idx  = n   => (n + total) % total;

    // go() skifter til et billede — dir: 1 = frem, -1 = tilbage
    const go   = dir => { cur = idx(cur + dir); render(); };

    // stop() og play() styrer auto-afspilningen
    const stop = ()  => clearInterval(timer);

    // ← skift 3000 for hurtigere/langsommere auto-afspilning (millisekunder)
    const play = ()  => { timer = setInterval(() => go(1), 3000); };

    // render() opdaterer alle billeder og tekst til det aktuelle indeks
    function render() {
      const c = sliderAIData[cur];

      // Sætter src, alt og klik-link på hovedbilledet
      // c er kort for sliderAIData[cur]
      Object.assign(mainImg, { src: c.src, alt: c.alt, onclick: () => window.open(c.buttonLink, "_blank") });

      // Sætter forrige og næste billede i sidevisningerne
      Object.assign(prevImg, { src: sliderAIData[idx(cur - 1)].src, alt: sliderAIData[idx(cur - 1)].alt, onclick: () => go(-1) });
      Object.assign(nextImg, { src: sliderAIData[idx(cur + 1)].src, alt: sliderAIData[idx(cur + 1)].alt, onclick: () => go(1)  });

      // Opdaterer teksten under billedet
      capH.textContent = c.heading;
      capP.textContent = c.bodyText;
    }

    // ─── KNAP-HANDLERS ──────────────────────────────────
    // Pilene stopper timeren, skifter billede, starter igen hvis playing
    btnPrev.onclick   = () => { stop(); go(-1); if (playing) play(); };
    btnNext.onclick   = () => { stop(); go(1);  if (playing) play(); };

    // Toggle-knappen skifter mellem stop og afspil
    // ← skift teksten "⏸ Stop" og "▶ Afspil" her hvis ønsket
    btnToggle.onclick = () => {
      playing = !playing;
      playing ? (play(),  btnToggle.textContent = "⏸ Stop")
              : (stop(),  btnToggle.textContent = "▶ Afspil");
    };

    // ─── DOM OPBYGNING ──────────────────────────────────
    // Samler alle elementer i den rigtige rækkefølge og indsætter i containeren
    const sides    = mk("div", "sliderAI-sides");
    const track    = mk("div", "sliderAI-track");
    const caption  = mk("div", "sliderAI-caption");
    const controls = mk("div", "sliderAI-controls");
    const wrap     = mk("div", "sliderAI-wrapper");

    sides.append(prevImg, nextImg);           // sidevisninger
    track.append(mainImg, sides);             // main + sidevisninger
    caption.append(capH, capP);              // overskrift + tekst
    controls.append(btnPrev, btnToggle, btnNext); // pile + knap
    wrap.append(track, caption, controls);   // alt samlet
    container.appendChild(wrap);

    // ─── START ──────────────────────────────────────────
    render(); // tegner det første billede med det samme
    play();   // starter auto-afspilning
  }

  // Venter på at hele HTML-dokumentet er indlæst før den kører
  // ← skift "sliderAI-container" hvis dit container-id er anderledes
  document.addEventListener("DOMContentLoaded", () => createSliderAI("sliderAI-container"));

})();