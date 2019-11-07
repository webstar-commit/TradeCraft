import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved
import uuid from 'uuid/v4';

import { viewers } from 'map/viewer';
import { getRandomColor, getRGBArray } from 'util/color';

/**
 * Adds a polyline to the viewer corresponding to the provided identifier.
 * @param   {Object}          config              The configuration object.
 * @param   {string}          [config.color]      The color of the polyline represented as a hex string.
 * @param   {string}          [config.id]         The identifier of the polyline.
 * @param   {Array.<number>}  config.points       The coordinate points of the polyline.
 * @param   {string}          config.viewerId     The identifier of the representative viewer.
 * @param   {number}          [config.width]      The width of the polyline.
 * @returns {Object}
 */
export function addPolyline({ color = getRandomColor(), id = `Polyline__${uuid()}`, points, viewerId, width = 2 }) {
  if (!viewers.has(viewerId)) {
    return;
  }

  return viewers.get(viewerId).entities.add({
    polyline: {
      id,
      material: new Cesium.Material({
        fabric: {
          type: 'Color',
          uniforms: {
            color: new Cesium.Color(...getRGBArray(color), 1.0),
          },
        },
      }),
      positions: Cesium.Cartesian3.fromDegreesArray(points),
      width,
    },
  });
}

/**
 * Removes the polyline from the viewer corresponding to the provided identifier.
 * @param   {string}  viewerId  The identifier of the representative viewer.
 * @param   {string}  polyline  The polyline to remove.
 * @returns {boolean} Indicates whether the polyline was removed.
 */
export function removePolyline(viewerId, polyline) {
  if (!viewers.has(viewerId)) {
    return;
  }

  return viewers.get(viewerId).entities.remove(polyline);
}
