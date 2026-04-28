const footerContainer = document.querySelector('footer')


const footer = () => {

    if(!footerContainer){
        return;
    }

    const footerTemplate = () => {
        return `
            <p class="footer__1">Ai og Kodning - 2026</p>
            <p class="footer__2">Pia Nygaard Pedersen</p>
           
          
            <div> </div>

        `
    }


    footerContainer.insertAdjacentHTML('beforeend', footerTemplate())


}