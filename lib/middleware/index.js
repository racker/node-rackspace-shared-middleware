/*
 *  Copyright 2011 Rackspace
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

var misc = require('rackspace-shared-utils/lib/misc');

['access_logger', 'transaction_id', 'validator', 'body_parser',
 'body_size_limiter', 'allow_javascript_xhr', 'timing',
 'attach_variables'].forEach(function(module) {
  var name = misc.toCamelCase(module);
  exports[name] = require('./' + module).attach;
});
