const {
  haversine,
  sphericalCosines,
  getBoundingBox,
  equirectangular
} = require('../index');

var Newyork = {
  lat: 40.6971,
  lon: -74.2598
};
var Boston = {
  lat: 42.314,
  lon: -71.2497
};

test('haversine distance between Newyork & Boston = 308.84810486810926', () => {
  expect(haversine(Newyork, Boston)).toBe(308.84810486810926);
});

test('spherical cosines distance between Newyork & Boston = 308.7849679955355', () => {
  expect(sphericalCosines(Newyork, Boston)).toBe(308.7849679955355);
});

test('equirectangular  distance between Newyork & Boston = 339.304994196915', () => {
  expect(equirectangular(Newyork, Boston)).toBe(339.304994196915);
});

test('get boundingbox for Newyork', () => {
  expect(getBoundingBox(Newyork, 280)).toStrictEqual([
    -77.57817195169761,
    38.18181720446535,
    -70.94142804830238,
    43.212382795534666
  ]);
});
