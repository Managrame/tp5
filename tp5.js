"use strict"
 
document.getElementById("bouton").addEventListener("click", async function(event) {
    event.preventDefault(); 
    const city = document.getElementById("ville").value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=fr&format=json`;//on construit l'url avec la clé de lapi et la ville indiquée par l'utilisateur
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        const long=data.results[0].longitude
        const lat =data.results[0].latitude

        const url2=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation,wind_speed_10m&models=meteofrance_seamless`;
            try{
               
                const response2 = await fetch(url2);
                if (!response2.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data2 = await response2.json();
                document.getElementById("meteo").innerHTML = `
                <h2>${data.results[0].name}, ${data.results[0].country}</h2>
                <p>Température : ${data2.hourly.temperature_2m[0]}°C</p>
                <p>Vitesse du vent : ${data2.hourly.wind_speed_10m[0]} km/h</p>
                <p>Precipitation :${data2.hourly.precipitation[0]} mm</p>`;
                 } 
                
            catch (error2) {//si l'url est fausse
                console.error("Erreur :", error2);
            }

        }
    catch (error) {//si l'url est fausse
        console.error("Erreur :", error);
    }
}
);
