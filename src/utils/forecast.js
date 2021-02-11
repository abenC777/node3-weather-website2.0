const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4daed215a1c5b2c1dea2a455f19d3811&query=-${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
