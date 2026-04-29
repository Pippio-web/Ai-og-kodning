(() => {
  const sliderAIData = [
    { src: "assets/images/coffee1.jpg", alt: "Coffee image", heading: "Nærværd",         bodyText: "Beskrivelse der siger noget om billedet", buttonLink: "https://www.dr.dk"   },
    { src: "assets/images/coffee2.jpg", alt: "Coffee image", heading: "Selvtid",          bodyText: "text, text og text...",                  buttonLink: "https://www.tv2.dk"  },
    { src: "assets/images/coffee3.jpg", alt: "Coffee image", heading: "Samværd og hygge", bodyText: "Måske noget med kaffe",                  buttonLink: "https://www.saxo.dk" },
  ];

  function createSliderAI(id) {
    const container = document.getElementById(id);
    if (!container) return console.error(`SliderAI: ingen element med id "${id}"`);

    const mk = (tag, cls, p = {}) => Object.assign(document.createElement(tag), { className: cls ?? "", ...p });
    const total = sliderAIData.length;
    let cur = 0, playing = true, timer;

    const mainImg   = mk("img",    "sliderAI-main-img");
    const prevImg   = mk("img",    "sliderAI-side sliderAI-side-prev");
    const nextImg   = mk("img",    "sliderAI-side sliderAI-side-next");
    const capH      = mk("h3");
    const capP      = mk("p");
    const btnPrev   = mk("button", "sliderAI-arrow",  { textContent: "‹" });
    const btnNext   = mk("button", "sliderAI-arrow",  { textContent: "›" });
    const btnToggle = mk("button", "sliderAI-toggle", { textContent: "⏸ Stop" });

    const idx  = n   => (n + total) % total;
    const go   = dir => { cur = idx(cur + dir); render(); };
    const stop = ()  => clearInterval(timer);
    const play = ()  => { timer = setInterval(() => go(1), 4000); };

    function render() {
      const c = sliderAIData[cur];
      Object.assign(mainImg, { src: c.src, alt: c.alt, onclick: () => window.open(c.buttonLink, "_blank") });
      Object.assign(prevImg, { src: sliderAIData[idx(cur - 1)].src, alt: sliderAIData[idx(cur - 1)].alt, onclick: () => go(-1) });
      Object.assign(nextImg, { src: sliderAIData[idx(cur + 1)].src, alt: sliderAIData[idx(cur + 1)].alt, onclick: () => go(1)  });
      capH.textContent = c.heading;
      capP.textContent = c.bodyText;
    }

    btnPrev.onclick   = () => { stop(); go(-1); if (playing) play(); };
    btnNext.onclick   = () => { stop(); go(1);  if (playing) play(); };
    btnToggle.onclick = () => {
      playing = !playing;
      playing ? (play(),  btnToggle.textContent = "⏸ Stop")
              : (stop(),  btnToggle.textContent = "▶ Afspil");
    };

    const sides    = mk("div", "sliderAI-sides");
    const track    = mk("div", "sliderAI-track");
    const caption  = mk("div", "sliderAI-caption");
    const controls = mk("div", "sliderAI-controls");
    const wrap     = mk("div", "sliderAI-wrapper");

    sides.append(prevImg, nextImg);
    track.append(mainImg, sides);
    caption.append(capH, capP);
    controls.append(btnPrev, btnToggle, btnNext);
    wrap.append(track, caption, controls);
    container.appendChild(wrap);

    render();
    play();
  }

  document.addEventListener("DOMContentLoaded", () => createSliderAI("sliderAI-container"));
})();