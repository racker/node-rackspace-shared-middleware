/**
 *  Copyright 2012 Rackspace
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var logmagic = require('logmagic');
var instruments = require('rackspace-shared-utils/lib/instruments');


exports.attach = module.exports = function attachTimingMiddleware(options) {
  return function addTiming(req, res, next) {
      var work, loggerName = options.loggerName || 'middleware.timing',
          log = logmagic.local(loggerName);

    req.time = function(label) {
      work = new instruments.Work(label);
      work.start();
    };

    res.on('finish', function() {
      if (!work) {
        log.info('unset timer label for ' + req.method + '+' + req.originalUrl);
      } else {
        work.stop(res.statusCode >= 500);
      }

      instruments.recordEvent('api_response_' + res.statusCode);
    });

    next();
  };
};
