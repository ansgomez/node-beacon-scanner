/* ------------------------------------------------------------------
* node-beacon-scanner - parser-mirocard.js
*
* Copyright (c) 2017-2019, Futomi Hatano, All rights reserved.
* Copyright (c) 2021, Andres Gomez, All rights reserved.
* Released under the MIT license
* Date: 2021-03-22
* ---------------------------------------------------------------- */
'use strict';

/* ------------------------------------------------------------------
* Constructor: BeaconParserMiroCard()
* ---------------------------------------------------------------- */
const BeaconParserMirocard = function() {

};

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

/* ------------------------------------------------------------------
* Method: parse(peripheral)
* - peripheral: `Peripheral` object of the noble
* ---------------------------------------------------------------- */
BeaconParserMirocard.prototype.parse = function(peripheral) {
	let ad = peripheral.advertisement;
	let manu = ad.manufacturerData;

	//Printout full payload
	console.log(manu);
	console.log();

	if(manu.length < 3) {
		return null;
	} else {
        if (manu.slice(1, 5).toString('hex').startsWith("01020304")) {
            console.log("Detected MiroCard preamble\n");
        }
    }

	let msb3 = manu.slice(5,7).toString('hex').substring(0,4);
	let lsb3 = manu.slice(6,8).toString('hex').substring(0,4);

    // console.log(msb3);
	// console.log(lsb3);

	let humidity_raw = ((parseInt(msb3.substring(2,4),16)&0x03)<<8) + parseInt(msb3.substring(0,2),16);
    let temperature_raw = ((parseInt(lsb3.substring(0,2),16)&0xFC)>>2) + (parseInt(lsb3.substring(2,4),16)<<6);

    // conversion
    let temperature = (-40.0 + temperature_raw / 100.0).toFixed(2);
    let humidity =  (humidity_raw / 10.0).toFixed(2);

	// console.log("Temperature: " + temperature);
	// console.log("Humidity: " + humidity);

	return {
		ad : ad,
		temp: temperature,
		rh: humidity
	};
};

module.exports = new BeaconParserMirocard();
