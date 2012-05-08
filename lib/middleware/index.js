var misc = require('../util/misc');

['access_logger'].forEach(function(module) {
  var name = misc.toCamelCase(module);
  exports[name] = require('./' + module).attach;
});
