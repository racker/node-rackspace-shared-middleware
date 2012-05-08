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


/**
 * Generate a random string of upper lower case letters and decimal digits.
 *
 * @param {Number} len  The length of the string to return;.
 * @return {String} Random string.
 */
exports.randstr = function(len) {
  var chars, r, x;

  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  r = [];

  for (x = 0; x < len; x++) {
    r.push(chars[exports.getRandomInt(0, chars.length - 1)]);
  }

  return r.join('');
};


/**
 * Generate a random number between lower and upper bound.
 *
 * @param {Number} min Lower bound.
 * @param {Number} max Upper bound.
 * @return {Number} Random number between lower and upper bound.
 */
exports.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
