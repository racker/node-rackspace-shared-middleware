var misc = require('../util/misc');

['access_logger', 'transaction_id', 'body_size_limiter'].forEach(function(module) {
  var name = misc.toCamelCase(module);
  exports[name] = require('./' + module).attach;
});
