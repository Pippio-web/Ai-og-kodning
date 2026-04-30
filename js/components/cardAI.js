/*
  ============================================================
  cardAI.js — Cards der henter data fra en JSON fil
  ============================================================

  SÅDAN VIRKER DET:
  Scriptet henter indhold fra en JSON fil og bygger et card
  for hvert objekt i filen. Hvert card har et billede øverst
  der fungerer som et klikbart link, samt en overskrift og
  en beskrivelsestekst nedenunder. Alle tre cards vises side
  om side i et grid.

  OPSÆTNING:
  Tilføj dette i din HTML der hvor du vil have cards:
    <div id="cardAI-container"></div>

  Inkluder i din HTML før </body>:
    <script src="cardAI.js"></script>
  ============================================================

  TILPASNING — hvad du kan ændre:
  ─────────────────────────────────────────────────────────
  "Data/Cards.json"  → stien til din JSON fil. Skift denne
                       hvis din fil ligger et andet sted.
                       Eks: "assets/data/cards.json"

  JSON filens struktur — hvert objekt skal have:
    src:        sti til billedet  (eks: "assets/images/img.jpg")
    alt:        alternativ tekst til billedet (vigtigt for tilgængelighed)
    heading:    overskriften på cardet
    bodyText:   beskrivelsesteksten på cardet
    buttonLink: den URL billedet linker til når man klikker

  "cardAI-container"  → id'et på din HTML-container.
                        Skift det nederst i filen hvis du
                        bruger et andet id.

  Styling → al størrelse, farve og layout styres i cardAI.css
  ─────────────────────────────────────────────────────────
*/

(() => {

  // ─── HJÆLPEFUNKTION ─────────────────────────────────────
  // el() opretter et HTML element med klasse og egenskaber i ét kald
  const el = (tag, cls, p = {}) =>
    Object.assign(document.createElement(tag), { className: cls ?? "", ...p });

  // ─── CARD BYGGER ────────────────────────────────────────
  // Henter JSON data og bygger et card per objekt i filen
  async function createCardAI(id) {
    const container = document.getElementById(id);
    if (!container) return console.error(`CardAI: ingen element med id "${id}"`);

    // Henter data fra JSON filen — stien kan ændres her
    const data    = await fetch("Data/Cards.json").then(r => r.json());
    const wrapper = el("div", "cardAI-wrapper");

    // Løber hvert dataobjekt igennem og bygger ét card
    data.forEach(({ src, alt, heading, bodyText, buttonLink }) => {

      // Billedet pakkes ind i et <a> link der åbner i ny fane
      const link = Object.assign(el("a", "cardAI-img-link"), {
        href:   buttonLink,  // ← linket kommer fra JSON
        target: "_blank",    // åbner i ny fane
        rel:    "noopener noreferrer", // sikkerhed ved eksternt link
      });

      // Selve billedet indsættes i linket
      link.appendChild(el("img", null, { src, alt }));

      // Tekstindholdet — overskrift og beskrivelse
      const body = el("div", "cardAI-body");
      body.append(
        el("h3", "cardAI-heading", { textContent: heading  }),
        el("p",  "cardAI-text",    { textContent: bodyText })
      );

      // Samler link og tekstindhold i ét card og tilføjer til wrapper
      const card = el("div", "cardAI-item");
      card.append(link, body);
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  // ─── START ──────────────────────────────────────────────
  // Venter på at hele HTML-dokumentet er indlæst før den kører
  document.addEventListener("DOMContentLoaded", () => createCardAI("cardAI-container"));

})();