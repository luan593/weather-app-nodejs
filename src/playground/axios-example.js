const axios = require('axios');
const configuration = require('./../config');

async function makeRequest(place) {
  try {
    const resMB = await axios({
      method: 'get',
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
      url: `/${encodeURIComponent(place)}.json`,
      params: {
        access_token: configuration.mapbox,
        limit: 1,
      }
    });
    if (resMB.data.features.length === 0) throw new Error(`No result for ${place}`);
    const placeName = resMB.data.features[0].place_name;
    const [long, lat] = resMB.data.features[0].center;
    const resWS = await axios({
      method: 'get',
      baseURL: 'http://api.weatherstack.com',
      url: '/current',
      params: {
        access_key : configuration.weather_stack,
        query: `${lat},${long}`,
      }
    });
    if (resWS.data.error) throw new Error(resWS.data.error.info);
    console.log(`Lugar: ${placeName}`);
    console.log(`Coordenadas: ${lat},${long}`);
    console.log(`Temperatura: ${resWS.data.current.temperature}`);
  }
  catch (error) {
    console.log(error.message);
  }
  finally {
    console.log('\nfin ...');
  }
}

makeRequest('Barcelona');