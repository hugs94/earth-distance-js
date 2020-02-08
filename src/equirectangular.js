'use strict';
const { validateCoordinates } = require('./validators');
const { R } = require('./constants');

Number.prototype.degToRad = function() {
  return this * (Math.PI / 180);
};

/**
 * Equirectangular Approximation
 * x = Δλ ⋅ cos φm
 * y = Δφ
 * d = R ⋅ √x² + y²
 *
 * For higher performace with accuracy loss
 * @param {Object} a { lat: latitude }
 * @param {Object} b { lon: longitude }
 */

function equirectangular(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid)
    return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  var λ1 = a.lat.degToRad();
  var λ2 = b.lat.degToRad();
  var φ1 = a.lon.degToRad();
  var φ2 = b.lon.degToRad();
  var x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
  var y = φ2 - φ1;
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

module.exports = equirectangular;
