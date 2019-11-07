import Cesium from 'cesium/Cesium'; // eslint-disable-line import/no-unresolved

import { viewers } from 'map/viewer';

/**
 * Adds the KML data to the viewer corresponding to the provided identifier.
 * @param   {Object}          config          The configuration object.
 * @param   {Element|string}  config.kml      The parsed KML document or its source url.
 * @param   {string}          config.viewerId The identifier of the representative viewer.
 * @returns {Promise} Resolves with the KML entity.
 */
export function addKML( kml, viewerId ) {
  if (!viewers.has(viewerId)) {
    return;
  }

  const viewer = viewers.get(viewerId);

  return viewer.flyTo(viewer.dataSources.add(Cesium.KmlDataSource.load(kml, {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas,
  })));
}

/**
 * Removes the KML data from the viewer corresponding to the provided identifier.
 * @param   {Object}  config          The configuration object.
 * @param   {Object}  config.entity   The KML entity.
 * @param   {string}  config.viewerId The identifier of the representative viewer.
 * @returns {boolean} Indicates whether the KML entity was removed.
 */
export function removeKML({ entity, viewerId }) {
  if (!viewers.has(viewerId)) {
    return;
  }

  return viewers.get(viewerId).dataSources.remove(entity);
}