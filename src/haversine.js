'use strict';
const { validateCoordinates } = require('./validators');
const { R, PI_360 } = require('./constants');

/**
 * Original Haversine Formula (shortest distance over earth surface)
 * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 * c = 2 ⋅ atan2( √a, √(1−a) )
 * d = R ⋅ c
 * where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
 * note that angles need to be in radians
 */

function haversine(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid)
    return 'Invalid arguments. You must pass in at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  var δφ = Math.cos((a.lat + b.lat) * PI_360);
  var Δφ = (b.lat - a.lat) * PI_360;
  var Δλ = (b.lon - a.lon) * PI_360;

  var f = Δφ * Δφ + δφ * δφ * Δλ * Δλ;
  var c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
  var d = R * c;
  return d;
}

module.exports = haversine;
