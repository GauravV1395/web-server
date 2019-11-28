const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const URL = `https://api.darksky.net/forecast/adb70c57184e614643c8725a9beeafe8/${latitude},${longitude}`;
  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to Darksky servers.", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.currently.temperature} and there is ${body.currently.precipProbability}% of rain.`
      );
    }
  });
};

module.exports = forecast;
