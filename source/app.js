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
 
// 3v -> switch COM
// switch ON -> 1K (Brown/Black/Red) Resistor
// 1K Resistor -> GPIO

// let gateSwitch = new Gpio(18, 'in', 'both' );

// let count = 0;

// gateSwitch.watch((err, value) => {
//   if(err) {
//     throw err;
//   } else {
//     console.log(count++ + ': ' + value);
//   }
// });



// Wiring ds18b20 Temperature Sensors:
// https://learn.adafruit.com/adafruits-raspberry-pi-lesson-11-ds18b20-temperature-sensing/ds18b20

let ds18b20Promise = require('./ds18b20-promise');

ds18b20Promise.sensors().then((ids) => {
  console.log(JSON.stringify(ids));
  // return ids.reduce((promise, id) => {
  //   return promise.then(temperature(ds18b20, id));
  // }, Promise.resolve());
  return Promise.all(ids.map(id => {
    return temperature(ds18b20, id);
  }));
}).then(() => {
  //console.log(JSON.stringify(temperatures));
});