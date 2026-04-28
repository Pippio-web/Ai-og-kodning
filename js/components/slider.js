// template function
const sliderTemplate = () => {
 return `
        <img class="image-in-slider" src="assets/images/coffee1.jpg" alt="">
        <h3 class="heading bodyText__h3"></h3>
        <p class="bodyText bodyText__p"></p>
        <button class="slider__button__link slider__button"><a class="slider-link" href="http://www.dr.dk" target="blank">Se mere</a></button>
        <div class="slider__numberOf"></div>
        
        <div class="slider-buttons">
            <button class="previous slider__button">  &#8249; </button>
           
            <button class="next slider__button">   &#8250; </button>
        </div>
    `
};
const sliderContainer = document.querySelector('.slider-container')
sliderContainer.innerHTML = sliderTemplate()
// document.querySelector('.slider-container').innerHTML = sliderTemplate()

const btnNextSlide = document.querySelector(".next");
const btnPreviousSlide = document.querySelector(".previous");

const imageInSlider = document.querySelector(".image-in-slider");
const sliderLink = document.querySelector(".slider-link");
const picOfPictures = document.querySelector(".slider__numberOf");
const heading = document.querySelector(".heading");
const bodyText = document.querySelector(".bodyText")

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

// next funktionen kører hver 3. sekund - derfor skifter billedet i slideren hver 3. sekund
/* setInterval(next, 3000) */

btnNextSlide.addEventListener("click", next);

// brug piletaster på keyboard til at skifte billeder med
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    next();
  } else if (event.key === "ArrowLeft") {
    previous();
  }
});

// Hvis currentImageIndex er større end 0, currentImageIndex --
// Ellers, skal currentImageIndex være lig med indexnummeret på det sidste billede i rækken.

const previous = () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = images.length - 1;
  }
  setActiveSlide();
};

btnPreviousSlide.addEventListener("click", previous);
