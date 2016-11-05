"use strict";

// let Gpio = require('onoff').Gpio;

// // relays: 17, 27, 22, 23

// let relay1 = new Gpio(17, 'out');

// relay1.writeSync(0);

// setTimeout(() => {
//   relay1.writeSync(1);
// }, 500);


let ds18b20 = require("ds18b20");

function sensorsPromise(ds18b20) {
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
}

sensorsPromise(ds18b20).then((ids) => {
  console.log(JSON.stringify(ids));
});