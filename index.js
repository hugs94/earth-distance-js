'use strict';
const haversine = require('./src/haversine');
const sphericalCosines = require('./src/sphericalCosines');
const equirectangular = require('./src/equirectangular');
const getBoundingBox = require('./src/getBoundingBox');

module.exports = {
  haversine,
  sphericalCosines,
  equirectangular,
  getBoundingBox
};
