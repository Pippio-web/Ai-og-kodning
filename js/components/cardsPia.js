const cardsContainer = document.querySelector(".cards__container__pia");


const accordionsData = [
 

accordionsData.forEach(({ titel, bodytext }) => {
  accordionsContainer.insertAdjacentHTML(
    "beforeend",
    `
        <details name="requirements" class="accordion">
        <summary class="accordion__heading">${titel}</summary>
        <p class="accordion__content">${bodytext}</p>
    </details>
    `,
  );
});


      <div class="card">
        <img src="" alt="" />
        <div class="heading"></div>
        <div class="darkgray">
          <p class="bodyText"> <br /><a href="" class="buttonLink">se mere ...</a></p>
        </div>
      </div>
    </div>


    let currentImageIndex = 0;

let images = [
  {
    src: "assets/images/coffee1.jpg",
    alt: "Coffee image",
    heading: "Nærværd",
    bodyText: "Beskrivelse der siger noget om billedet",
    buttonLink: "https://www.dr.dk",
  },
  {
    src: "assets/images/coffee2.jpg",
    alt: "Coffee image",
    heading: "Selvtid",
    bodyText: "text, text og text...",
    buttonLink: "https://www.tv2.dk",
  },
  {
    src: "assets/images/coffee3.jpg",
    alt: "Coffee image",
    heading: "Samværd og hygge",
    bodyText: "Måske noget med kaffe",
    buttonLink: "https://www.saxo.dk",
  },
];


// Sørger for at putte src, mm. atrubutten på img tagget i html'en
function setActiveSlide() {
  imageInSlider.src = images[currentImageIndex].src;
  imageInSlider.alt = images[currentImageIndex].alt + [currentImageIndex + 1];
  sliderLink.href = images[currentImageIndex].buttonLink;
  picOfPictures.innerHTML = [currentImageIndex + 1] + " af " + images.length;
  heading.textContent = images[currentImageIndex].heading;
  bodyText.textContent = images[currentImageIndex].bodyText;
}

// Kører/kalder funktionen
setActiveSlide();

// funktionen sørger for at currentImageIndex skifter værdi, så billedet i slideren skifter
const next = () => {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }

  setActiveSlide();
};