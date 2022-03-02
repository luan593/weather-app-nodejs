const axios = require('axios');
const configuration = require('./../config');

async function geocode(address) {
  try {
    const response = await axios({
      method: 'get',
      baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
      url: `/${encodeURIComponent(address)}.json`,
      params: {
        access_token: configuration.mapbox,
        limit: 1
      }
    });
    const { data } = response;
    if (data.features.length === 0) { 
      throw new Error(`There is no result available for ${address}`);
    }
    const [ longuitude, latitude ] = data.features[0].center;
    const place = data.features[0].place_name;
    return {
      place,
      longuitude,
      latitude,
    }
  }
  catch (error) {
    console.log(error.message);
  }
}

async function forecast({latitude, longuitude} = {}) {
  try {
    const response = await axios({
      method: 'get',
      baseURL: 'http://api.weatherstack.com',
      url: '/current',
      params: {
        access_key: configuration.weather_stack,
        query: `${latitude},${longuitude}`
      }
    });
    const { data } = response;
    if (data.error) { 
      throw new Error(data.error.info);
    }
    const { temperature } = data.current;
    return {
      temperature
    }
  }
  catch (error) {
    console.log(error.message);
  }
}

async function request() {
  try {
    const { place, latitude, longuitude } = await geocode(process.argv[2]);
    const { temperature } = await forecast({ latitude, longuitude });
    console.log({ place, latitude, longuitude, temperature});
  }
  catch (error) {
    console.log(error.message);
  }
}

request();