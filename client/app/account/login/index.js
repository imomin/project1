'use strict';

import LoginController from './login.controller';

export default angular.module('cronboxApp.login', [])
  .controller('LoginController', LoginController)
  .name;
