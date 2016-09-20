'use strict';

import routes from './group.routes';
import GroupController from './group.controller';

export default angular.module('cronboxApp.group', ['cronboxApp.auth', 'ui.router'])
  .config(routes)
  .controller('GroupController', GroupController)
  .name;
