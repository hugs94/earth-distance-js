'use strict';
const { validateCoordinates } = require('./validators');
const { R } = require('./constants');

Number.prototype.degToRad = function() {
  return this * (Math.PI / 180);
};

/**
 * Spherical Law of Cosines
 * Note: may run slower than haversine
 * d = acos( sin φ1 ⋅ sin φ2 + cos φ1 ⋅ cos φ2 ⋅ cos Δλ ) ⋅ R
 * @param {Object} a { lat: latitude }
 * @param {Object} b { lon: longitude }
 */
function sphericalCosines(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid)
    return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  var φ1 = a.lat.degToRad();
  var φ2 = b.lat.degToRad();
  var δλ = (b.lon - a.lon).degToRad();

  var d =
    Math.acos(
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(δλ)
    ) * R;
  return d;
}

module.exports = sphericalCosines;
