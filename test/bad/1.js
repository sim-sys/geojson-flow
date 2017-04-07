/* @flow */

import type {
  FeatureCollection as GeoJSONFeatureCollection
} from '../../types.js';


function enumeratePostions(collection: GeoJSONFeatureCollection<*>):Array<[number, number]> {
  const r: Array<[number, number]> = [];
  collection.features.forEach(feature => {
    const geometry = feature.geometry;

    if (!geometry) return;

    r.push(geometry.coordinates)
  });

  return r;
}
