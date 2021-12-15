const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=fd59d2c58a44395fbec0b5e035f18858&query=${latitude},${longitude}&units=f`;
  request({ url: forecastUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location.  Try another search.", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.weather_descriptions[0].toLowerCase()} outside. The temperature is ${
          body.current.temperature
        } degrees but it feels like ${body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
