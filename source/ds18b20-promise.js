'use strict';

let ds18b20 = require('ds18b20'); // https://github.com/chamerling/ds18b20

function sensors() {
  return new Promise((resolve, reject) => {
    ds18b20.sensors((err, ids) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(ids);
      }
    });
  });
};
module.exports.sensors = sensors;

function temperature(sensor) {
  return new Promise((resolve, reject) => {
    ds18b20.temperature(sensor, (err, value) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(value);
      }
    })
  });
};
module.exports.temperature = temperature;