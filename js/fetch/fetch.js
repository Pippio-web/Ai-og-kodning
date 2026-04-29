export async function fetchCard() {
    try {
        const response = await fetch('../Data/Cards.json')  
        const API = await response.json()
        return API;
        
    } catch(error) {
        console.error('Der er opstået en fejl', error)
        return [];
    }
}





