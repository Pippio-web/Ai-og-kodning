const headerContainer = document.querySelector('header')

export const header = () => {
    if(!headerContainer){
        return;
    }

    const headerTemplate = () => {
        return `
       <header class="container__header">
            
      <div class="header__inner">
        <a class="nav__item hidden__mobil" href="index.html">--HÅND--VISER--></a>

        <div class="mobile__menu__icon" id="burger__menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>

        <nav class="nav__links" id="nav__links">
          <a class="nav__item hidden__pc" href="index.html">--HÅND--VISER--></a>
          <a class="nav__item" href="markeder.html">--MARKEDER--</a>
          <a class="nav__item" href="kort.html">--KORT--</a>
          <a class="nav__item" href="favoritter.html">--FAVORITTER--</a>
          <a class="nav__item" href="kontakt.html">--KONTAKT--</a>
        </nav>
      </div>
    </header>
        `
    }

    headerContainer.insertAdjacentHTML('beforeend', headerTemplate())



    // variabler oprettes - pakker html elementer ned, så de kan bruges i koden
const hamburgerBtn = document.querySelector("#burger__menu");
const navLinks = document.querySelector("#nav__links");

// addEventlistener lytter efter 'click' på hamburger. (Opretter en anonym function)
hamburgerBtn.addEventListener("click", () => {
  // Når der klikkes, får det menuen til at åbne (og lukke igen ved nyt klik)
  navLinks.classList.toggle("active"); // tilføjer eller fjerner 'active' class på menuen
  hamburgerBtn.classList.toggle("toggle"); // får stregerne til at skifte til et kryds
});

// addEventlistener lytter efter 'click' på baggrunden.
navLinks.addEventListener("click", () => {
  // når der klikkes, lukker menuen
  navLinks.classList.remove("active"); 
  hamburgerBtn.classList.remove("toggle"); // får krydset til at skifte tilbage til streger
});



}
