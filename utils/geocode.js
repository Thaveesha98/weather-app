const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGhhdmVlc2hhOTgiLCJhIjoiY201YzR3Y2UyMGhxYTJrcjN5eG5nb2JtYiJ9.V8v5s3mFkZmlVw0oMrnhxg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body) {
      callback("Unable to find location. Try another search.", undefined);
    } else if (body.message === "Not Found") {
      callback("Url issue.", undefined);
    } else if (!body.features[0]) {
      callback("Url issue.", undefined);
    } else if (!address.length) {
      callback("Please provide an address.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].geometry.coordinates[0],
        latitude: body.features[0].geometry.coordinates[1],
        location: body.features[0].place_name,
      });
    }
  });
};

const weather = (location = "new york", callback) => {
  const access_token = "5323a5714fecee662e0e9b00801fb6d3";
  const url = `https://api.weatherstack.com/current?access_key=${access_token}&query=${location}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        location: body.location.name,
        country: body.location.country,
        region: body.location.region,
        weather_description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = {
  geocode,
  weather,
};
