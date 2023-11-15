document.querySelector('.search button').addEventListener('click', async function() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const ciudad = document.querySelector('.search input').value;
    const url_clima = apiUrl + ciudad + '&appid=' + apiKey;
    try {
        const ack = await obtenerpromesa(url_clima);
        procesar_respuestas(ack);
    } catch (error) {
        var errorciudad = document.querySelector('.error');
        errorciudad.style.display = 'block';

        var cajaclima = document.querySelector('.weather');
        cajaclima.style.display = 'none';
    }
});

async function obtenerpromesa(url){
    try{
        const respuesta = await axios.get(url);
        //console.log("Estado de la respuesta: ", respuesta.status);
        return await respuesta.data;
    }catch(error){
        console.log("Error: ", error.message);
        throw error;
    }
}

async function procesar_respuestas(datos_clima){
    var cajaclima = document.querySelector('.weather');
    cajaclima.style.display = 'block';

    var ciudad = document.querySelector('.city');
    ciudad.textContent = datos_clima.name;

    var temperatura = document.querySelector('.temp');
    temperatura.textContent = Math.round(datos_clima.main['temp'])+"°C";

    var humedad = document.querySelector('.humidity');
    humedad.textContent = Math.round(datos_clima.main['humidity'])+"%";

    var velocidad = document.querySelector('.wind');
    velocidad.textContent = Math.round(datos_clima.wind['speed'])+" km/h";

    var estado_tiempo = datos_clima.weather[0].main;
    var icono_clima = document.querySelector('.weather-icon');
    //alert(estado_tiempo)

    if (estado_tiempo === "Clouds") {
        icono_clima.src = "images/clouds.png";
    }
    else if (estado_tiempo === 'Clear') {
        icono_clima.src = 'images/clear.png';
    }
    else if (estado_tiempo === 'Rain') {
        icono_clima.src = 'images/rain.png';
    }
    else if (estado_tiempo === 'Drizzle') {
        icono_clima.src = 'images/drizzle.png';
    }
    else if (estado_tiempo === 'Mist') {
        icono_clima.src = 'images/mist.png';
    }
    else
        alert("No se encontro el icono")

}





