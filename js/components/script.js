// template function
const sliderTemplate = () => {
 return `
        <img class="image-in-slider" src="assets/images/coffee1.jpg" alt="">
        <h1 class="heading">Overskrift</h1>
        <button class="slider__button__link"><a class="slider-link" href="http://www.dr.dk" target="blank">Se mere</a></button>
        <div class="slider__numberOf"></div>
        
        <div class="slider-buttons">
            <button class="previous">  &#8249; </button>
           
            <button class="next">   &#8250; </button>
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

let currentImageIndex = 0;

let images = [
  {
    src: "assets/images/coffee1.jpg",
    alt: "Coffee image",
    heading: "overskrift",
    bodyText: "brødtext...",
    buttonLink: "https://www.dr.dk",
  },
  {
    src: "assets/images/coffee2.jpg",
    alt: "Coffee image",
    heading: "overskrift 1",
    bodyText: "brødtext...",
    buttonLink: "https://www.tv2.dk",
  },
  {
    src: "assets/images/coffee3.jpg",
    alt: "Coffee image",
    heading: "overskrift 2",
    bodyText: "brødtext...",
    buttonLink: "https://www.saxo.dk",
  },
];

// Sørger for at putte src atrubutten på img tagget i html'en
function setActiveSlide() {
  imageInSlider.src = images[currentImageIndex].src;
  imageInSlider.alt = images[currentImageIndex].alt + [currentImageIndex + 1];
  sliderLink.href = images[currentImageIndex].buttonLink;
  picOfPictures.innerHTML = [currentImageIndex + 1] + " af " + images.length;
  heading.textContent = images[currentImageIndex].heading;
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

/*  */
