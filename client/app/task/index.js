'use strict';

import routes from './task.routes';
import TaskController from './task.controller';

export default angular.module('cronboxApp.task', ['cronboxApp.auth', 'ui.router'])
  .config(routes)
  .controller('TaskController', TaskController)
  .name;
