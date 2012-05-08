
/**
 * A middleware which responds to any OPTIONS requests with a 204 and an Access control Response.
 *
 * See: http://www.w3.org/TR/cors/
 * See: https://developer.mozilla.org/En/HTTP_access_control
 *
 * @return {Function} the middleware.
 */
exports.attach = function attachAccessControlMiddleware() {
  return function accessControlMiddleware(req, res, next) {
    var headers = {};

    if (req.method === 'OPTIONS') {
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
      headers['Access-Control-Max-Age'] = '86400';
      headers['Access-Control-Allow-Headers'] = 'X-Auth-Token, Content-Type, Accept';
      headers['Access-Control-Allow-Credentials'] = 'true';
      headers['Access-Control-Expose-Headers'] = 'X-Response-Id, WWW-Authenticate';

      res.writeHead(204, headers);
      res.end();
      return;
    }

    next();
  };
};
