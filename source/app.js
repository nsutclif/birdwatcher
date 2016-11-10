"use strict";

// Installing Node on Raspberry Pi:
// http://www.robert-drummond.com/2015/01/08/server-side-javascript-on-a-raspberry-pi-how-to-install-node-js-2/

let Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff

// relays: 17, 27, 22, 23

let relay1 = new Gpio(17, 'out');

relay1.writeSync(0);

setTimeout(() => {
  relay1.writeSync(1);
}, 500);
 
// Wiring ds18b20 Temperature Sensors:
// https://learn.adafruit.com/adafruits-raspberry-pi-lesson-11-ds18b20-temperature-sensing/ds18b20





// let ds18b20 = require("ds18b20"); // https://github.com/chamerling/ds18b20

// function sensors(ds18b20) {
//   return new Promise((resolve, reject) => {
//     ds18b20.sensors((err, ids) => {
//       if (err) {
//         reject(err);
//       } 
//       else {
//         resolve(ids);
//       }
//     });
//   });
// }

// function temperature(ds18b20, sensor) {
//   return new Promise((resolve, reject) => {
//     ds18b20.temperature(sensor, (err, value) => {
//       if (err) {
//         reject(err);
//       }
//       else {
//         console.log(sensor + ': ' + value);
//         resolve(value);
//       }
//     })
//   });
// }

// sensors(ds18b20).then((ids) => {
//   console.log(JSON.stringify(ids));
//   // return ids.reduce((promise, id) => {
//   //   return promise.then(temperature(ds18b20, id));
//   // }, Promise.resolve());
//   return Promise.all(ids.map(id => {
//     return temperature(ds18b20, id);
//   }));
// }).then(() => {
//   //console.log(JSON.stringify(temperatures));
// });