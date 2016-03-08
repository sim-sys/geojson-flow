/* @flow */

import type {
  FeatureCollection as GeoJSONFeatureCollection
} from '../../types.js';

function enumeratePostions(collection: GeoJSONFeatureCollection):Array<[number, number]> {
  const r: Array<[number, number]> = [];
  collection.features.forEach(feature => {
    const geometry = feature.geometry;

    if (!geometry) return;

    if (geometry.type === 'Point') {
      r.push(geometry.coordinates)
    } else if (geometry.type === 'MultiPoint' || geometry.type === 'LineString') {
      geometry.coordinates.forEach(_ => r.push(_));
    } 

  });

  return r;
}
