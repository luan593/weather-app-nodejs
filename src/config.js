const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '..', '.env')
});

const configuration = {
    weather_stack: process.env.WEATHER_STACK_ACCESS_KEY,
    mapbox: process.env.MAPBOX_ACCESS_KEY
}

module.exports = configuration;