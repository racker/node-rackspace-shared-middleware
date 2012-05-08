var misc = require('../util/misc');

['access_logger', 'transaction_id'].forEach(function(module) {
  var name = misc.toCamelCase(module);
  exports[name] = require('./' + module).attach;
});
