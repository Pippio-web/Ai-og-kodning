/*
  ============================================================
  accordionAI.js — Accordion med AI-oversigt
  ============================================================

  SÅDAN VIRKER DET:
  Scriptet bygger en accordion direkte i DOM'en via JavaScript.
  Hvert punkt har en knap der åbner/lukker et tekstfelt med
  beskrivelse og tags. Kun ét punkt kan være åbent ad gangen.
  CSS-klassen "open" styrer hvad der er synligt — JS tilføjer
  og fjerner den klasse når man klikker.

  OPSÆTNING:
  Tilføj dette i din HTML der hvor du vil have accordionen:
    <div id="accordionAI-container"></div>

  Inkluder i din HTML før </body>:
    <script src="js/components/accordionAI.js"></script>
  ============================================================

  TILPASNING — hvad du kan ændre:
  ─────────────────────────────────────────────────────────
  accordionAIData  → selve indholdet — tilføj, fjern eller
                     rediger punkter her. Hvert punkt har:
                     - title:       overskriften på knappen
                     - color:       farven på den lille prik
                     - tagColor:    { bg, text } farver på tags
                     - tags:        array med korte nøgleord
                     - description: brødteksten der vises

  "accordionAI-container"  → id'et på din HTML-container,
                             skift det nederst i filen hvis
                             du bruger et andet id
  ─────────────────────────────────────────────────────────
*/

(() => {

  // ─── DATA ───────────────────────────────────────────────
  // Hvert objekt = ét accordion-punkt
  const accordionAIData = [
    { title: "ChatGPT (OpenAI)",    color: "#534AB7", tagColor: { bg: "#EEEDFE", text: "#3C3489" }, tags: ["Kreativ skrivning", "Kodning", "Forklaring"],          description: "ChatGPT er særligt stærk til generel tekstgenerering, brainstorming og kreativ skrivning. Den er god til at forklare komplekse emner på en letforståelig måde, hjælpe med e-mails, essays og kode. GPT-4 understøtter også billedforståelse og kan bruges med plugins til søgning og dataanalyse." },
    { title: "Claude (Anthropic)",  color: "#0F6E56", tagColor: { bg: "#E1F5EE", text: "#085041" }, tags: ["Dokumentanalyse", "Lang kontekst", "Sikkerhed"],       description: "Claude er fremragende til lange og komplekse dokumenter — analyse, opsummering og nuanceret skrivning. Den er designet til at være sikker og hjælpsom og klarer sig særligt godt med store kontekstvinduer, kodegennemgang og dybdegående diskussioner. Velegnet til forskning og faglig rådgivning." },
    { title: "Gemini (Google)",     color: "#185FA5", tagColor: { bg: "#E6F1FB", text: "#0C447C" }, tags: ["Multimodal", "Google-integration", "Research"],        description: "Gemini er tæt integreret med Googles tjenester som Search, Docs og Gmail. Den er god til multimodale opgaver — tekst, billeder og lyd på én gang. Særligt stærk til research med adgang til realtidssøgning og dataindsamling. Velegnet til produktivitetsopgaver i Google Workspace." },
    { title: "Copilot (Microsoft)", color: "#BA7517", tagColor: { bg: "#FAEEDA", text: "#633806" }, tags: ["Office 365", "Automatisering", "Erhverv"],             description: "Microsoft Copilot er specialiseret i produktivitet i Office-pakken — Word, Excel, PowerPoint og Teams. Den kan automatisere mødenoter, lave præsentationer og analysere regneark. Velegnet til virksomhedsmiljøer hvor Microsoft 365 er centralt. Bygger på GPT-4 og har søgning via Bing." },
    { title: "Perplexity AI",       color: "#993C1D", tagColor: { bg: "#FAECE7", text: "#712B13" }, tags: ["Søgning", "Faktacheck", "Realtid"],                    description: "Perplexity er en AI-drevet søgemaskine der kombinerer sprogmodeller med realtidssøgning. Den er ideel til research og faktacheck, da den altid citerer sine kilder. Perfekt til at få hurtige, opdaterede svar med links til videre læsning. Fungerer som et stærkt alternativ til traditionel websøgning." },
  ];

  // ─── HJÆLPEFUNKTION ─────────────────────────────────────
  // el() opretter et HTML eller SVG element med klasse og egenskaber
  // tag med ":" = SVG element (fx "svg:svg"), ellers HTML element
  function el(tag, cls, props = {}) {
    const e = tag.includes(":")
      ? document.createElementNS("http://www.w3.org/2000/svg", tag.split(":")[1])
      : document.createElement(tag);
    if (cls) e.className = cls;
    Object.assign(e, props);
    return e;
  }

  // ─── ACCORDION BYGGER ───────────────────────────────────
  // Finder containeren i DOM og bygger hele accordionen ind i den
  function createAccordionAI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`AccordionAI: ingen element med id "${containerId}"`);

    container.classList.add("accordionAI-container");
    const wrapper = el("div", "accordionAI-wrapper");

    // Løber hvert datapunkt igennem og bygger et accordion-punkt
    accordionAIData.forEach((item) => {

      // Elementer til knappen (titel-rækken)
      const accItem = el("div",    "accordionAI-item");
      const btn     = el("button", "accordionAI-btn");
      const left    = el("span",   "accordionAI-btn-left");
      const dot     = el("span",   "accordionAI-dot");       // farvet prik
      const title   = el("span");
      const icon    = el("svg:svg","accordionAI-icon");      // plus/kryds ikon

      // Elementer til kroppen (indholdet der åbner sig)
      const body    = el("div",    "accordionAI-body");
      const desc    = el("p", null, { textContent: item.description });
      const tagsDiv = el("div",    "accordionAI-tags");

      // Sætter farve og tekst på knappens elementer
      dot.style.background = item.color;
      title.textContent    = item.title;
      desc.style.margin    = "0";

      // Bygger SVG plus-ikonet der roterer til kryds når åben
      icon.setAttribute("viewBox", "0 0 20 20");
      icon.setAttribute("width",   "20");
      icon.setAttribute("height",  "20");
      icon.setAttribute("fill",    "none");
      icon.setAttribute("stroke",  "currentColor");
      icon.setAttribute("stroke-width", "2");
      icon.innerHTML = '<line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/>';

      // Opretter et tag-element per nøgleord og tilføjer det til tagsDiv
      item.tags.forEach((t) => {
        const tag = el("span", "accordionAI-tag", { textContent: t });
        tag.style.cssText = `background:${item.tagColor.bg};color:${item.tagColor.text}`;
        tagsDiv.appendChild(tag);
      });

      // Samler alle elementer i den rigtige rækkefølge
      left.append(dot, title);
      btn.append(left, icon);
      body.append(desc, tagsDiv);
      accItem.append(btn, body);

      // Klik-handler: lukker alle åbne punkter, åbner det klikkede
      btn.addEventListener("click", () => {
        const isOpen = accItem.classList.contains("open");
        wrapper.querySelectorAll(".accordionAI-item.open").forEach(e => e.classList.remove("open"));
        if (!isOpen) accItem.classList.add("open");
      });

      wrapper.appendChild(accItem);
    });

    container.appendChild(wrapper);
  }

  // ─── START ──────────────────────────────────────────────
  // Venter på at hele HTML-dokumentet er indlæst før den kører
  document.addEventListener("DOMContentLoaded", () => createAccordionAI("accordionAI-container"));

})();