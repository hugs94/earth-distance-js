const { validateCoordinates } = require('./validators');
'use strict';

/**
 * Original Haversine Formula (shortest distance over earth surface)
 * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
 * c = 2 ⋅ atan2( √a, √(1−a) )
 * d = R ⋅ c
 * where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
 * note that angles need to be in radians
 */

// (mean) radius of Earth (KM)
var R = 6378.137;
var PI_360 = Math.PI / 360;

Number.prototype.degToRad = function () {
  return this * (Math.PI / 180);
};
Number.prototype.radToDeg = function () {
  return (180 * this) / Math.PI;
};

function haversine(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid) return 'Invalid arguments. You must pass in at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180'; 
  
  console.log(a, b);
  var δφ = Math.cos((a.lat + b.lat) * PI_360);
  var Δφ = (b.lat - a.lat) * PI_360;
  var Δλ = (b.lon - a.lon) * PI_360;

  var f = Δφ * Δφ + δφ * δφ * Δλ * Δλ;
  var c = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
  var d = R * c;
  return d;
}
/**
 * Spherical Law of Cosines
 * Note: may run slower than haversine
 * d = acos( sin φ1 ⋅ sin φ2 + cos φ1 ⋅ cos φ2 ⋅ cos Δλ ) ⋅ R
 */
function sphericalCosines(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid) return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  var φ1 = a.lat.degToRad();
  var φ2 = b.lat.degToRad();
  var δλ = (b.lon - a.lon).degToRad();

  var d =
    Math.acos(
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(δλ)
    ) * R;
  return d;
}


/**
 * Equirectangular Approximation
 * x = Δλ ⋅ cos φm
 * y = Δφ
 * d = R ⋅ √x² + y²
 *
 * For higher performace with accuracy loss
 */
function equirectangular(a, b) {
  var isValid = validateCoordinates(a, b);
  if (!isValid) return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';

  var λ1 = a.lat.degToRad();
  var λ2 = b.lat.degToRad();
  var φ1 = a.lon.degToRad();
  var φ2 = b.lon.degToRad();
  var x = (λ2 - λ1) * Math.cos((φ1 + φ2) / 2);
  var y = φ2 - φ1;
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

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
  if (!isValid) return 'Invalid arguments. You must pass at least a geopoint as the first argument. Latitude must be a number between -90 and 90. Longitude must be a number between -180 and 180';
  
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

module.exports = {
  haversine,
  sphericalCosines,
  equirectangular,
  getBoundingBox
};
