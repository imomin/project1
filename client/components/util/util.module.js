'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('cronboxApp.util', [])
  .factory('Util', UtilService)
  .name;
