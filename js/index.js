//
// ELVIRA ERICSSON 
// Miniprojekt 3 - Rest Countries
//

const form = document.querySelector('#form');
const containerDiv = document.querySelector('#container');
containerDiv.style.display = 'none'; 

form.addEventListener('submit', (event) => { //NÄR MAN FYLLT I INPUT-RUTAN OCH EN CHECKBOX SUBMITTAS INFORMATIONEN OCH FÖLJANDE SKER:
    event.preventDefault(); //'DEFAULT-HÄNDELSEN' AV 'event' FÖREBYGGS

    containerDiv.innerHTML = ''; //RENSAR TIDIGARE SÖKRESULTAT
    errorMessage.innerHTML = ''; //RENSAR TIDIGARE FELMEDDELANDE

    const checkbox = document.querySelector('input[name="nameOrLanguage"]:checked').value; //VÄRDET AV CHECKBOXEN SPARAS I EN VARIABEL, ENDAST EN CHECKBOX KAN VA IBOCKAD I TAGET (:CHECKED)
    const nameOrLanguageInput = document.querySelector('#countryInput').value; //VÄRDET AV INPUTEN SPARAS I EN VARIABEL

    const url = `https://restcountries.com/v3.1/${checkbox}/${nameOrLanguageInput}`; //URLEN SPARAS I EN VARIABEL MED VÄRDENA AV INPUT/CHECKBOX SOM ENDPOINTS

    fetch(url) //BEGÄRAN SKICKAS TILL URLEN
    .then(response => { //TAR EMOT SVARET FRÅN ANROPET SOM ÄR ETT ARGUMENT 'RESPONSE'
        if (response.ok) { 
            return response.json(); //OM RESPONSE ÄR OK, RETURNERAS SVARET SOM JSON, response.json() ÄR EN METOD
        } else {
            throw ('Country/countries not found!') //OM RESPONSE INTE ÄR OK, SKRIVS ETT FELMEDDELANDE PÅ SIDAN
        }
    })
    .then(displayCountries) //OM FÖRSTA .then ÄR LYCKAT, BLIR FUNKTIONEN displayCountries KALLAD PÅ
    .catch(displayError); //.catch FÅNGAR UPP FEL SOM KAN FÖREKOMMA I .then, FUNKTIONEN displayError BLIR KALLAD OM FEL UPPSTÅR

    form.reset(); //TÖM BÅDE INPUT OCH CHECKBOX EFTER MAN SUBMITAT
});

function displayCountries (countries) { 
    containerDiv.style.display = 'block';

    const sortedArray = _.sortBy(countries, 'population'); //EN NY ARRAY SKAPAS FÖR ATT SPARA ALLA VÄRDEN 'POPULATION' FRÅN ARRAYEN 'COUNTRIES' I RANGORDNING
    //https://underscorejs.org/#sortBy

    for (const country of sortedArray) { //FÖR VARJE VÄRDE I ARRAYEN SKAPAS EN DIV SOM INNEHÅLLER OFFICIELLT NAMN, SUBREGION OSV...
        const divForCountries = document.createElement('div');
        divForCountries.style.border = '1px solid';
        divForCountries.style.margin = '20px';
        divForCountries.style.padding = '20px';
        divForCountries.style.borderRadius = '10px';
 
        divForCountries.innerHTML = `
            <h2>${country.name.official}</h2>
            <p>Subregion: ${country.subregion}</p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <img src="${country.flags.png}">`;

        containerDiv.prepend(divForCountries); //LANDET MED HÖGST ANTAL INVÅNARE PLACERAS HÖGST UPP MED HJÄLP AV 'PREPEND'
    }
}

// lägg till 'om statuskod är 404 - skriv ut nätverksfel-meddelande'
function displayError (message) { //OM ERROR UPPSTÅR I .catch SKA DENNA FUNKTIONEN UTFÖRAS
    const errorMessage = document.querySelector('#errorMessage');
    errorMessage.textContent = message; //ERRORMEDDELANDE VISAS PÅ SIDAN
}
