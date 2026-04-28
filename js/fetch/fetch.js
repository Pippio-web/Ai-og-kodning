export async function fetchProfile() {
    try {
        const response = await fetch('../Data/Profiler.json')  
        const API = await response.json()
        return API;
        
    } catch(error) {
        console.error('Der er opstået en fejl', error)
        return [];
    }
}





