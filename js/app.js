// Variables

const container = document.querySelector('.container')

const result = document.getElementById('resultado')

const form = document.getElementById('formulario')


// Funciones

window.addEventListener('load',()=>{
    form.addEventListener('submit', findWeather)
})

function findWeather(e){
    e.preventDefault();

    // VALIDAR

    const city = document.getElementById('ciudad').value
    const country = document.getElementById('pais').value

    if(city === '' || country === ''){
        showError('Ambos campos son obligatorios.')
    }


    consultAPI(city,country)
}


function showError(message){

    const alert=document.querySelector('.bg-red-100');

    if(!alert){
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center')


        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${message}</span>
        `

        container.appendChild(alert)

        setTimeout(()=>{
            alert.remove();
        },4000);
    }
}

function consultAPI(city,country){
    
    const appId = '9665da9e00fc4593a27aeaf67741610a';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`

    console.log(url);

    Spinner();

    fetch(url)
        .then(answer => answer.json())
        .then(data =>{
            clearHTML();
            if(data.cod === "404"){
                showError('Ciudad no encontrada.')
            }else{
                showWeather(data)
                console.log(data)
            }
        } )
}

function showWeather(data){


    const {humidity, feels_like, temp, temp_max, temp_min} = data.main;
    const nameCity = data.name;

    const celciusTemp = kelvinToCelcius(temp);
    const celciusTempMax = kelvinToCelcius(temp_max);
    const celciusTempMin = kelvinToCelcius(temp_min);
    const stTemp = kelvinToCelcius(feels_like);

    const cityActual = document.createElement('p');
    cityActual.innerHTML = `Clima en ${nameCity} `;
    cityActual.classList.add('font-bold','text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${celciusTemp} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML =`Temperatura máxima: ${celciusTempMax} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML =`Temperatura mínima: ${celciusTempMin} &#8451;`;
    tempMin.classList.add('text-xl');

    const humidityActual = document.createElement('p');
    humidityActual.innerHTML =`Humedad: ${humidity}%`;
    humidityActual.classList.add('text-xl');

    const st = document.createElement('p');
    st.innerHTML =`Sensación Térmica: ${stTemp} &#8451;`;
    st.classList.add('text-xl');


    

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('text-center','text-white');
    resultDiv.appendChild(cityActual);
    resultDiv.appendChild(actual);
    resultDiv.appendChild(tempMax);
    resultDiv.appendChild(tempMin);
    resultDiv.appendChild(humidityActual);
    resultDiv.appendChild(st);
    result.appendChild(resultDiv);

}

function kelvinToCelcius(temp){
    return parseInt(temp-273.15);
}

function Spinner(){

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle')

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    result.appendChild(divSpinner);
}

function clearHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
}


