require('colors');
const request = require('request');
const argv = require("yargs").options({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad para obtener el clima',
            demand: true
        }
    })
    .help()
    .argv;

const { direccion } = argv;

// console.log(encodeURI(direccion));

const options = {
    method: 'GET',
    url: 'https://geocode.xyz',
    qs: {
        locate: direccion,
        auth: '409696308996048596733x7108',
        json: 1
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const { longt, latt } = JSON.parse(body);
    console.log(longt, latt);
    request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            lat: latt,
            lon: longt,
            appid: '15507ce26aa46c644fa2b9fcd2cadbf5',
            units: 'metric'
        }
    }, (error, response, body) => {
        if (error) throw new Error(error);
        const { main: { temp } } = JSON.parse(body);
        console.log(`La temperatura de ${direccion} es: ${temp}`green);
    })

});
