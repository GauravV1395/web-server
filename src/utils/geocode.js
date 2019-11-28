const request = require("request");

const geocode = (address, callback) => {
  const URL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) + // encodeURIComponent encodes any special character like $ to a value that can be taken by the mapcode api to fetch data.
    ".json?access_token=pk.eyJ1IjoiZ2F1cmF2MTM5NSIsImEiOiJjazM3NWtpbHEwNzR0M25tdW8xaWpxeWh5In0.qSjtOVXJGvqKR22tszdfqQ&limit=1";

  request({ url: URL, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log(error);
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
