'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('group', {
    url: '/groups',
    template: require('./group.html'),
    controller: 'GroupController',
    controllerAs: 'groupCtrl'
  });
};
