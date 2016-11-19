"use strict";

// Installing Node on Raspberry Pi:
// http://www.robert-drummond.com/2015/01/08/server-side-javascript-on-a-raspberry-pi-how-to-install-node-js-2/

let Gpio = require('onoff').Gpio; // https://github.com/fivdi/onoff

// relays: 17, 27, 22, 23
//let relay1 = new Gpio(27, 'out');

let relayPins = [23, 22, 27, 17];
let relays = relayPins.map(pin => new Gpio(pin, 'out'));
let relayNormallyOpen = [false, false, true, true];

// relays.map((relay, index) => { 
//   setTimeout(() => {
//     relay.writeSync(+ relayNormallyOpen[index]);
//   }, index * 2000 );

//   setTimeout(() => {
//     relay.writeSync(+ !relayNormallyOpen[index]);
//   }, 10000 + index * 2000 );
// });


//relays[0].writeSync(1);

//setTimeout(() => {
//  relays[1].writeSync(0);
//}, 2000);

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

function logTemperatures() {
  ds18b20Promise.sensors().then(ids => {
    return Promise.all(ids.map(id => {
      return ds18b20Promise.temperature(id).then(temperature => {
        return Promise.resolve({sensor: id, temperature: temperature});
      });
    }));
  }).then(temperatures => {
    console.log(JSON.stringify(temperatures));
  }).catch(error => {
    console.log('Error reading temperatures: ' + error);
  });
};

setInterval(() => {
  let currentHour = new Date().getHours();
  let lampOn = (currentHour >= 7) && (currentHour < 21);
  
  relays[0].writeSync(+ lampOn === relayNormallyOpen[0]);

  logTemperatures();
}, 10000);