var logmagic = require('logmagic');

/**
 * Uses logmagic to output GELF log format
 *
 * @param {Object} options with the following keys: loggerName, logLevel
 *
 * @return {Function} The middleware.
 */
exports.attach = function attachLogger(options) {
  return function logger(req, res, next) {
    var loggerName = options.loggerName || 'access_log',
        logLevel = options.logLevel || 'info',
        accessLog = logmagic.local(loggerName);

    req._startTime = new Date();

    // mount safety
    if (req._logging) {
      next();
      return;
    }

    // flag as logging
    req._logging = true;

    // proxy end to output loggging
    var end = res.end;
    res.end = function(chunk, encoding) {
      // Make sure the end function actually executes
      res.end = end;
      res.end(chunk, encoding);

      // Build our logging information
      var obj = {};
      obj['response-time'] = new Date() - req._startTime;
      obj['remote-addr'] = req.socket &&
          (req.socket.remoteAddress ||
          (req.socket.socket && req.socket.socket.remoteAddress));
      obj.method = req.method;
      obj['http-version'] = req.httpVersionMajor + '.' + req.httpVersionMinor;
      obj.status = res.statusCode;
      obj['content-length'] = res._headers['content-length'];
      obj.payload = JSON.stringify(req.body);
      obj.referrer = req.headers.referer;
      obj['user-agent'] = req.headers['user-agent'];
      obj['x-forwarded-for'] = req.headers['x-forwarded-for'];
      obj.txnId = req.txnId;

      if (req.account) {
        obj.accountId = req.account.getKey();
      }
      else {
        /* unauthenticated user */
        obj.accountId = null;
      }

      // Log using logmagic our access info
      accessLog[logLevel](req.originalUrl, obj);
    };

    next();
  };
};
