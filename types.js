/* @flow */

'use strict';

const assert = require('assert');

assert(false, `geojson-flow shouldn't be used at runtime`);

/**
 * 2. GeoJSON Objects
 * http://geojson.org/geojson-spec.html#geojson-objects
 */

export type GeoJSONObject =
  | GeometryObject
  | Feature
  | FeatureCollection;

type Common = { // TODO inline
  crs?: ?CRS,
  bbox?: BBox
};

/**
 * 2.1 Geometry Objects
 * http://geojson.org/geojson-spec.html#geometry-objects
 */

export type GeometryObject =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

type Geometry<K, T> = {
   type: K;
   coordinates: T;
 }

/**
 * 2.1.1. Positions
 * http://geojson.org/geojson-spec.html#positions
 */

type Position = [number, number];

/**
 * 2.1.2. Point
 * http://geojson.org/geojson-spec.html#point
 */

export type Point = Geometry<'Point', Position>;

/**
 * 2.1.3. MultiPoint
 * http://geojson.org/geojson-spec.html#multipoint
 */

export type MultiPoint = Geometry<'MultiPoint', Position[]>;

/**
 * 2.1.4. LineString
 * http://geojson.org/geojson-spec.html#linestring
 */

export type LineString = Geometry<'LineString', Array<number[]>>;
 // TODO it should be > 2, but we can't validate it statically (maybe [Position, Position] would work?)


/**
 * 2.1.5. MultiLineString
 * http://geojson.org/geojson-spec.html#multilinestring
 */

export type MultiLineString = Geometry<'MultiLineString', Array<Position[]>>;

/**
 * 2.1.6. Polygon
 * http://geojson.org/geojson-spec.html#polygon
 */

export type Polygon = Geometry<'Polygon', Array<Position[]>>;

/**
 * 2.1.7. MultiPolygon
 * http://geojson.org/geojson-spec.html#multipolygon
 */

export type MultiPolygon = Geometry<'MultiPolygon', Array<Array<Position[]>>>;


/**
 * 2.1.8 Geometry Collection
 * http://geojson.org/geojson-spec.html#geometry-collection
 */

export type GeometryCollection = {
  type: 'GeometryCollection',
  geometries: Array<GeometryObject> // TODO make generic
};

/**
 * 2.2. Feature Objects
 * http://geojson.org/geojson-spec.html#geometry-collection
 */

export type Feature = { // TODO make generic
  type: 'Feature',
  geometry: ?GeometryObject,
  properties: ?{},
  id?: number | string // is not specified, but nothing else makes sense
};

/**
 * 2.3. Feature Collection Objects
 * http://geojson.org/geojson-spec.html#feature-collection-objects
 */

export type FeatureCollection = { // TODO make generic
  type: 'FeatureCollection',
  features: Array<Feature>
};

/**
 * 3. Coordinate Reference System Objects
 * http://geojson.org/geojson-spec.html#coordinate-reference-system-objects
 */

type CRS = {
  type: string,
  properties: {}
};

/**
 * 4. Bounding Boxes
 * http://geojson.org/geojson-spec.html#bounding-boxes
 */

type BBox = [Position, Position, Position, Position];
