(() => {
  const accordionAIData = [
    { title: "ChatGPT (OpenAI)",    color: "#534AB7", tagColor: { bg: "#EEEDFE", text: "#3C3489" }, tags: ["Kreativ skrivning", "Kodning", "Forklaring"],          description: "ChatGPT er særligt stærk til generel tekstgenerering, brainstorming og kreativ skrivning. Den er god til at forklare komplekse emner på en letforståelig måde, hjælpe med e-mails, essays og kode. GPT-4 understøtter også billedforståelse og kan bruges med plugins til søgning og dataanalyse." },
    { title: "Claude (Anthropic)",  color: "#0F6E56", tagColor: { bg: "#E1F5EE", text: "#085041" }, tags: ["Dokumentanalyse", "Lang kontekst", "Sikkerhed"],       description: "Claude er fremragende til lange og komplekse dokumenter — analyse, opsummering og nuanceret skrivning. Den er designet til at være sikker og hjælpsom og klarer sig særligt godt med store kontekstvinduer, kodegennemgang og dybdegående diskussioner. Velegnet til forskning og faglig rådgivning." },
    { title: "Gemini (Google)",     color: "#185FA5", tagColor: { bg: "#E6F1FB", text: "#0C447C" }, tags: ["Multimodal", "Google-integration", "Research"],        description: "Gemini er tæt integreret med Googles tjenester som Search, Docs og Gmail. Den er god til multimodale opgaver — tekst, billeder og lyd på én gang. Særligt stærk til research med adgang til realtidssøgning og dataindsamling. Velegnet til produktivitetsopgaver i Google Workspace." },
    { title: "Copilot (Microsoft)", color: "#BA7517", tagColor: { bg: "#FAEEDA", text: "#633806" }, tags: ["Office 365", "Automatisering", "Erhverv"],             description: "Microsoft Copilot er specialiseret i produktivitet i Office-pakken — Word, Excel, PowerPoint og Teams. Den kan automatisere mødenoter, lave præsentationer og analysere regneark. Velegnet til virksomhedsmiljøer hvor Microsoft 365 er centralt. Bygger på GPT-4 og har søgning via Bing." },
    { title: "Perplexity AI",       color: "#993C1D", tagColor: { bg: "#FAECE7", text: "#712B13" }, tags: ["Søgning", "Faktacheck", "Realtid"],                    description: "Perplexity er en AI-drevet søgemaskine der kombinerer sprogmodeller med realtidssøgning. Den er ideel til research og faktacheck, da den altid citerer sine kilder. Perfekt til at få hurtige, opdaterede svar med links til videre læsning. Fungerer som et stærkt alternativ til traditionel websøgning." },
  ];

  function el(tag, cls, props = {}) {
    const e = tag.includes(":")
      ? document.createElementNS("http://www.w3.org/2000/svg", tag.split(":")[1])
      : document.createElement(tag);
    if (cls) e.className = cls;
    Object.assign(e, props);
    return e;
  }

  function createAccordionAI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`AccordionAI: ingen element med id "${containerId}"`);

    container.classList.add("accordionAI-container");
    const wrapper = el("div", "accordionAI-wrapper");

    accordionAIData.forEach((item) => {
      const accItem = el("div", "accordionAI-item");
      const btn     = el("button", "accordionAI-btn");
      const left    = el("span", "accordionAI-btn-left");
      const dot     = el("span", "accordionAI-dot");
      const title   = el("span");
      const icon    = el("svg:svg", "accordionAI-icon");
      const body    = el("div", "accordionAI-body");
      const desc    = el("p", null, { textContent: item.description });
      const tagsDiv = el("div", "accordionAI-tags");

      dot.style.background = item.color;
      title.textContent    = item.title;
      desc.style.margin    = "0";

      icon.setAttribute("viewBox", "0 0 20 20");
      icon.setAttribute("width", "20");
      icon.setAttribute("height", "20");
      icon.setAttribute("fill", "none");
      icon.setAttribute("stroke", "currentColor");
      icon.setAttribute("stroke-width", "2");
      icon.innerHTML = '<line x1="10" y1="4" x2="10" y2="16"/><line x1="4" y1="10" x2="16" y2="10"/>';

      item.tags.forEach((t) => {
        const tag = el("span", "accordionAI-tag", { textContent: t });
        tag.style.cssText = `background:${item.tagColor.bg};color:${item.tagColor.text}`;
        tagsDiv.appendChild(tag);
      });

      left.append(dot, title);
      btn.append(left, icon);
      body.append(desc, tagsDiv);
      accItem.append(btn, body);

      btn.addEventListener("click", () => {
        const isOpen = accItem.classList.contains("open");
        wrapper.querySelectorAll(".accordionAI-item.open").forEach((e) => e.classList.remove("open"));
        if (!isOpen) accItem.classList.add("open");
      });

      wrapper.appendChild(accItem);
    });

    container.appendChild(wrapper);
  }

  document.addEventListener("DOMContentLoaded", () => createAccordionAI("accordionAI-container"));
})();