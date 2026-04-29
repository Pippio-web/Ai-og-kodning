(() => {
  const el = (tag, cls, p = {}) =>
    Object.assign(document.createElement(tag), { className: cls ?? "", ...p });

  async function createCardAI(id) {
    const container = document.getElementById(id);
    if (!container) return console.error(`CardAI: ingen element med id "${id}"`);

    const data    = await fetch("Data/Cards.json").then(r => r.json());
    const wrapper = el("div", "cardAI-wrapper");

    data.forEach(({ src, alt, heading, bodyText, buttonLink }) => {
      const link = Object.assign(el("a", "cardAI-img-link"), {
        href:   buttonLink,
        target: "_blank",
        rel:    "noopener noreferrer",
      });

      const body = el("div", "cardAI-body");

      link.appendChild(el("img", null, { src, alt }));
      body.append(
        el("h3", "cardAI-heading", { textContent: heading  }),
        el("p",  "cardAI-text",    { textContent: bodyText })
      );

      const card = el("div", "cardAI-item");
      card.append(link, body);
      wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
  }

  document.addEventListener("DOMContentLoaded", () => createCardAI("cardAI-container"));
})();