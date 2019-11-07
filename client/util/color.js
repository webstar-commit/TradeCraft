import tinyColor from 'tinycolor2';

/**
 * Returns a random color represented as a hex string.
 * @returns {string}
 */
export function getRandomColor() {
  return `#${Math.random().toString(16).substr(2, 6)}`;
}

/**
 * Returns the array of RGB values representing the provided color.
 * @param   {string}  color The color represented as a hex string.
 * @returns {Array.<number>}
 */
export function getRGBArray(color) {
  const { r, g, b } = tinyColor(color).toRgb();
  return [ r, g, b ];
}
