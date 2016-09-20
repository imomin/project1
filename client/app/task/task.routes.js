'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('task', {
    url: '/tasks',
    template: require('./task.html'),
    controller: 'TaskController',
    controllerAs: 'taskCtrl'
  });
};
// ,
//     authenticate: 'admin'