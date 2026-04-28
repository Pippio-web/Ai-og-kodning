// template function
const cardTemplate = () => {
  return `
        
        <p class="bodyText bodyText__p"></p>
        
   
        
    

        <div class="card-in-slider" class="card">
        <img src="" alt="" />
        <h3 class="card__heading card__bodyText__h3"></h3>
        <div class="lightgrey"></div>
        <div class="darkgray">
          <p  class="card__bodyText card__bodyText__p"><br /> <a class="card-link" href="" target="blank">se mere ...</a></p>
        </div>
      </div>
    </div>
    `;
};
const cardContainer = document.querySelector(".cards__container__pia");
cardContainer.innerHTML = cardTemplate();
// document.querySelector('.slider-container').innerHTML = sliderTemplate()

const cardInSlider = document.querySelector(".card-in-slider");
const cardLink = document.querySelector(".card-link");

const cardHeading = document.querySelector(".card__heading");
const cardBodyText = document.querySelector(".card__bodyText");


let cards = [
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
function setActiveCard() {
  cardLink.href = cards[currentCardIndex].buttonLink;
  picOfPictures.innerHTML = [currentCardIndex + 1] + " af " + cards.length;
  heading.textContent = cards[currentCardIndex].cardHeading;
  bodyText.textContent = cards[currentCardIndex].cardBodyText;
}
//
//const cardContainer = document.querySelector(".cards__container__pia");
//cardContainer.innerHTML = cardTemplate();
// document.querySelector('.slider-container').innerHTML = sliderTemplate()

//const cardInSlider = document.querySelector(".card-in-slider");
//const cardLink = document.querySelector(".card-link");

//const cardHeading = document.querySelector(".card__heading");
//const cardBodyText = document.querySelector(".card__bodyText");
