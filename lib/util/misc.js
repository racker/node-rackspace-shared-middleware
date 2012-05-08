/**
 * Convert a string from underscore separated to camelCase format.
 *
 * @param {String} string String to convert.
 * @return {String} Converted string.
 */
exports.toCamelCase = function toCamelCase(string) {
  var components = string.split('_'), i = 0, result = string;

  if (components.length > 0) {
    result = '';
    components.forEach(function(component) {
      if (i === 0) {
        result += component;
      } else {
        result += component[0].toUpperCase() + component.slice(1);
      }
      i++;
    });
  }

  return result;
};
