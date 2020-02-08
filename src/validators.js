/**
 function returns true only if the first parameter passed in is a number 
and is between the other two numbers passed in
used to validate coordinates passed in are correct
 */
function typeAndRangeCheck(num, min, max) {
  return typeof num === 'number' && (num - min) * (num - max) <= 0;
}

/**
 * validate the coordinates. will make sure they are numbers
 * latitude must be between -90, 90. Longitude must be between -180, 180
 * @param {Object} geo1 { lat: latitude } or { lat: latitude, lon: longitude }
 * @param {Object} geo2 { lon: longitude }
 */
module.exports.validateCoordinates = (geo1, geo2 = null) => {
  // Error if both parameters are not passed in
  if (!geo1 && !geo2) {
    return false;
  }

  // Bounding box only uses 1 set of coordinates, so only run test on geo1 if it is the only argrument passed in
  if (geo1 && !geo2) {
    if (
      !typeAndRangeCheck(geo1.lat, -90, 90) ||
      !typeAndRangeCheck(geo1.lon, -180, 180)
    ) {
      return false;
    }

    return true;
  }

  // run validator on on both geo points if they are both passed in
  if (
    !typeAndRangeCheck(geo1.lat, -90, 90) ||
    !typeAndRangeCheck(geo1.lon, -180, 180) ||
    !typeAndRangeCheck(geo2.lat, -90, 90) ||
    !typeAndRangeCheck(geo2.lon, -180, 180)
  ) {
    return false;
  }

  return true;
};
