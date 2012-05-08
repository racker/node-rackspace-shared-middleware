var logmagic = require('logmagic');


/**
 * Express middleware that limits the size of a request body.
 *
 * @param {Object} options Object with the following keys: maxSize, loggerName.
 * @return {Function} The middleware instance.
 */
exports.attach = function attachBodySizeLimiter(options) {
  return function bodySizeLimiter(req, res, next) {
    var maxSize = options.maxSize, loggerName = options.loggerName || 'middleware.body_accepter',
        log = logmagic.local(loggerName), cl, bodyLen = 0, oversize = false;

    cl = req.headers['content-length'];

    if (cl) {
      cl = parseInt(cl, 10);

      if (cl >= maxSize) {
        log.msg('Denying client for too large content length', {content_length: cl, max: maxSize});
        res.writeHead(413, {Connection: 'close'});
        res.end();
        req.transport.close();
        return;
      }
    }

    req.body = '';
    req.setEncoding('utf8');

    req.on('data', function(chunk) {
      req.body += chunk;
      bodyLen += chunk.length;

      if (bodyLen >= maxSize) {
        log.msg('Denying client for body too large', {content_length: bodyLen, max: maxSize});
        res.writeHead(413, {Connection: 'close'});
        res.end();
        req.transport.close();
        oversize = true;
      }
    });

    req.on('end', function() {
      if (!oversize) {
        next();
      }
    });
  };
};
