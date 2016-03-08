/* @flow */

/**
 * 2. GeoJSON Objects
 * http://geojson.org/geojson-spec.html#geojson-objects
 */

type GeoJSONObject =
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

type GeometryObject =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

/**
 * 2.1.1. Positions
 * http://geojson.org/geojson-spec.html#positions
 */

type Position = [number, number];

/**
 * 2.1.2. Point
 * http://geojson.org/geojson-spec.html#point
 */

export type Point = {
  type: 'Point',
  coordinates: Position
};

/**
 * 2.1.3. MultiPoint
 * http://geojson.org/geojson-spec.html#multipoint
 */

type MultiPoint = {
  type: 'MultiPoint',
  coordinates: Array<Position>
};

/**
 * 2.1.4. LineString
 * http://geojson.org/geojson-spec.html#linestring
 */

type LineString = {
  type: 'LineString',
  coordinates: Array<Position> // TODO it should be > 2, but we can't validate it statically (maybe [Position, Position] would work?)
};

/**
 * 2.1.5. MultiLineString
 * http://geojson.org/geojson-spec.html#multilinestring
 */

type MultiLineString = {
  type: 'MultiLineString',
  coordinates: Array<Array<Position>>
};

/**
 * 2.1.6. Polygon
 * http://geojson.org/geojson-spec.html#polygon
 */

type Polygon = {
  type: 'Polygon',
  coordinates: Array<Array<Position>>
};

/**
 * 2.1.7. MultiPolygon
 * http://geojson.org/geojson-spec.html#multipolygon
 */

type MultiPolygon = {
  type: 'MultiPolygon',
  coordinates: Array<Array<Array<Position>>>
};

/**
 * 2.1.8 Geometry Collection
 * http://geojson.org/geojson-spec.html#geometry-collection
 */

type GeometryCollection = {
  type: 'GeometryCollection',
  geometries: Array<GeometryObject> // TODO make generic
};

/**
 * 2.2. Feature Objects
 * http://geojson.org/geojson-spec.html#geometry-collection
 */

type Feature = { // TODO make generic
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
