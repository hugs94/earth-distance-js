'use strict';
const { validateCoordinates } = require('./validators');
const { R } = require('./constants');

Number.prototype.degToRad = function() {
  return this * (Math.PI / 180);
};
Number.prototype.radToDeg = function() {
  return (180 * this) / Math.PI;
};

/**
 * @param {Object} centerPoint { lat: latitude, lon: longitude }
 * @param {Number} distance Number distance in KM
 */
function getBoundingBox(centerPoint, distance) {
  var MIN_LAT,
    MAX_LAT,
    MIN_LON,
    MAX_LON,
    radDist,
    degLat,
    degLon,
    radLat,
    radLon,
    minLat,
    maxLat,
    minLon,
    maxLon,
    deltaLon;

  var isValid = validateCoordinates(centerPoint);
  if (!isValid)
    return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  if (distance < 0 || !distance) {
    return 'Distance is required and cannot be less than zero';
  }

  // coordinate limits
  MIN_LAT = (-90).degToRad();
  MAX_LAT = (90).degToRad();
  MIN_LON = (-180).degToRad();
  MAX_LON = (180).degToRad();
  // angular distance in radians on a great circle
  radDist = distance / R;
  // center point coordinates (deg)
  degLat = centerPoint.lat;
  degLon = centerPoint.lon;
  // center point coordinates (rad)
  radLat = degLat.degToRad();
  radLon = degLon.degToRad();
  // minimum and maximum latitudes for given distance
  minLat = radLat - radDist;
  maxLat = radLat + radDist;
  // minimum and maximum longitudes for given distance
  minLon = void 0;
  maxLon = void 0;
  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
}

module.exports = getBoundingBox;
