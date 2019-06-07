const { haversine } = require('./index');
const { sphericalCosines } = require('./index');
const { equirectangular } = require('./index');
const { getBoundingBox } = require('./index');

var Newyork = {
  lat: 40.6971,
  lon: -74.2598
};
var Boston = {
  lat: 42.314,
  lon: -71.2497
};

var NewyorkToBostonHaversine = haversine(Newyork, Boston);
console.log(NewyorkToBostonHaversine);
// --> 308.84810486810926

var NewyorkToBostonCosine = sphericalCosines(Newyork, Boston);
console.log(NewyorkToBostonCosine);
// --> 308.7849679955355

var NewyorkToBostonEq = equirectangular(Newyork, Boston);
console.log(NewyorkToBostonEq);
// --> 339.304994196915

var nyboundingBox = getBoundingBox(Newyork, 280);
console.log(nyboundingBox);
// [
//  -77.57817195169761,
//  38.18181720446535,
//  -70.94142804830238,
//  43.212382795534666
// ]
