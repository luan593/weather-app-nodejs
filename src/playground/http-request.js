const configuration = require('./../config');
const http = require('http');

const req = http.request({
  host: 'api.weatherstack.com',
  path:  `/current?access_key=${configuration.weather_stack}&query=${40},${-75}`,
  method: 'GET'
  }, 

  (res) => {
    
    let data = '';

    res.on('data', (chunk) => {
      data += chunk.toString();
    });

    res.on('end', () => {
      data = JSON.parse(data);
      console.log(data);
    });

  });

req.on('error', (err) => {
  console.log(err);
});

req.end();