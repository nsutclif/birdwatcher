"use strict";

let Gpio = require('onoff').Gpio;

// relays: 17, 27, 22, 23

let relay1 = new Gpio(17, 'out');

relay1.writeSync(0);

setTimeout(() => {
  relay1.writeSync(1);
}, 500);


let ds18b20 = require("ds18b20");

ds18b20.sensors((err, ids) => {
  if (err) {
    console.log("Error getting sensors: " + err);
  }
  else {
    console.log(JSON.stringify(ids));
  }
});