/*
  ============================================================
  binaryBg.js — Animeret binær regn-baggrund
  ============================================================

  SÅDAN VIRKER DET:
  Scriptet opretter et <canvas> element og indsætter det inde
  i den container du vælger. Canvas'et fylder hele containeren
  og tegner løbende 0'er og 1'er der falder ned i kolonner —
  ligesom "The Matrix". Hvert frame tegnes et halvgennemsigtigt
  mørkt lag henover hele canvas, så ældre tegn langsomt toner
  ud og skaber en "hale-effekt" bag hvert faldende tegn.

  OPSÆTNING:
  1. Tilføj et id til den HTML-container du vil bruge:
       <section id="hero"> ... </section>

  2. Inkluder scriptet i din HTML før </body>:
       <script src="binaryBg.js"></script>

  3. Skift TARGET_ID nedenfor til id'et på din container.

  Det er alt — scriptet håndterer resten selv.
  ============================================================

  TILPASNING — hvad du kan ændre:
  ─────────────────────────────────────────────────────────
  TARGET_ID   → id'et på den container baggrunden skal sidde i

  BG_COLOR    → baggrundsfarven på canvas (hex)
                Standard: "#03051a" (meget mørk blå/sort)
                Eksempel:  "#000000" = helt sort
                           "#0a0a0f" = mørk gråblå

  COLORS      → array med neon-farver på tegnene
                Standard: cyan, lyseblå, grøn, himmelblå, neongrøn
                Du kan tilføje/fjerne farver eller skifte hex-koder
                Eksempel:  ["#ff00ff", "#ff0066"] = pink/magenta tema

  FADE_ALPHA  → hvor hurtigt halen forsvinder (0.01 – 0.3)
                Lavere = længere hale, højere = kortere hale
                Standard: 0.07

  FONT_SIZE   → størrelsen på 0'erne og 1'erne i pixels
                Standard: 14  |  Større tal = færre kolonner

  SPEED       → hvor hurtigt tegnene falder ned
                Standard: 0.6  |  Prøv 0.3 (langsom) eller 1.5 (hurtig)

  GLOW        → styrken på neon-gløden rundt om hvert tegn (pixels)
                Standard: 8  |  0 = ingen gløde, 20 = meget kraftig

  INTERVAL    → antal millisekunder mellem hvert frame
                Standard: 40 (= ca. 25 fps)
                Lavere = mere flydende men tyngere for browseren
  ─────────────────────────────────────────────────────────
*/

(() => {
  const TARGET_ID  = "hero";        // ← SKIFT TIL DIT CONTAINER-ID
  const BG_COLOR   = "#440624";     // ← Baggrundsfarve
 const COLORS = ["#93f02f", "#f05db0", "#15390c", "#26422b", "#06ad3b"]; // ← Neon-farver
  const FADE_ALPHA = 0.07;          // ← Hale-længde (0.01 – 0.3)
  const FONT_SIZE  = 18;            // ← Størrelse på tegn i pixels
  const SPEED      = 0.6;           // ← Faldehastighed
  const GLOW       = 8;             // ← Neon-gløde styrke
  const INTERVAL   = 100;            // ← Millisekunder mellem frames

  // Konverterer hex til r,g,b så vi kan bruge FADE_ALPHA i draw()
  const hex2rgb = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16)).join(",");
  const BG_RGB  = hex2rgb(BG_COLOR);

  const canvas = document.createElement("canvas");
  canvas.id = "binaryBg";
  canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;background:${BG_COLOR};`;

  const ctx = canvas.getContext("2d");
  let cols, drops, target;

  // Tilpasser canvas-størrelsen når vinduet ændres
  function resize() {
    canvas.width  = target.offsetWidth;
    canvas.height = target.offsetHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }

  // Returnerer farve baseret på tegnets position:
  // øverst = hvid (nyfødt), midten = neon, bunden = mørk (toner ud)
  function getColor(y) {
    const ratio = y / canvas.height;
    if (ratio < 0.3) return "#ffffff";
    if (ratio < 0.6) return COLORS[Math.floor(Math.random() * COLORS.length)];
    return "BG_COLOR";
  }

  function draw() {
    // Halvgennemsigtigt lag skaber hale-effekten — ældre tegn toner ud
    ctx.fillStyle = `rgba(${BG_RGB}, ${FADE_ALPHA})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = Math.random() > 0.5 ? "1" : "0";
      const x = i * FONT_SIZE;
      const y = drops[i] * FONT_SIZE;

      ctx.shadowColor = COLORS[i % COLORS.length];
      ctx.shadowBlur  = GLOW;
      ctx.fillStyle   = getColor(y);
      ctx.fillText(char, x, y);

      // 2.5% chance for at starte forfra når tegnet når bunden
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += SPEED;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    target = document.getElementById(TARGET_ID);
    if (!target) return console.error(`binaryBg: ingen element med id "${TARGET_ID}"`);

    target.style.position = "relative";
    target.style.overflow = "hidden";
    target.prepend(canvas);

    resize();
    setInterval(draw, INTERVAL);
    window.addEventListener("resize", resize);
  });
})();