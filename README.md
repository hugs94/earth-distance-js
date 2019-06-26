# earth-distance-js

Pure JS implementation of basic mathmatical solutions to geo-location measurements

## Features

- Haversine equation: shortest distance between two geopoints over earth's surface
- Spherical Law of Cosines: An alternative measurement between two geopoints
- Equirectangular Approximation: A high performace alterantive (with accuracy loss) to Haversine
- Bounding Box: Finds the max/min lat/lon values from a centerpoint as a square
- Validation: Checks inputed lat/lon values to be within -90 to 90 and -180 to 180

## Installation

Using npm:
```
$ npm install earth-distance-js
```

## Examples

### Haversine:
Returns distance in KM

```
const { haversine } = require('earth-distance-js');

var Newyork = {
    lat: 40.6971,
    lon: -74.2598
  };
var Boston = {
    lat: 42.3140,
    lon: -71.2497
  };
var NewyorkToBoston = haversine(Newyork, Boston);
console.log(NewyorkToBoston);

// --> 308.84810486810926 

```
### Spherical Cosine
Returns distance in KM

```
const { sphericalCosines } = require('earth-distance-js');

var Newyork = {
    lat: 40.6971,
    lon: -74.2598
  };
var Boston = {
    lat: 42.3140,
    lon: -71.2497
  };

var NewyorkToBoston = sphericalCosines(Newyork, Boston);
console.log(NewyorkToBoston);

// --> 308.7849679955355
```

### Equirectangular Eq
Returns distance in KM

```
const { equirectangular } = require('earth-distance-js');

var Newyork = {
    lat: 40.6971,
    lon: -74.2598
  };
var Boston = {
    lat: 42.3140,
    lon: -71.2497
  };

var NewyorkToBoston = equirectangular(Newyork, Boston);
console.log(NewyorkToBoston);

// --> 339.304994196915
```
> **NOTE:** `equirectangular` will be inaccurate over large distances. However, it is more   
> performant than `haversine`. Over short distances metrics where exact distance does not matter,
> is generally the best use scenario. 

### Bounding Box
Returns min/max set of geopoints

```
const { getBoundingBox } = require('earth-distance-js');

var Newyork = {
    lat: 40.6971,
    lon: -74.2598
  };

var NewyorkBoundBox = getBoundingBox(Newyork, 280);
console.log(NewyorkBoundBox);
// [
//  -77.57817195169761,
//  38.18181720446535,
//  -70.94142804830238,
//  43.212382795534666
// ]

```

> **NOTE:** when using `getBoundingBox` remember that the distance inputted is 'horizontal/
> vertial' maxima, rather than a 'max radius', the distance of the min/max geopoints will be
> farther (similar to isosceles right angle triangle);



## License
MIT
