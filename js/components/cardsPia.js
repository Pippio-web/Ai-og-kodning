import { fetchCard } from "../fetch/fetch.js";
const profileCard = document.querySelector(".cards__container__pia");


export const cardTemplate = ({
  src,
  alt,
  heading,
  bodyText,
  buttonLink,
}) => {
  return `
           
            <div class="card" >
            <a href="${buttonLink}"> <img class="card__image" src="${src}" alt="${alt}"></a>
            <div class="card__header">${heading}</div>
            <p class="card__p">${bodyText}</p>
            
        </div> </div>

        `;
};

export const renderCard = async () => {
  if (!profileCard) {
    return;
  }

  const cards = await fetchCard();

  cards.forEach(({ src, alt, heading, bodyText, buttonLink }) => {
    profileCard.insertAdjacentHTML(
      "beforeend",
      cardTemplate({ src, alt, heading, bodyText, buttonLink }),
    );
  });

};
