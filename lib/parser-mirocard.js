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

/* ------------------------------------------------------------------
* Method: parse(peripheral)
* - peripheral: `Peripheral` object of the noble
* ---------------------------------------------------------------- */
BeaconParserMirocard.prototype.parse = function(peripheral) {
	let ad = peripheral.advertisement;
	let manu = ad.manufacturerData;
	if(manu.length < 25) {
		return null;
	}

	return {
		ad : ad
	};
};

module.exports = new BeaconParserMirocard();
